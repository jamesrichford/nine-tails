// Karma configuration
// Generated on Sat Aug 15 2015 00:52:23 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
   config.set({

      plugins: [
         'karma-jasmine',
         'karma-coverage',
         'karma-phantomjs-launcher',
         'karma-chrome-launcher',
			   'karma-requirejs'
      ],

      browserNoActivityTimeout: 120000,

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: 'test',


      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine', 'requirejs'],


      // list of files / patterns to load in the browser
      files: [
         'border-style.spec.js',
         { pattern: "../src/*.js", included: false }
      ],


      // list of files to exclude
      exclude: [
      ],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        '../src/nine-tails.js': 'coverage'
      },


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress', 'coverage'],

      coverageReporter: {
         reporters: [{

           type : 'text',//'html',
           dir : 'test/coverage/'
         }]
     },

      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: [/*'Chrome''PhantomJS',*/ 'Chrome'/*, 'IE'*/],


      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true
   })
}
