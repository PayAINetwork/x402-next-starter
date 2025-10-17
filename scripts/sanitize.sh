#!/usr/bin/env bash
set -euo pipefail
UP_PATH="${1:-examples/typescript/fullstack/next}"
UP_SHA="${2:-unknown}"

# Keep a mirror for reference (gitignored) and map into template root
mkdir -p vendor/upstream

# Map upstream into template root, preserving structure
mkdir -p template
rsync -a --delete vendor/upstream/ template/

# Ensure env keys are present and updated in env templates after sync
DEFAULT_FACILITATOR_URL="https://facilitator.payai.network"
DEFAULT_NETWORK="solana-devnet"

update_env_var() {
  local file="$1"
  local key="$2"
  local value="$3"
  if [[ -f "$file" ]]; then
    if grep -Eq "^[[:space:]]*${key}=" "$file"; then
      # Replace existing non-commented line for the key
      sed -i.bak -E "s|^[[:space:]]*${key}=.*|${key}=${value}|" "$file" && rm -f "$file.bak"
    else
      printf "\n%s=%s\n" "$key" "$value" >> "$file"
    fi
  fi
}

# Cover common env file variants for Next starters
for env_file in template/env.local template/.env.local template/.env.example; do
  update_env_var "$env_file" "NEXT_PUBLIC_FACILITATOR_URL" "$DEFAULT_FACILITATOR_URL"
  update_env_var "$env_file" "NETWORK" "$DEFAULT_NETWORK"
done

# Refresh NOTICE with the commit we synced from
cat > NOTICE <<EOF
This package includes portions derived from coinbase/x402 (${UP_PATH}), Apache-2.0,
commit ${UP_SHA}. See LICENSE and upstream LICENSE notices.
EOF

# Cleanup transient directories so they don't get committed
rm -rf vendor/upstream || true
rm -rf upstream || true

echo "Sanitization complete."


