module.exports = function(config) {
    config.set({
        browsers: [
            'Chrome'
        ],
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            'src/**/*.ts',
            'tests/**/*.spec.ts',
            'tests/phantomjs-polyfills.js'
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript", "coverage"],
            "tests/**/*.ts": ["karma-typescript"]
        },
        reporters: ["progress", "karma-typescript"],
        coverageReporter: {
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        }
    });
};