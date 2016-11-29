// webpack.config.js
var path = require('path');
var fs = require("fs") ;
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var srcDir = __dirname+'/src';

var config  = {
    entry:{
        game: path.resolve(srcDir,'game.js'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: "[name].compiled.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            },
        ],
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {

        }
    },
    plugins: [
        ////提供全局的变量，在模块中使用无需用require引入
        //new webpack.ProvidePlugin({
        //    jQuery: "jquery",
        //    $: "jquery"
        //}),
        // new CommonsChunkPlugin('common.js')
        //  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ],
    // watch:true,
    
};

// config.entry = Object.assign({}, config.entry,getEntryDeep(srcDir,''));

function getEntryDeep(dir,deep) {
    var jsPath = path.resolve(dir);
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        
        var info = fs.statSync(path.resolve(dir, item));
        if(info.isDirectory()){
            Object.assign(files, getEntryDeep(path.resolve(dir,item),path.join(deep,item)));     
        }
        
        matchs = item.match(/(.*index)\.js$/);
        if (matchs) {
            files[path.join(deep,matchs[1])] = [path.resolve(dir, item)];
        }

    });
    if(deep==''){
        console.log(files);
    }
    return files;
}




module.exports = config;