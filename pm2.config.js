var pm2Config = {
    "apps": [
      {
        "name": "app",
        "script": "./dist/index.js",
        "exec_mode": "cluster",
        "instances": 1
      },
      {
        "name": "fiboWorker",
        "script": "./dist/workers/fiboWorker.js",
        "instances": 3
      }
    ]
};

module.exports = pm2Config;