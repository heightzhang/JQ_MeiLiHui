<?php
	/*关键点:
		1.Php拿到后端数据返回给前端处理,生成html结构;

		2.设置数据库根据page的值进行取值; qty数量,条件select的设置即可;

		3.page变量(关键) ,page比qty重要的多;
		1)拿到数据库的总数;
		$conn->query('select count(*) from list')->fetch_row()[0]
		2)添加到关联数组里面,传入前台;
		格式化数据;
		3)在前端处理;

		4.page高亮;
		在li中添加:字符串模版写运算公式;
		${msg.pageN==i?'class="active"':''}

		5.page点击分页切换;
		每次点击都会生成HTML结构:需要再次发送Ajax请求->需要封装处理函数;
		视频:1:09:00
	*/	
	//连接数据库;
	include 'connect.php';

	//分页: 无值默认为1页;
	$page = isset($_GET['page']) ? $_GET['page'] :1;
	//每页显示的数量;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 1;
	//查询数据库;
	//每页的开始索引值公式 (page-1)*qty;
	$sql = "select * from product_list limit ".($page-1)*$qty .",".$qty;

	$res =$conn->query($sql);

	//使用结果值(当需要使用全部的时候要写);
	$rows =$res->fetch_all(MYSQLI_ASSOC);

	// 格式化数据(最终的数据显示)
    $result = array(
    	'pageNu'=>$page,
    	'qty'=>$qty,
    	'total'=>$conn->query('select count(*) from product_list')->fetch_row()[0],
    	'data'=>$rows
    );

	echo json_encode($result,JSON_UNESCAPED_UNICODE);
	

	/*
	处理数据:
	1.连接到后台,筛选数来数据是JSON字符串;
	2.在PHP中整成数组去处理;
	*/
?>