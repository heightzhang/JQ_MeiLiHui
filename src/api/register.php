<?php
	//关键: 在PHP中执行SQL操作;
	include 'connect.php';
	//1.获取html传过来的信息;
	$username = isset($_POST['username'])?$_POST['username']:'';
	$password = isset($_POST['password'])?$_POST['password']:'';

	//密码加密 :md5方式;
	$password = md5($password);

	$sql_select = "select * from user where username = '".$username."'";
	$res = $conn->query($sql_select);
	$rows = $res->fetch_all(MYSQLI_ASSOC);

	if ($rows ===[]) {
		echo 'yes';
		$sql = "insert into user(username,password) values('$username','$password')";
		$res_sql = $conn->query($sql);
		
	}else{
		echo'no';
	};

	$conn->close();
?>*/