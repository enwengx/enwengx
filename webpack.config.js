const { resolve } = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

const config = {
    entry: './src/index',
    output: {
        path: resolve(__dirname,"bulid"),
        publicPath: '',
        filename:'bulid.js'
    },
    module:{
        rules:[
            {
                test:/\.css/,
                use:[ 
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    }, 
                    {
                        loader: "postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:["postcss-preset-env"]
                            }
                        }
                    } 
                ]

            },
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader:'babel-loader',
                    options:{
                        presets:[[
                            "@babel/preset-env",
                            {
                                useBuiltIns:'usage',
                                corejs: { version:3 },
                                targets: {
                                    chrome: "58",
                                    firefox: '50',
                                    ie:"10"
                                }
                            }
                        ]]
                    }
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "bulid.css"
        }),
        // new OptimizeCssAssetsWebpackPlugin()
    ],
    devServer:{
        contentBase: resolve(__dirname,"public"),
        port:3000
    },
    mode: "development"
}

module.exports = config;
