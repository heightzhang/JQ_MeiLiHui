<?php
	$id = isset($_GET['id']) ? $_GET['id'] :'no';

	include 'connect.php';
	// 搜索id为2 的商品信息;
	$sql = "select * from product_goods limit ".($id-1).",1";

	$res =$conn->query($sql);

	$rows =$res->fetch_all(MYSQLI_ASSOC);

	echo json_encode($rows,JSON_UNESCAPED_UNICODE);

?>

