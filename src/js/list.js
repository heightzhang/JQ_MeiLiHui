//引用其他文件夹中的js;先加载config,再加载该文件;
require(['config'],function(){
	//只要common定义成符合标准的模块,则在回调函数中调用其方法; ---传参;   //多个JS如何传参
	require(['jquery','common','lazyload'],function($,com,lazyload){

// ------------------跳转-------------
		//点击小图标跳转结算页面;
		$('.nav_right').on('click',function(){
			location.href = './car.html';
		});
		//倒计时样式修改
		$('#spanTime').css({
			color:'red',
			fontSize:17,
			position:'absolute',
			top:-2
		});

		//点击导航条跳转列表页面
		$('.nav li a').on('click',function(){
			location.href = './list.html';
		});
//-------------------------------------------------------------------------------
		// ----------导航条------------
		var $li = $('#nav .nav>li');
		var $li_p = $li.eq(0).siblings();
		
		$li_p.css('position','relative');
		$li.eq(8).css('position','');
		
		// -----吸顶菜单--------
		var $nav = $('#nav');
		var $header_hei = $('#header').outerHeight();
		var $title_hei =$('#title').outerHeight();
		var $nav_hei = $nav.outerHeight();

		window.onscroll = function(){
			var scrollTop = window.scrollY;
			if (scrollTop>$header_hei+$title_hei+$nav_hei) {
				$nav.css({
					"position":'fixed',
					"z-index":'999',
					"left":0,
					"top":0
				})
			}else{
				$nav.css({'position':'static'})
			}
		}
//-----------------小图标效果 -------------------------------
		icon();
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
		}

		// ----------正版----------------
		var $spanTime = $('#spanTime');
		spanTime =$spanTime[0];

		// 设置秒杀活动的开始时间
		var startTime= Date.parse('2017-08-4 00:00');
		
		// 计算每秒的时间差;  这是倒计时的核心部分
		var timer=setInterval(showTime,1000)
		showTime()
		function showTime(){
			var now =Date.now();  //倒计时的核心,当前时间的变化;
			var offset =Math.floor((startTime -now)/1000);   // 65秒;
			// 计算剩余的时间 天 时 分 秒;
			var secLeft =offset%60;   // 为了65秒进成5秒;  显示 01分:05秒;
			var minLeft = Math.floor(offset/60)%60;//为了65分进成5分
			var hourLeft =Math.floor(offset/60/60)%24;//为了25小时进成1小时;
			var day = Math.floor(offset/60/60/24);

			// 补零操作
			hourLeft=hourLeft <10 ? '0'+hourLeft:hourLeft;
			minLeft=minLeft <10 ? '0'+minLeft:minLeft;
			secLeft=secLeft <10 ? '0'+secLeft:secLeft;
			// 输出结果
			var res =day+'天'+hourLeft+'小时'+minLeft+'分'+secLeft+'秒';
			// 写入Div
			spanTime.innerHTML=res;
			if (offset==0) {
				spanTime.style.display = 'none';
				// 清除定时器;
				clearTimeout(timer)
			}
		}
        


        //======列表生成=============
        var $listproduct = $('.listproduct');
        
        var pageNu=1;
		var qty =24;

		$.ajax({
			url:'../api/list.php',
			dataType:'json',
			data:{
				page:pageNu,
				qty:qty
			},
			success:function(msg){
				showList(msg);
				//显示页码的个数(总数/每页显示的数量) 生成HTML结构; 只有页面加载才显示;
				var pageQty = Math.ceil(msg.total/msg.qty);
				var page_str = '';
				for(var i =1; i<=pageQty;i++){
					page_str += `<li ${msg.pageNu==i?'class="active"':''}><a href='#'>${i}</a></li>`
				 };
				 //总页数
				 page_str += `共<span>${pageQty}</spapn>页`
				 
				 $('.pagination').html(page_str);

				 //右上角总商品数量
				 $('.ui-page-totalCount span').text(msg.total);

				 //右上角当前页数与总页数;
				 right();
				
				 //点击图片跳转到相对应的详情页面;并且传递相应的id;
				 for(var i = 0;i<msg.total;i++){
				 	var index  = i;
					$('.listproduct .list').eq(index).on('click',function(){
						var id = $(this).index()+1;
						res = '?id='+id
						location.href = 'goods.html'+res;
						return false;
					})
				 };
			}
		})

		//点击分页切换;
		 $('.pagination').on('click','a',function(){
    		pageNu = $(this).text();
    		$(this).parent().addClass('active').siblings().removeClass();
			$.ajax({
				url:'../api/list.php',
				dataType:'json',
				data:{
					page:pageNu,
					qty:qty
				},
				success:function(msg){
					showList(msg);
				}
			});
			right();
			
		})


		 function showList (msg){
			let html = msg.data.map(item=>{
					return `
						<li class="list">
							<a href ="#">
								<img data-original="${item.imgurl.replace('goods','')}" class="lazyload">
							</a>
							<div class="product_content">
								<p class="category"><a href ="#">${item.category}</a></p>
								<p class="name"><a href="#">${item.name}</a>
								<p>
								<span class="price">${item.price}</span>
								<span class="oldPrice">${item.oldPrice}</span>
								</p>
							</div>
						</li>`}).join('');
			$listproduct.html(html);
			$('.lazyload').lazyload({effect:"fadeIn",threshold:10})
		};

		 //右上角当前页数与总页数;
		 function right(){
			 var $activePage = $('.pagination').find('li.active').text();
			 var $currentPage = $('.currentPage').text($activePage);
			 var $pageQty = $('.pagination li').last().text();
			 $('.totalPage').text($pageQty);
		 };

	})

})