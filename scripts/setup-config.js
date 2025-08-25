#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const distPath = path.join(__dirname, '..', 'config', 'autoload', 'dist');
const localPath = path.join(__dirname, '..', 'config', 'autoload', 'local');

console.log(`🔧 Setting up configuration for ${environment} environment...`);

// Create local directory if it doesn't exist
if (!fs.existsSync(localPath)) {
  fs.mkdirSync(localPath, { recursive: true });
}

// Get all distribution files for current environment
const distFiles = fs.readdirSync(distPath)
  .filter(file => file.endsWith(`.dist-${environment}`));

if (distFiles.length === 0) {
  console.log(`⚠️  No distribution files found for ${environment} environment`);
  console.log('Available environments:');
  
  const availableEnvs = new Set();
  fs.readdirSync(distPath).forEach(file => {
    const match = file.match(/\.dist-(.+)$/);
    if (match) {
      availableEnvs.add(match[1]);
    }
  });
  
  availableEnvs.forEach(env => console.log(`   - ${env}`));
  process.exit(1);
}

// Copy distribution files to local files
distFiles.forEach(distFile => {
  const localFile = distFile.replace(`.dist-${environment}`, '');
  const distFilePath = path.join(distPath, distFile);
  const localFilePath = path.join(localPath, localFile);
  
  if (fs.existsSync(localFilePath)) {
    console.log(`⏭️  Skipping ${localFile} (already exists)`);
  } else {
    fs.copyFileSync(distFilePath, localFilePath);
    console.log(`✅ Created ${localFile} from ${distFile}`);
  }
});

console.log('🎉 Configuration setup complete!');
console.log(`📁 Configuration files location: ${localPath}`);
console.log('💡 You can now customize the configuration files as needed.');
