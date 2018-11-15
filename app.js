//引入express模块
var express = require('express')
//引入router路由模块
var router =require("./router")
//引入body-paeser模块用于请求post
var bodyParser = require('body-parser')

var app = express()
//开放资源
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
//使用模板引擎
app.engine('html',require('express-art-template'))
//配置body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//把路由挂载到app服务上面
app.use(router)

app.listen(3000,function(){
    console.log('server is running...')
})