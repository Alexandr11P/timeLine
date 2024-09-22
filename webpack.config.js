const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env) => {

    const isDev = env.mode === 'development'

    return {
        entry: path.resolve(__dirname, 'src', 'main.tsx'),

        output: {
            filename: '[name].[contenthash:7].js',
            path: path.resolve(__dirname, 'build'),
            clean: true
        },

        mode: env.mode || 'production',

        devtool: isDev && 'inline-source-map',

        devServer: {
            port: env.port || 3000,
            open: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {

                    test: /\.(png|svg|jpg|jpeg|gif)$/i,

                    type: 'asset/resource',

                    generator: {
                        filename: 'assets/images/[name].[contenthash:7][ext]'
                    }
                },
                {

                    test: /\.(woff|woff2|eot|ttf|otf)$/i,

                    type: 'asset/resource',

                    generator: {
                        filename: 'assets/fonts/[name].[contenthash:7][ext]'
                    }

                },
                {
                    test: /\.module\.(s[ac]ss|css)$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: "_[local]_[hash:base64:7]",
                                    namedExport: false,
                                    exportLocalsConvention: 'as-is',
                                }
                            }
                        },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(s[ac]ss|css)$/i,
                    exclude: /\.module\.(s[ac]ss|css)$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ],
                }

            ],
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html')
            }),
            new MiniCssExtractPlugin(),
            new CopyWebpackPlugin({
                patterns: [{ from: 'public', to: '.' }]
            })
        ],
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        }
    }
}