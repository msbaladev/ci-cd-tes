module.exports = {
    apps: [
      {
        name: 'ci-cd',            // Name of the application
        script: './server.js',        // Script to execute
        instances: 1,              // Number of instances to be started
        autorestart: true,         // Enable/disable auto-restart
        watch: true,              // Enable watch & restart if file changes
        max_memory_restart: '1G',  // Restart if memory exceeds this limit
        env: {
          NODE_ENV: 'development', // Environment variables for development
          PORT: 5000
        },
        // env_production: {
        //   NODE_ENV: 'production',  // Environment variables for production
        //   PORT: 8000
        // }
      }
    ]
  };
  