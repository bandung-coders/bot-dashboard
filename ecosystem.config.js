module.exports = {
  apps: [
    {
      name: "restu-bot-dashboard",
      script: "npx",
      args: "serve -s -l 9013 build",
      interpreter: "none",
      watch: true,
      merge_logs: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
