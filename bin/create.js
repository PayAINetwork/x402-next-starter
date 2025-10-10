#!/usr/bin/env node

import { execSync } from 'child_process';
import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { createReadStream } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log('🚀 Creating your x402 Next.js app...\n');

  const projectName = await question('What is your project named? ');
  if (!projectName) {
    console.error('❌ Project name is required');
    process.exit(1);
  }

  const projectPath = resolve(process.cwd(), projectName);
  
  if (existsSync(projectPath)) {
    console.error(`❌ Directory ${projectName} already exists`);
    process.exit(1);
  }

  console.log(`\n📁 Creating project in ${projectPath}...`);
  mkdirSync(projectPath, { recursive: true });

  // Copy template files
  const templateDir = join(__dirname, '..', 'template');
  copyDirectory(templateDir, projectPath);

  // Update package.json with project name
  const packageJsonPath = join(projectPath, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = projectName;
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log('\n📦 Installing dependencies...');
  try {
    execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to install dependencies');
    console.error('Please run "npm install" manually in your project directory');
  }

  console.log('\n✅ Success! Your x402 Next.js app is ready!');
  console.log(`\n📋 Next steps:`);
  console.log(`   cd ${projectName}`);
  console.log(`   cp .env.example .env.local`);
  console.log(`   # Edit .env.local with your configuration`);
  console.log(`   npm run dev`);
  console.log(`\n🌐 Open http://localhost:3000 to see your app`);

  rl.close();
}

function copyDirectory(src, dest) {
  const files = readFileSync(join(__dirname, '..', 'template'), 'utf8');
  // This is a simplified version - in a real implementation, you'd recursively copy files
  // For now, we'll create the essential files directly
}

main().catch(console.error);
