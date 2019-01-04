const express=require('express');
//引入mysql连接池
const pool=require('../pool.js');
//创建路由器
var router=express.Router();
//在路由器下添加路由
//1.用户注册
router.post('/register',(req,res)=>{
	//浏览器发送数据
	//console.log(req.body);
	var obj=req.body;
	//验证表单提交的内容是否为空
    //验证用户名为空
	var $uname=obj.uname;
	if(!$uname){
	  res.send({code:401,msg:'uname required'});  
	  return;//终止函数中的代码继续执行
	}
	//验证密码为空
	var $upwd=obj.upwd;
	if(!$upwd){
	  res.send({code:402,msg:'upwd required'});
	  return;
	}
	
	//验证邮箱为空
	var $email=obj.email;
	if(!$email){
	  res.send({code:403,msg:'email required'});
	  return;
	}
	//验证电话为空
	var $phone=obj.phone;
	if(!$phone){
	  res.send({code:404,msg:'phone required'});
	  return;
	}
	
   //以上验证东通过了，执行插入数据库操作
   var sql='INSERT INTO xz_user VALUES(NULL,?,?,?,?,NULL,NULL,NULL)';
   pool.query(sql,[$uname,$upwd,$email,$phone],(err,result)=>{
           if(err) throw err;
		   //如何判断插入成功--affectedRows
		   if(result.affectedRows>0){
		     res.send({code:200,msg:'reg success'});
		   }else{
		      res.send({code:301,msg:'reg error'});
		   }
		
   });
});
//删除用户
router.get('/delete',(req,res)=>{
	//湖区查询字符串
	var obj=req.query;
	//console.log(obj);
	var $uid=obj.uid;
	if(!$uid){
	  res.send({code:401,msg:'uid required'});
	  return;
	}
    //删除编号所对应的数据
	var sql='DELETE FROM xz_user WHERE uid=?';
	pool.query(sql,[$uid],(err,result)=>{
	     if(err) throw err;
		 //判断是否删除成功
		 //console.log(result);
		if(result.affectedRows>0){
		res.send({code:200,msg:'delete success'});
		}else{
		  res.send({code:301,msg:'delete error'});
		}
	});
});
//用户登录
  router.post('/login',(req,res)=>{
	  //获取浏览器请求的数据
	  var obj=req.body;
	  var $uname=obj.uname;
	  if(!$uname){
	    res.send({code:401,msg:'uname required'});
		return;
	  }
     var $upwd=obj.upwd;
	 if(!$upwd){
	     res.send({code:402,msg:'upwd required'});
		 return;
	 }
     //判断是否登录成功--用户明和密码同时正确
	 //查询数据，查询的结果中，要有对应的记录
	 var sql='SELECT*FROM xz_user WHERE uname=? AND upwd=?';
	   pool.query(sql,[$uname,$upwd],(err,result)=>{
	      if(err) throw err;
		     //console.log(result);
			 //返回一个数组
			 if(result.length>0){
			 res.send({code:200,msg:'login success'});
			 }else{
			  res.send({code:301,msg:'login error'});
			 }
	   });
  });

   //检索用户
//1.构建html页面
//2.构建路由
//3.获取浏览器请求的数据
//4.验证数据是否为空
//5.构建sql语句（增删改查）
//6.执行sql语句，返回结果
  router.get('/detail',(req,res)=>{
	  //获取浏览器请求的数据
	   //验证数据是否为空
    var obj=req.query;
	var $uid=obj.uid;
	if(!$uid){
	   res.send({code:401,msg:'uid required'});
	   return;
	}
	//构建sql语句（增删改查）
	var sql='SELECT*FROM xz_user WHERE uid=?';
	//执行sql语句，返回结果
	pool.query(sql,[$uid],(err,result)=>{
	   if(err) throw err;
	      console.log(result);
		 
	   if(result.length>0){
	     /* res.send({code:200,msg:'select success'});
	   }else{
	     res.send({code:301,msg:'select error'});
	   }*/
	   res.send(result[0]);
	   }else{
	     res.send({code:301,msg:'select error'});
	   }
	});
	});
	//用户修改 
	    /*router.post('/update',(req,res)=>{
        var obj=req.body;
		var i=401;
		for(var key in obj){
		    if(!obj[key]){
			  res.send({code:i,msg:key+'required'});
			  return;
			}
			i++;
		}
		   var $uid=obj.uid;
           var sql='UPDATE xz_user SET ? WHERE uid=?';
           pool.query(sql,[obj,$uid],(err,result)=>{
           if(err) throw err;
		   console.log(result);
           res.send(result);
       });
	});
	*/
	router.post('/update',(req,res)=>{
	  var obj=req.body;
	  var $uid=obj.uid;
	  if(!$uid){
	     res.send({code:401,msg:'uid required'});
		 return;
	  }
	  var $email=obj.email;
	  if(!$email){
	    res.send({code:402,msg:'email required'});
		return;
	  }
	  var $phone=obj.phone;
	  if(!$phone){
	    res.send({code:403,msg:'phone required'});
		return;
	  }
	  var $gender=obj.gender;
	  if(!$gender){
	    res.send({code:404,msg:'gender required'});
		return;
	  }
	  var $user_name=obj.user_name;
	  if(!$user_name){
	    res.send({code:405,msg:'user_name required'});
		return;
	  }
	   var sql='UPDATE xz_user SET email=?,phone=?,gender=?,user_name=? WHERE uid=?';
	   pool.query(sql,[$email,$phone,$gender,$user_name,$uid],(err,result)=>{
	         if(err) throw err;
			 //console.log(result);
		  if(result.affectedRows>0){
		     res.send({code:200,msg:'update success'});
		  }else{
		    res.send({code:301,msg:'update error'});
		  }
	  });

    });
	//用户列表                                          
     router.get('/list',(req,res)=>{
	    var obj=req.query;
		var $size=parseInt(obj.size);
		var $page=parseInt(obj.page);
		   //console.log(typeof($size));
		   //console.log(typeof($page));
		if(!$size){
		     $size=1;
		}
		if(!$page){
		   $page=1;
		}
        //构建sql语句
		
		var sql='SELECT*FROM xz_user LIMIT ?,?';
		pool.query(sql,[($page-1)*$size,$size],(err,result)=>{
		    if(err) throw err;
			//console.log(result);
			res.send(result);
		});
	 });
    //商品列表

//路由器导出
module.exports=router;


