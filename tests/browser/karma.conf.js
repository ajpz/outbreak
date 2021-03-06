var path = require('path');

module.exports = function (config) {

    var filesCollection = [
        'node_modules/lodash/index.js',
        'node_modules/shuffle-array/dist/shuffle-array.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
        'node_modules/socket.io-client/socket.io.js',
        'https://cdn.firebase.com/js/client/2.4.0/firebase.js',
        "https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js",
        "bower_components/ngToast/dist/ngToast.min.js",
        "bower_components/angular-sanitize/angular-sanitize.js",
        'public/main.js',
        'node_modules/sinon/pkg/sinon.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'tests/browser/**/*.js'
    ];

    var excludeFiles = [
        'tests/browser/karma.conf.js'
    ];

    var configObj = {
        browsers: ['Chrome'],
        frameworks: ['mocha', 'chai'],
        basePath: path.join(__dirname, '../../'),
        files: filesCollection,
        exclude: excludeFiles,
        reporters: ['mocha', 'coverage'],
        preprocessors: {
            'public/main.js': 'coverage'
        },
        coverageReporter: {
            dir: 'coverage/browser/',
            reporters: [{
                type: 'text',
                subdir: '.'
            }, {
                type: 'html',
                subdir: '.'
            }]
        }
    };

    config.set(configObj);

};
