const express=require("express");
var router=express.Router();

var pool=require('../pool.js');

//响应输出一句话“这是我的第一个AJAX程序”
router.get('/ajaxDemo',(req,res)=>{
    res.send('这是我的第一个ajax程序');
});
router.get('/ajaxExer',(req,res)=>{
     res.send("这是我的第一个ajax练习");
});
router.get('/login',(req,res)=>{
    var $uname=req.query.uname;
    var $upwd=req.query.upwd;
	if(!$uname){
	  res.send("用户名不存在");
	  return;
	}
	if(!$upwd){
	  res.send("密码错误");
	  return;
	}
	 res.send("用户名称："+$uname+"用户密码："+$upwd);
	/*var sql="SELECT*FROM xz_user WHERE uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(req,result)=>{
	    if(result.length>0){
		    res.send("登录成功");
		}else{
		   res.send("用户名或密码错误");
		}
	});*/
});
  //用post方法提交用户名
  router.post('/postLogin',(req,res)=>{
      var $uname=req.body.uname;
	  var $upwd=req.body.upwd;
	  if(!$uname){
	     res.send("uname is not found");
		 return;
	  }
	  if(!$upwd){
	     res.send("upwd is not found");
		 return;
	  }
	  res.send("用户名称："+$uname+"用户密码："+$upwd);
  });
  //用户表查询
  router.get('/list',(req,res)=>{
      var sql="SELECT * FROM xz_user";
	  pool.query(sql,(err,result)=>{
	     if(err) throw err;
		 res.send(result);
	  });
  }); 

//导出
module.exports=router;








