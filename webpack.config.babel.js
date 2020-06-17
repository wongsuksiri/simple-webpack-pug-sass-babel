import path from "path"
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const env = process.env.NODE_ENV
const is_development = env === "production"

export default {
    entry: "./src/main.js",
    target: "web",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                include: [/fonts/],
                options: {
                    name: "[name].[ext]",
                    outputPath: "./fonts/",
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: [/fonts/],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./images/"
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true,
                            disable: true,
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: false,
                        },
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            pretty: true,
                        },
                    },
                ]
            },
        ],
    },
    stats: {
        colors: true,
    },
    resolve: {
        modules: [
            "node_modules",
            "src",
        ]
    },
    devServer: {
        contentBase: "./dist",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.pug",
            filename: "./index.html",
            minify: is_development,
            scriptLoading: "defer",
            meta: {
                viewport: "width=device-width, initial-scale=1.0",
            },
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],
}