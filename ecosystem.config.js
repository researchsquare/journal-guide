module.exports = {
  apps: [
    {
      name: "server",
      script: "server/index.js",
      cwd: "server"
    },
    {
      name: "client",
      script: "npm",
      args: "run dev",
      cwd: "client"
    }
  ]
};
