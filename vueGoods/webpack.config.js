const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
module.exports = {
    entry:path.join(__dirname,'./src/main.js'),//入口文件
    output:{//指定输出选项
        path:path.join(__dirname,'./dist'),//输出路径
        filename:'bundle.js'//指定输出文件的名称
    },
    plugins:[//所有webpack插件的配置节点
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),//指定模板文件路径
            filename:'index.html'//设置生成的内存页面名称
        }),
        new VueLoaderPlugin()
    ],
    module:{//配置所有第三方loader模块的
        rules:[//第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},//处理css文件的loader
            {test:/\.(jpg|png|gif|bmp|jpeg|)$/,use:'url-loader?limit=8000&name=[hash:8]-[name].[ext]'},//处理图片路径的loader
            //limit给定的值是图片的大小，单位是byte字节，如果我们引用的图片大于等于给定的值，则不会被转为base64格式的而字符串，反之则会
            {test:/\.(ttf|eot|svg|woff|woff2|otf)$/,use:'url-loader'},//处理字体文件的loader
            {test:/\.vue$/,use:'vue-loader'} //处理vue结尾的文件
        ]
    },
    resolve: {
        alias: {//修改vue被导入时候的包的路径
            "vue$":"vue/dist/vue.js"
        }
    },
    // devServer:{
    //     //     port:3002,//端口号
    //     //     https:false,
    //     //     open:true,//配置自动启动浏览器
    //     //     proxyTable:{//配置跨域处理,只有一个代理
    //     //         '/':{
    //     //             target: 'https://c.y.qq.com',
    //     //             secure:false,
    //     //             changeOrigin:true,
    //     //             pathRewrite:{
    //     //                 '^/api':'/'
    //     //             },
    //     //             headers:{
    //     //                 referer:'https://c.y.qq.com'
    //     //             }
    //     //         }
    //     //     }
    //     // }
}