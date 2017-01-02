"use strict";

module.exports = {
    entry: "./app.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "jsx-loader"
        }]
    }

};
//# sourceMappingURL=webpack.config.js.map