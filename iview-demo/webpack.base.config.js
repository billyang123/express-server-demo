const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//var lang = require('highlight.js-async-webpack/src/file.lang.hljs.js');
var _entry= {
    main: './src/main',
    vendors: './src/vendors'
};
// for (var i = 0; i < lang.length; i++) {
//     _entry[lang[i]] = ['mavon-editor/dist/js/' + lang[i] + '.js']
// }

module.exports = {
    entry: _entry,
    output: {
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {

                        less: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        }),

                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: ['autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            'vue-particles': 'vue-particles/vue-particles/vue-particles.esm.js',
            'src': path.resolve(__dirname, '../src'),
            'libs': path.resolve(__dirname, '../src/libs'),
            'components': path.resolve(__dirname, '../src/components')
        }
    }
};