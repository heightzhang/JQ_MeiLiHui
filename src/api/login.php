<?php
	//关键: 在PHP中执行SQL操作;
	include 'connect.php';
	//1.获取html传过来的信息;
	$username = isset($_POST['username'])?$_POST['username']:'';
	$password = isset($_POST['password'])?$_POST['password']:'';

	//密码加密 :md5方式;
	$password = md5($password);

	//2.'筛选用户名和密码;
	$sql = "select * from user where username = '".$username."'"." and password ='".$password."'";

	//运行SQL语句;
	$res = $conn->query($sql);

	$rows =$res->fetch_all(MYSQLI_ASSOC);

	if ($rows) {
		echo 'two_yes';
	};

	//筛选用户名;
	$sql_username = "select * from user where username = '".$username."'";
	$res_username = $conn->query($sql_username);

	$rows_username =$res_username->fetch_all(MYSQLI_ASSOC);
	
	if ($rows_username ===[]) {
		echo 'username_no';
	};

	//筛选密码;
	$sql_password = "select * from user where password = '".$password."'";
	$res_password = $conn->query($sql_password);
	
	$rows_password =$res_password->fetch_all(MYSQLI_ASSOC);

	if ($rows_password ===[]) {
		echo 'password_no';
	};
	
	$conn->close();
?>