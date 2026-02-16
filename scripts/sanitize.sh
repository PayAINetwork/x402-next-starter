#!/usr/bin/env bash
set -euo pipefail
UP_PATH="${1:-examples/typescript/fullstack/next}"
UP_SHA="${2:-unknown}"

# Keep a mirror for reference (gitignored) and map into template root
mkdir -p vendor/upstream

# Map upstream into template root, preserving structure
mkdir -p template
rsync -a --delete vendor/upstream/ template/

# Ensure @coinbase/x402 version matches x402-next version (standalone, no workspace)
if [[ -f template/package.json ]]; then
  node - <<'NODE'
const fs = require('fs');
const path = 'template/package.json';
const json = JSON.parse(fs.readFileSync(path, 'utf8'));
const deps = json.dependencies || {};
const x402NextVersion = deps['x402-next'];
if (x402NextVersion) {
  deps['@coinbase/x402'] = x402NextVersion;
  json.dependencies = deps;
  fs.writeFileSync(path, JSON.stringify(json, null, 2));
}
NODE
fi

# =============================================================================
# PayAI-specific patches (applied after upstream sync)
# =============================================================================

# --- proxy.ts: add @payai/facilitator import and replace facilitator client ---
if [[ -f template/proxy.ts ]]; then
  # Add the @payai/facilitator import after the last @x402 import
  if ! grep -q '@payai/facilitator' template/proxy.ts; then
    sed -i.bak '/^import.*@x402\/.*$/a\
import { facilitator } from "@payai/facilitator";' template/proxy.ts && rm -f template/proxy.ts.bak
    # De-duplicate in case multiple @x402 imports triggered multiple inserts
    awk '!seen[$0]++ || $0 !~ /@payai\/facilitator/' template/proxy.ts > template/proxy.ts.tmp \
      && mv template/proxy.ts.tmp template/proxy.ts
  fi

  # Remove FACILITATOR_URL env var check and manual client construction
  # Replace with: const facilitatorClient = new HTTPFacilitatorClient(facilitator);
  sed -i.bak '/^const facilitatorUrl/,/^\/\/ Create HTTP facilitator client$/d' template/proxy.ts && rm -f template/proxy.ts.bak
  sed -i.bak 's/new HTTPFacilitatorClient({ url: facilitatorUrl })/new HTTPFacilitatorClient(facilitator)/' template/proxy.ts && rm -f template/proxy.ts.bak

  # Remove the FACILITATOR_URL check block if present
  sed -i.bak '/^if (!facilitatorUrl)/,/^}$/d' template/proxy.ts && rm -f template/proxy.ts.bak
fi

# --- package.json: ensure @payai/facilitator dependency is present ---
if [[ -f template/package.json ]]; then
  node <<'PATCH_DEPS'
  const fs = require('fs');
  const p = 'template/package.json';
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j.dependencies = j.dependencies || {};
  if (!j.dependencies['@payai/facilitator']) {
    j.dependencies['@payai/facilitator'] = '^1.0.0';
  }
  fs.writeFileSync(p, JSON.stringify(j, null, 2));
PATCH_DEPS
fi

# --- .env-local / .env.example: replace FACILITATOR_URL with API key vars ---
patch_env_file() {
  local file="$1"
  if [[ ! -f "$file" ]]; then
    return
  fi

  # Remove FACILITATOR_URL and NEXT_PUBLIC_FACILITATOR_URL lines if present
  sed -i.bak '/^FACILITATOR_URL=/d' "$file" && rm -f "$file.bak"
  sed -i.bak '/^NEXT_PUBLIC_FACILITATOR_URL=/d' "$file" && rm -f "$file.bak"

  # Remove NETWORK line if present (no longer needed)
  sed -i.bak '/^NETWORK=/d' "$file" && rm -f "$file.bak"

  # Add PayAI API key vars if not already present
  if ! grep -q 'PAYAI_API_KEY_ID' "$file"; then
    # Ensure file ends with newline before appending
    [[ -s "$file" ]] && [[ $(tail -c1 "$file") != $'\n' ]] && echo >> "$file"
    cat >> "$file" <<'ENVBLOCK'

# PayAI API Key for authenticated facilitator access (optional)
# Without these, the server works on the free tier.
# Get your keys at https://merchant.payai.network
# PAYAI_API_KEY_ID=
# PAYAI_API_KEY_SECRET=
ENVBLOCK
  fi
}

patch_env_file template/.env-local
patch_env_file template/.env.example

# Refresh NOTICE with the commit we synced from
cat > NOTICE <<EOF
This package includes portions derived from coinbase/x402 (${UP_PATH}), Apache-2.0,
commit ${UP_SHA}. See LICENSE and upstream LICENSE notices.
EOF

# Cleanup transient directories so they don't get committed
rm -rf vendor/upstream || true
rm -rf upstream || true

echo "Sanitization complete."
