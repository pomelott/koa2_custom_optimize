const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    target: 'node',
    watch: true,
    entry: path.resolve(__dirname, '../src/entry-server.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'commonjs2',
        filename: 'server.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude: /node_modules/
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js' 
        }
    }
}