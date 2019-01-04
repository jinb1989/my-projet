const express=require("express");
const pool=require('../pool.js');
var router=express.Router();
//1.登录功能
   router.post('/login',(req,res)=>{
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
       var sql="SELECT*FROM xz_user WHERE uname=? AND upwd=?";
       pool.query(sql,[$uname,$upwd],(err,result)=>{
           if(err) throw err;
           if(result.length>0){
		      res.send("登录成功");
		  }else{
		    res.send("用户名或密码错误");
		 }
       });
   
     });
//2.查询用户表所有数据
     router .get('/list',(req,res)=>{
	    var sql="SELECT*FROM xz_user";
	     pool.query(sql,(err,result)=>{
	      if(err) throw err;
	     res.send(result);
		  
	     });
     });

//3.根据uid删除用户
     router.get('/deleteUser',(req,res)=>{
      var $uid=req.query.uid;
	  if(!$uid){
	    res.send('uid is not found');
		return;
	  }
	    var sql="delete from xz_user where uid=?";
		pool.query(sql,[$uid],(err,result)=>{
		   if(err) throw err;
		   res.send("1");//delete success
		});
     });
//4.根据uid查询用户
    router.get('/selectUser',(req,res)=>{
	    var $uid=req.query.uid;
		if(!$uid){
		    res.send("uid is not found");
			return;
		}
		var sql="select*from xz_user where uid=?";
		pool.query(sql,[$uid],(err,result)=>{
		    if(err) throw err;
			if(result .length>0){
			  res.send(result[0]);
			}else{
			  res.send("没查询出用户信息！");
			}
		});
	});
//5.根据uid修改用户
     router.post('/update',(req,res)=>{
		var $uid=req.body.uid;
		if(!$uid){
		    res.send("用户id不能为空");
			return;
		}

		var $uname=req.body.uname;
		if(!$uname){
		    res.send("用户名不能为空");
			return;
		}

		var $upwd=req.body.upwd;
		if(!$upwd){
		   res.send("用户密码不能为空");
		   return;
		}

		var $email=req.body.email;
		if(!$email){
		   res.send("用户邮箱不能为空");
		   return;
		}

		var $phone=req.body.phone;
		if(!$phone){
		   res.send("用户电话不能为空");
		   return;
		}

		var $user_name=req.body.user_name;
		if(!$user_name){
		  res.send("真实姓名不能为空");
		  return;
		}

		var $gender=req.body.gender;
        if(!$gender){
		  res.send("用不性别不能为空");
		  return;
		}

		var sql="update xz_user set uname=?,upwd=?,email=?,phone=?,user_name=?,gender=? where uid=?";
		pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender,$uid],(err,resulr)=>{
		      if(err) throw err;
			  //res.send("修改成功");
                res.send("<script>alert('修改成功');location.href='http://localhost:3000/02-list.html';</script>");
		});
	 });

//6.根据用户名称查询数据库中是否已存在该用户
	 router.get('/selectUname',(req,res)=>{
	         var $uname=req.query.uname;
			 if(!$uname){
			    res.send("用户名称不能为空");
				return;
			 }
			 var sql="select*from xz_user where uname=?";
			 pool.query(sql,[$uname],(err,result)=>{
			     if(result.length>0){
				     res.send("1");//用户名已存在
				 }else{
				    res.send("0");//用户名可用
				 }
			 });
	 });
//7.接收前端传递过来的数据完成注册功能（post）
         router.post('/register',(req,res)=>{
		    var $uname=req.body.uname;
			if(!$uname){
			   res.send("用户名不能为空");
			   return;
			}
			var $upwd=req.body.upwd;
			if(!$upwd){
			   res.send("用户密码不能为空");
			   return;
			}
			var $email=req.body.email;
			if(!$email){
			   res.send("用户邮箱不能为空");
			   return;
			}
			var $phone=req.body.phone;
			if(!$phone){
			   res.send("用户电话不能为空");
			   return;
			}
			var $user_name=req.body.user_name;
			if(!$user_name){
			   res.send("真实姓名不能为空");
			   return;
			}
			var $gender=req.body.gender;
			if(!$gender){
			   res.send("用户性别不能为空");
			   return;
			}
			var sql="insert into xz_user values (null,?,?,?,?,null,?,?)";
			pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender],(err,result)=>{
			       if(err) throw err;
				     res.send("注册成功");
			});
		 });
module.exports=router;






