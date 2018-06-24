// Let us use the core webpack module as a library
const webpack = require('webpack');
// Let us use the built-in webpack path module as a library
const path = require('path');


module.exports = {
    // Entry: a.k.a. "Entry Point", the JS file that will used to build the JavaScript dependency graph
    // If not specified, src/index.js is the default.
    entry: "./wwwroot/js/index.js",
    // Output: Where we'll output the build files.
    output: {
        // Path: The directory to which we'll write transformed files
        path: path.resolve(__dirname, 'wwwroot/scripts'),
        // Filename: The name to which we'll write our bundled JavaScript.
        // If not specified, dist/main.js is the default.
        filename: 'main.js'
    },
    // The processing mode.  Accepted alues are "development", "production", or "none".
    mode: 'none',
    // Define our modules here
    module: {
        rules: [
            // Less CSS
            {
                test: /\.less$/, // Match all *.less files
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }],
                exclude: /node_modules/ // Don't look in NPM's node_modules
            },
            // Typescript
            {
                test: /\.tsx?$/, // Match *.ts and *.tsx
                use: 'awesome-typescript-loader', // Converts TypeScript to JavaScript
                exclude: /node_modules/ // Don't look in NPM's node_modules
            },
            // Babel
            {
                test: /\.jsx?$/, // Match *.js and *.jsx
                use: 'babel-loader', // Converts ES2015+ JavaScript to browser-compatible JS
                exclude: /node_modules/ // Don't look in NPM's node_modules
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
    }

}


