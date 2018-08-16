const path = require('path');
const fs = require('fs');

// noinspection WebpackConfigHighlighting
module.exports = {
    devMiddleware: {
        publicPath: '/static/',
    },
    add: (app, middleware, options) => {

        // Watch for initial webpack to complete.
        let compilerDoneResolve;
        const compilerDone = new Promise((resolve) => {
            compilerDoneResolve = resolve;
        });
        options.compiler.hooks.done.tap('AsyncSeriesHook', compilerDoneResolve);

        // Add webpack middleware.
        middleware.webpack();

        if (fs.existsSync(path.resolve(__dirname, '.local/koa-middleware.js'))) {
            require('./.local/koa-middleware.js')(
                app,
                middleware,
                options,
                compilerDone,
            );
        }

        // Add static context middleware.
        middleware.content();
    },
};
