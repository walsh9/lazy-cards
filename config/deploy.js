/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.git = {
      repo: 'git@github.com:walsh9/lazy-cards.git',
      branch: 'gh-pages',
      worktreePath: '/tmp/walsh9-deploy',
      commitMessage: 'Deployed %@'
    };
    ENV.sh = {
      hooks: {
        willBuild: [
          {
            command: 'create_borders.sh',
          }
        ]
      }
    };
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
