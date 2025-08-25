const fs = require('fs');
const path = require('path');

class ConfigLoader {
  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.configCache = {};
    this.autoloadPath = path.join(__dirname, 'autoload', 'local');
  }

  /**
   * Load all configuration files from autoload/local directory
   */
  loadAll() {
    console.log(`🔧 Loading configuration for ${this.environment} environment...`);

    if (!fs.existsSync(this.autoloadPath)) {
      console.error(`❌ Config directory not found: ${this.autoloadPath}`);
      console.log('💡 Run: npm run setup-config to initialize configuration files');
      process.exit(1);
    }

    const configFiles = fs.readdirSync(this.autoloadPath)
      .filter(file => file.endsWith('.local.js'));

    if (configFiles.length === 0) {
      console.error('❌ No configuration files found in autoload/local/');
      console.log('💡 Run: npm run setup-config to initialize configuration files');
      process.exit(1);
    }

    configFiles.forEach(file => {
      const configName = file.replace('.local.js', '');
      const configPath = path.join(this.autoloadPath, file);
      
      try {
        // Clear require cache to allow hot reloading in development
        if (this.environment === 'development') {
          delete require.cache[require.resolve(configPath)];
        }
        
        this.configCache[configName] = require(configPath);
        console.log(`✅ Loaded: ${configName} configuration`);
      } catch (error) {
        console.error(`❌ Failed to load ${configName} config:`, error.message);
        process.exit(1);
      }
    });

    return this.configCache;
  }

  /**
   * Get specific configuration
   */
  get(configName) {
    if (!this.configCache[configName]) {
      console.error(`❌ Configuration '${configName}' not found`);
      return null;
    }
    return this.configCache[configName];
  }

  /**
   * Get all configurations
   */
  getAll() {
    return this.configCache;
  }

  /**
   * Check if configuration files exist
   */
  checkConfigFiles() {
    const requiredConfigs = ['database', 'server', 'cors'];
    const missingConfigs = [];

    requiredConfigs.forEach(configName => {
      const configPath = path.join(this.autoloadPath, `${configName}.local.js`);
      if (!fs.existsSync(configPath)) {
        missingConfigs.push(configName);
      }
    });

    if (missingConfigs.length > 0) {
      console.error(`❌ Missing configuration files: ${missingConfigs.join(', ')}`);
      console.log('💡 Run: npm run setup-config to create missing files');
      return false;
    }

    return true;
  }
}

module.exports = new ConfigLoader();
