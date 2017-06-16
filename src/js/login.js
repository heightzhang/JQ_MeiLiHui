//引用其他文件夹中的js;先加载config,再加载该文件;
require(['config'],function(){
	//只要common定义成符合标准的模块,则在回调函数中调用其方法; ---传参;   //多个JS如何传参
	require(['jquery'],function($){
		//1.使用模块中方法;console.log(com.randomNum(100,200)); 
		var $sub =$('.submitBtn');
		var $username = $('#username');
		var $password = $('#password');

		$sub.on('click',function(){
			$.ajax({
				type:'post',
				url:'../api/login.php',
				data:{
					username:$username.val(),
					password:$password.val()
				},
				success:function(res){
					c(res);
					if (res==='two_yes') {
						alert('恭喜,登录成功');
					};
					if(res ==='username_no'){
						alert('该用户名不存在');
					};
					if(res ==='password_no'){
						alert('密码错误');
					};
					if(res ==='username_nopassword_no'){
						alert('该用户名不存在');
					}
				}
			})
			return false;	
		});
		
		$('.hydl_login span').on('click',function(){
			if ($('.hydl_login span').is('.back')) {
				$('.hydl_login span').removeClass('back');
			}else{
				$('.hydl_login span').addClass('back');
			};			
		});

		
	})

})