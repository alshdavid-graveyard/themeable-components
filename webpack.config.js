const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const stats = process.argv.includes('--stats') 
  ? [new BundleAnalyzerPlugin()] 
  : []
  
const mode = process.argv.includes('--prod') 
  ? 'production' 
  : 'development'

if (mode === 'production') {
    process.env.NODE_ENV="'production'"
}

module.exports = {
    entry: path.join(__dirname, '/src/gui/main.tsx'),
    mode,
    output: {
        filename: 'app/index.js',
        path: path.join(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
          '~': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new CompressionPlugin(),
        ...stats
    ]
};