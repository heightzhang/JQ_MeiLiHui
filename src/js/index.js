//引用其他文件夹中的js;先加载config,再加载该文件;
require(['config'],function(){

	//只要common定义成符合标准的模块,则在回调函数中调用其方法; ---传参;   //多个JS如何传参
	require(['jquery','Carousel','common'],function($,TTCarousel,com){


//-------------小图标 数字与价格  动画 -----------------------------------------------------
	//-----------cookie--
		com.icon();
		// 小图标效果封装;
		
		function icon(){
			var goodscookies = com.getCookie('goodscookies')
			goodscookies = goodscookies?JSON.parse(com.getCookie('goodscookies')):[];

			var $Num = 0;
			var total = 0;
			goodscookies.forEach(function(item){
				$Num +=item.number;
				total += (item.price)*(item.number);
			})

			//购物车小图标效果;数量 与 价格
			var $iconNum= $('.nav_right li').eq(0).children('a');
				$iconNum.text($Num);
				
			var $icon_price = $('.nav_right li').last().children('span');
				$icon_price.text(total);
		};

		//点击小图标跳转结算页面;
		$('.nav_right').on('click',function(){
			location.href = 'html/car.html';
		});

		// 点击商品跳转列表页面;
		var $link = $('.goods');
		$link.on('click',function(){
			location.href = 'html/list.html';
		});

		//点击导航条跳转列表页面
		$('.nav li a').on('click',function(){
			location.href = 'html/list.html';
		});
//------------------------------------------------------------------------------------------
		// ----------导航条------------
		var $li = $('#nav .nav>li');
		var $li_p = $li.eq(0).siblings();
		
		$li_p.css('position','relative');
		$li.eq(8).css('position','');
		

		//------------banner-----------
		$('.banner').TTCarousel({
				width:1800,
				height:524,
				duration:6000,
				imgs:['img/banner1.jpg','img/banner2.jpg']
			});


		//----small-banner-------------

		$('.s_banner').TTCarousel({
				width:320,
				height:480,
				duration:3000,
				imgs:['img/s_banner1.jpg','img/s_banner2.jpg','img/s_banner3.jpg']
			});

		// ---------content----------
		$list = $('#content .list');
		$list_img = $('#content .list img');
		$list.find('.goods').css({'cursor':'pointer'});
		$list_img.css({'cursor':'pointer'});
		var $hover=$list.find('.background_hover');
		$hover.css({
			width:$list_img.outerWidth(),
			height:$list_img.outerHeight(),
		});

		var $background = $list.find('.background')
		$background.css({
			width:$list_img.outerWidth(),
			height:$list_img.outerHeight(),
			lineHeight:$list_img.outerHeight()+'px',
			color:'#fff'
		});

		// -----吸顶菜单--------
		var $nav = $('#nav');
		var $header_hei = $('#header').outerHeight();
		var $title_hei =$('#title').outerHeight();
		
		window.onscroll = function(){
			var scrollTop = window.scrollY;
			if (scrollTop>$header_hei+$title_hei) {
				$nav.css({
					"position":'fixed',
					"z-index":'999',
					"left":0,
					"top":0
				});
			}else{
				$nav.css({'position':'static'})
			};


			// -----返回顶部菜单--------
		var $clickOn = $('.clickOn');
		var $background_hei =$('#background').outerHeight();
	

			var scrollTop = window.scrollY;
			if (scrollTop>$header_hei+$title_hei+$background_hei) {
				$clickOn.fadeIn();
			}else{
				$clickOn.fadeOut();
			}
		
		
		};


	
		

	})

	



})