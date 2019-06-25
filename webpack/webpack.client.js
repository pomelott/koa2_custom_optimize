const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    watch: true,
    entry: path.resolve(__dirname, '../src/entry-client.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'client.js'
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