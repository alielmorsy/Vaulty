const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const {resolve} = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

function createWebpackAliases(aliases) {
    const result = {};
    for (const name in aliases) {
        result[name] = path.join(cwd, aliases[name]);
    }
    return result;
}

const isDev = () => {
    return process.env.NODE_ENV === 'development';
}
const getPlugins = () => {
    let plugins = []
    plugins.push(new ForkTsCheckerWebpackPlugin())
    plugins.push(new CopyPlugin({
        patterns: [
            {from: "assets"},
        ],
    }))
    if (isDev()) {
        plugins.push(new webpack.HotModuleReplacementPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }
    return plugins
}
module.exports = {
    module: {
        rules: [
            {
                // Add support for native node modules
                test: /native_modules\/.+\.node$/,
                use: 'node-loader',
            },
            {
                // Typescript loader
                test: /\.tsx?$/,
                exclude: /(node_modules|\.webpack)/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            {
                // CSS Loader
                test: /\.css$/,
                // include: resolve(__dirname, 'src/renderer'),
                use: [{loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},

                ],
            }, {
                // Assets loader
                // More information here https://webpack.js.org/guides/asset-modules/
                test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/[hash][ext][query]',
                },
            },
        ]
    },
    plugins: getPlugins(),
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
        alias: {
            "@assets": path.join(process.cwd(), "assets")
        }
    }, stats: 'minimal',

}
console.log(__dirname)