require(['config'],function(){
	require(['jquery','validate','messages'],function($,validate){
		 // 账户验证
		$('#loginForm').validate({
            // 验证规则
            rules:{
                username:{
                    required:true,
                    rangelength:[6,12]
                }
            }
    	})	
		 //密码验证
		var $li =$('#password_one').parent();

		var $password_one = $('#password_one');
		
		var $password_two =$('#password_two');

		var $rule =$li.children('.rule');

		var $hint = $('.hint');

		$hint.hide();

		$rule.hide();

		$password_one.on('input',function(){
		 	var $password_val = $password_one.val();
		 	if (!/.{6,}/.test($password_val)) {
		 		$rule.show();
		 		$rule.html('密码不能少于6位')			
			}
			else{
				$rule.hide();
			};

		}).on('blur',function(){
			$rule.hide();
		})

		
		$password_two.on('input',function(){
			var $password_one_val = $password_one.val();
			var $password_two_val = $password_two.val();

			if ($password_one_val!==$password_two_val && /.{6,}/.test($password_two_val)) {
				$hint.show();
		 		$hint.html('两次密码输入不一致')
			}
			else($hint.hide())
		})

		// ===============点击同意按钮======
		$agree = $('.hydl_login span');
		$agree.on('click',function(){
			// 为什么取不到当前的状态值;
			$agree.css({"backgroundColor":"#000"});
		})

		// ======传递注册数据给后台MySQL

		var $sub =$('.hydl_btn a');
		var $username = $('#username');
		var $password = $('#password_two');
		$sub.on('click',function(){
			$.ajax({
					type:'post',
					url:'../api/register.php',
					data:{
						username:$username.val(),
						password:$password.val()
					},
					success:function(msg){
						if (msg==='no*/') {
							alert('注册失败,用户名已经被注册');
							
						}else{
							alert('注册成功');
						};
					}
			})
			return false

		});
		

	})

})