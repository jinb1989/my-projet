const express=require('express');
const user=require('./routes/user.js');
const product=require('./routes/product.js');
const bodyParser=require('body-parser');
const demo=require('./routes/demo.js');
const myPro=require('./routes/myPro.js');
//const mysql=require('mysql');
//构建web服务器
var app=express();
app.listen(3000);
//托管静态资源 public文件夹
app.use(express.static('./public'));
//托管静态资源 myDemo文件夹
app.use(express.static('./myDemo'));
//托管静态资源myPro文件夹
app.use(express.static('./myPro'));
//使用body-parser中间件
app.use(bodyParser.urlencoded({
   extended:false		
}));
   
//使用路由器
//把用户路由器挂载到/user下
//  /user/register
app.use('/user',user);
//把商品路由器挂载到/product下
//  /product/list
app.use('/product',product);

//把demo 的路由挂载到/demo
app.use('/demo',demo);
//把myPro的路由挂载到/myPro
app.use('/myPro',myPro);
