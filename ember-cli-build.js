'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      enabled: true,
      generateAssetMap: true,
      fingerprintAssetMap: true
    },
    nodeAssets: {
      'emojione': {
        srcDir: 'assets',
        import: ['css/emojione.min.css'],
        public: ['png/*', 'png_128x128/*', 'png_512x512/*', 'sprites/emojione.sprites.png', 'sprites/emojione.sprites.css'],
      },
    }
  });

  var emojiJSON = new Funnel('node_modules/emojione', {
    srcDir: '/',
    include: ['emoji.json'],
    destDir: '/'
  });

  return app.toTree([emojiJSON]);
};
