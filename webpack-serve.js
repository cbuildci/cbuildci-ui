const path = require('path');

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

        app.use(async (ctx, next) => {
            let match;

            if (ctx.url === '/') {
                ctx.redirect('/app/');
            }
            else if (ctx.url.startsWith('/app/')) {
                await compilerDone;

                ctx.response.type = 'html';

                // Read the HTML page from the in-memory file system.
                ctx.body = options.compiler.outputFileSystem.createReadStream(
                    path.join(options.compiler.outputPath, 'index.html')
                );
            }
            else if (match = ctx.url.match(/^\/api\/v1\/repo\/([^/]+)\/([^/]+)\/commit\/([^/]+)\/exec\/([^/]+)/)) {
                // await new Promise((resolve) => setTimeout(resolve, 5000));

                const [, , , commit, executionNum] = match;
                const fs = require('fs');
                const path = require('path');

                const file = path.join(__dirname, `.local/execution-${commit}-${executionNum}.json`);

                if (fs.existsSync(file)) {
                    try {
                        ctx.response.type = 'json';
                        ctx.body = fs.createReadStream(file);
                    }
                    catch (err) {
                        ctx.throw(500, err.stack);
                    }
                    return;
                }

                if (executionNum === '403') {
                    ctx.throw(403, JSON.stringify({
                        name: 'ForbiddenError',
                        message: 'Authorization Required',
                        authRedirectUrl: 'https://build.cbuildci.org/api/v1/auth/redirect',
                    }));
                }

                ctx.throw(403, JSON.stringify({
                    name: 'NotFoundError',
                    message: 'Execution not found',
                }));
            }
            else {
                await next();
            }
        });

        // Add static context middleware.
        middleware.content();
    },
};
