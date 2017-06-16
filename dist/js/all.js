//引用其他文件夹中的js;先加载config,再加载该文件;
require(['config'],function(){
	require(['jquery','gdszoom','common'],function($,gdszoom,com){
		// ----------导航条------------
		//点击导航条跳转列表页面
		$('.nav li a').on('click',function(){
			location.href = './list.html';
		});

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

		// ---底部菜单;
		$('.payPlane').addClass('fixed');
		var fixedTop = window.innerWidth - ($('#footer').outerHeight())-document.body.scrollHeight;
		
		window.onscroll = function(){
			var scrollTop =window.scrollY;
			if (window.scrollY > fixedTop) {
				$('.payPlane').removeClass('fixed');
			}else{
				$('.payPlane').addClass('fixed');
			}
		};

		

// ----------------Cookie驾到-----------------------------------------------
		var goodscookies = com.getCookie('goodscookies')
		goodscookies = goodscookies?JSON.parse(com.getCookie('goodscookies')):[];
		
		var $my_goods = $('.content1_content');

		// 生成页面结构 计算单个总价
		render();
		icon();
		$('.zongjia span').text(0);
		function render(){
			var Total = 0;
			var res = goodscookies.map(function(item){
				oneTotal = item.number*item.price;
				Total =item.number*item.price;
				return `<ul class="goods" id ="ul_${item.guid}">
					
						<li class="cart_chk">
								<span class="checkAll content_checkAll"></span>
						</li>
					
						<li class ="goods_info">
						<div class ="img"><img src="${item.imgurl}"> </div>
				
						<div class="text">
							<p class="category">${item.category}</p>	
							<p class="name">${item.name}</p>
							<p class="size">尺寸:${item.size}</P>
						</div>
						</li>
				
						<li class="unit-price one" >￥${item.price}</li>
					
						<li class="count">
							<span class="reduce">-</span>
							<p class="number">${item.number}</p>
							<span class="increase">+</span>
						</li>
					
						<li class = "unit-price">
							￥0.00
						</li>
					
						<li class="unit-price amount">￥${oneTotal}</li>
					
						<li class = "unit-price li_pop">
							<div class="delete">删除</div>
						</li>
					</ul>`
				});
			$my_goods.html(res);
		};


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


		//总价价格封装;
		function totalPrice(){
			var goodscookies = com.getCookie('goodscookies')
			goodscookies = goodscookies?JSON.parse(com.getCookie('goodscookies')):[];

			var total = 0;
			goodscookies.forEach(function(item){
					total += (item.price)*(item.number);
				});

			//总价根据当前的Cookie变化;
			var $total = $('.zongjia span');
			$total.text('￥'+total);
		};

		//全选后 总价格与总数量的封装
		function checkAll_Total(){
			var goodscookies = com.getCookie('goodscookies')
			goodscookies = goodscookies?JSON.parse(com.getCookie('goodscookies')):[];

			var $Num = 0;
			var total = 0;
			goodscookies.forEach(function(item){
				$Num +=item.number;
				total += (item.price)*(item.number);
			})
			//Pay界面效果;数量 与 价格
			var $checkedNum= $('#checkedNum');
				$checkedNum.text($Num);
				
			var $total = $('.zongjia span');
				$total.text(total);
		}
// --------------------正版-----基础样式-----------------------------

		// 全选按钮 选购商品部分的全选按钮  高亮效果解决取值判断状态问题;
		$content_checkAll = $('.content_checkAll');
		$content_checkAll.on('click',function(){
			if ($(this).hasClass('check_active')) {
				$(this).removeClass('check_active');
			}
			else{
				$(this).addClass('check_active');
				
			}
			red();
			free();
		});

		//第一个全选按钮
		$checkAll_first = $('.checkAll').first();
		$checkAll_first.on('click',function(){
			if ($(this).hasClass('check_active')) {
				$('.checkAll').removeClass('check_active');
				$('#checkedNum').text(0);
				$('.zongjia span').text(0);
			}
			else{
				$('.checkAll').addClass('check_active');
				 checkAll_Total();
			}
			red();
			free();
		});
		//第二个全选按钮
		$checkAll_last = $('.checkAll').last();
		$checkAll_last.on('click',function(){
			if ($(this).hasClass('check_active')) {
				$('.checkAll').removeClass('check_active');
				$('#checkedNum').text(0);
				$('.zongjia span').text(0);
			}
			else{
				$('.checkAll').addClass('check_active');
				 checkAll_Total();
			}
			red();
			free();
		});

		//选购商品大于1  结算按钮变红色;
		function red (){
			var status = $('.zongjia span').text()*1;
			if(status > 0){
				$('.maidan').css({
					'backgroundColor':'#f00',
					'cursor':'pointer'});
			}else{
				$('.maidan').css({
					'backgroundColor':'#ccc',
					'cursor':'default'});
			}
		};

		//选购商品金额大于688元 ,免运费;
		function free(){
			var status = $('.zongjia span').text()*1;
			if (status >= 688) {
				$('.box_effect').fadeOut()
			}else{
				$('.box_effect').fadeIn()
			}		
		};
		

//------------------++ -- 0 删除 清空 ---------------------------		

		/*2.点击选择数量; 
			1.数量的加减;
			2.单个商品的价格相应改变;
			3.Cookie相应改变; 
		*/		
	
		var countReduce = $('.count span.reduce');
		var countIncrease = $('.count span.increase');

			//增加++
		countIncrease.on('click',function(){
			var $currentUl = $(this).closest('ul');
			var $guid = $currentUl.attr('id').slice(3);
				//当前的数量
			var $number= $currentUl.find('.count p.number').text()*1;
			var $currentNum = $currentUl.find('.count p.number');

			$number++;
			$currentNum.text($number);
				//当前的总价 +1个单价;
			var $price = $currentUl.find('.amount').text().slice(1)*1;
			var $currentPrice = $currentUl.find('.amount');
			var $onePrice =$currentUl.find('.one').text().slice(1)*1;
			$oneTotal =$price+$onePrice;
				
			$currentPrice.text('￥'+$oneTotal);

				//Cookie 找到互相对应的Cookie;
			for(var i = 0; i<goodscookies.length;i++){
				if (goodscookies[i].guid === $guid) {
					//cookie数量的变化;
					goodscookies[i].number++;
					com.setCookie('goodscookies',JSON.stringify(goodscookies),'localhost','/');
					icon();
							//通过bind改变this指向;
					var objcheck = checkedPrice.bind(this);
					objcheck();
				}
			};
			red();
			free();
		});
	//减少--
		countReduce.on('click',function(){
			var $currentUl = $(this).closest('ul');
			var $guid = $currentUl.attr('id').slice(3);
				//当前的数量
			var $number= $currentUl.find('.count p.number').text()*1;
			var $currentNum = $currentUl.find('.count p.number');

			$number--;
			$currentNum.text($number);
				//当前的总价 -1个单价;
			var $price = $currentUl.find('.amount').text().slice(1)*1;
			var $currentPrice = $currentUl.find('.amount');
			var $onePrice =$currentUl.find('.one').text().slice(1)*1;
			$oneTotal =$price-$onePrice;
				
			$currentPrice.text('￥'+$oneTotal);

				//Cookie 找到互相对应的Cookie;
			for(var i = 0; i<goodscookies.length;i++){
				if (goodscookies[i].guid === $guid) {
					//cookie数量的变化;
					goodscookies[i].number--;
					com.setCookie('goodscookies',JSON.stringify(goodscookies),'localhost','/');
					icon();
							//通过bind改变this指向;
					var objcheck2 = checkedPrice2.bind(this);
					objcheck2();
				}	
			};

			//数量为0时候;
			if ($number === 0 ) {
				$currentUl.fadeOut('slow',function(){
					$(this).remove();
				});
				
				for(var i = 0; i<goodscookies.length;i++){
					if (goodscookies[i].guid === $guid) {
						goodscookies.splice(i,1);//删除自己
						com.setCookie('goodscookies',JSON.stringify(goodscookies),'localhost','/');
						icon();
								//通过bind改变this指向;
						var objcheck3 = checkedPrice3.bind(this);
						objcheck3();
					}
				};
			}

			red();
			free();
		});
		/*3.点击删除按钮,
		候删除节点与Cookie*/
		var $delete = $('.li_pop .delete');
		$delete.on('click',function(){
			//删除Dom节点
			var $currentUl = $(this).closest('.goods');
			$currentUl.fadeOut('slow',function(){
				$(this).remove();
			});

			var objcheck5 = checkedPrice5.bind(this);
						objcheck5();

				//删除互相对应的Cookie;
			var $guid = $(this).closest('ul').attr('id').slice(3);
			for(var i = 0; i<goodscookies.length;i++){
				if (goodscookies[i].guid === $guid) {
					goodscookies.splice(i,1);//删除自己
					com.setCookie('goodscookies',JSON.stringify(goodscookies),'localhost','/');
					icon();

				}
			}
			red();
			free();
		 });
			//4.清空按钮;
		 $('.empty').on('click',function(){
		 	//删除节点
		 	var $Allul = $('.content1_content ul');
		 	$Allul.remove();

		 	//删除所有Cookie
		 	var goodscookies = com.getCookie('goodscookies')
			goodscookies = [];
			com.setCookie('goodscookies',JSON.stringify(goodscookies),'localhost','/');
			totalPrice();
			icon();
			$('#checkedNum').text(0);

			red();
			free();
		});





		//5.选择按钮效果;只读取最新的Cookie ,不改变Cookie;
		var alltotal = 0;
		$('.content_checkAll').on('click',function(){
			var objcheck4 = checkedPrice4.bind(this);
						objcheck4();
			red();
			free();
		});
		/*++
		加上选中当行的数量+1; 选中当行的单价+1 ,不是总价;
		*/
		function checkedPrice(){
			//要被写入的数量与价格 的 两个元素;
			var $checked = $('#checkedNum');

			var $totalPrice = $('.zongjia span');

			//原先的数量与价格
			var $historyNum =$checked.text()*1;

			var $historyPrice = $('.zongjia span').text()*1;

			//当前点击的价格;

			var $thisPrice = $(this).closest('ul').find('.one').text().slice(1)*1;

			//判断是否被选中的条件active;
			var $currentSpan =  $(this).closest('ul').find('.checkAll ');
			
			if ($currentSpan.hasClass('check_active')) {  //这里是关键2;
					//数量:新数字为原先的被选中的数字 + 1
				var num =$historyNum+1;
				$checked.text(num)
					//价格增加 ;	+ this 单价		
				var $increase_Price = $historyPrice+$thisPrice;
				$totalPrice.text($increase_Price);

			}
		};

		/*--
		减去选中当行的数量-1; 减去当行的单价-1 ,不是总价;
		*/
		function checkedPrice2(){
			var $checked = $('#checkedNum');

			var $totalPrice = $('.zongjia span');

			//原先的数量与价格
			var $historyNum =$checked.text()*1;

			var $historyPrice = $('.zongjia span').text()*1;

			//当前点击的价格;

			var $thisPrice = $(this).closest('ul').find('.one').text().slice(1)*1;

			//判断是否被选中的条件active;
			var $currentSpan =  $(this).closest('ul').find('.checkAll ');
			
			if ($currentSpan.hasClass('check_active')) {  //这里是关键2;
					//数量:新数字为原先的被选中的数字 - 1
				var num2 =$historyNum-1;
				$checked.text(num2);
					//价格 减少;  -单价
				var $reduce_Price = $historyPrice-$thisPrice;
				$totalPrice.text($reduce_Price);

			}
		};
		/*数量为0的时候
		减去 1 个数量
		减去当行的一个单价; 因为上面 -- 价格已经被减去了,所以 等于其历史价格即可;

		*/
		function checkedPrice3(){
			var $checked = $('#checkedNum');

			var $totalPrice = $('.zongjia span');

			//原先的数量与价格
			var $historyNum =$checked.text()*1;
			var $historyPrice = $('.zongjia span').text()*1;
			

			//当前点击的总价格与总数量
			var $thisPrice = $(this).closest('ul').find('.one').text().slice(1)*1;
			var $thisNum = $(this).closest('ul').find('.count .number').text()*1;

			//判断是否被选中的条件active;
			var $currentSpan =  $(this).closest('ul').find('.checkAll ');
			
			if ($currentSpan.hasClass('check_active')) {  //这里是关键2;
					//数量:新数字为原先的被选中的数字
				var num2 =$historyNum-$thisNum;
				$checked.text(num2);
					//价格 减少;
				var $reduce_Price = $historyPrice;
				$totalPrice.text($reduce_Price);
			}
		};
		/*正宫
		加上选中的数量相加, 选中的总价相加;
		未选中的数量与价格会被取消;
		*/
		function checkedPrice4 (){
			var $checked = $('#checkedNum');

			var $totalPrice = $('.zongjia span');

			var $currentNum = $(this).closest('ul').find('p.number').text()*1;
			var $historyNum =$checked.text()*1;

			var $guid = $(this).closest('ul').attr('id').slice(3); //这里是关键1;
			//价格:
			var goodscookies = com.getCookie('goodscookies')
			goodscookies = goodscookies?JSON.parse(com.getCookie('goodscookies')):[];

			for(var i = 0;i<goodscookies.length;i++){
				if (goodscookies[i].guid === $guid) {
					var onetotal = goodscookies[i].number*goodscookies[i].price
				}
			};

			if ($(this).hasClass('check_active')) {  //这里是关键2;
					//数量:新数字为原先的被选中的数字 + 现在被选中的数字;
				var num =$historyNum+$currentNum;
				$checked.text(num)
					//价格增加 ;			
				alltotal+=onetotal;
				$totalPrice.text(alltotal);
			}else{
				//数量
				var num2 =$historyNum-$currentNum;
				$checked.text(num2);
					//价格 减少;
				alltotal-=onetotal;
				$totalPrice.text(alltotal);
			}
		};

		/*删除按钮 : 因为绑定的对象不同,条件改为span
			减去 选中当行的数量与当行的总价 */
		function checkedPrice5 (){
			
			var $checked = $('#checkedNum');

			var $totalPrice = $('.zongjia span');

			var $currentNum = $(this).closest('ul').find('p.number').text()*1;

			var $historyNum =$checked.text()*1;

			//因为绑定对象的不同,条件也应该有所改变;
			var $currentSpan =  $(this).closest('ul').find('.checkAll ');

			var $guid = $(this).closest('ul').attr('id').slice(3); //这里是关键1;
			//价格:
			var goodscookies = com.getCookie('goodscookies')
			goodscookies = goodscookies?JSON.parse(com.getCookie('goodscookies')):[];

			for(var i = 0;i<goodscookies.length;i++){
				if (goodscookies[i].guid === $guid) {
					var onetotal = goodscookies[i].number*goodscookies[i].price
				}
			};

			if ($currentSpan.hasClass('check_active')) {  //这里是关键2;
					//数量:新数字为原先的被选中的数字 ----- 选中当行的数量;
				var num =$historyNum-$currentNum;
				$checked.text(num)
					//价格减少 ; ----------选中当行的价格
				alltotal-=onetotal;
				$totalPrice.text(alltotal);
			}
		};
	})

})

define(['jquery'],function($){
	return {
		randomNum:function (min,max){
		//得到一个min到max之间随机整数
			var res = parseInt(Math.random()*(max-min+1)) + min;

			// 把随机整数返回
			return res;
		},
// ---------------Cookie的增删改----------------
		setCookie:function(name,val,expires,path){
			var str = name + '=' + val;

			if(expires){
				str +=';expires=' + expires;
			}

			if(path){
				str += ';path=' + path;
			}


			document.cookie = str;
		},
		getCookie:function(name){
			var cookies = document.cookie;

			var res = '';

			if(cookies.length){
				cookies = cookies.split('; ');
				cookies.forEach(function(item){
					var arr = item.split('=');
					if(arr[0] === name){
						res = arr[1];
					}
				})
			}

			return res;
		},
		removeCookie:function(name){
			var now = new Date();
			now.setDate(now.getDate()-7);

			// setCookie(name,null,now);
			document.cookie = name + '=null;expires=' + now;
		},
// ---------获取随机颜色--------------------
		randomColor:function(){
			var res ='#';
			var str = '0123456789abcdef';
			for(var i= 0; i<6;i++){
				var Idx =Math.floor(Math.random()*str.length);
				res += str[Idx];
			}

			return res;
		},
		icon:function(){
			var goodscookies = this.getCookie('goodscookies')
			goodscookies = goodscookies?JSON.parse(this.getCookie('goodscookies')):[];

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
	}
});
require.config({
	//解决缓存问题;
	urlArgs: 'v='+ Date.now(),
    
    paths : {
         "jquery": "../lib/jquery-3.2.1",

         'bootstrap':'../lib/bootstrap-3.3.7-dist/js/bootstrap',

         'Carousel':'../lib/jquery-TTCarousel/jquery-TTCarousel',

         'validate':'../lib/jquery-validate/jquery.validate',

         'messages':'../lib/jquery-validate/localization/messages_zh',

         'gdszoom':'../lib/jquery-gdszoom/jquery.gdszoom',

         'lazyload':'../lib/jquery.lazyload.min'
        
    },

    shim:{
    	//给bootstrap添加依赖;
    	'bootstrap':['jquery'],
        'Carousel':['jquery'],
        'validate':['jquery'],
        'messages':['validate'],
        'gdszoom':['jquery'],
        'lazyload':['jquery']
    }
});
//引用其他文件夹中的js;先加载config,再加载该文件;
require(['config'],function(){
	//只要common定义成符合标准的模块,则在回调函数中调用其方法; ---传参;   //多个JS如何传参
	require(['jquery','gdszoom','common'],function($,gdszoom,com){

// ---------------------------------------------
	//点击导航条跳转列表页面
		$('.nav li a').on('click',function(){
			location.href = './list.html';
		});


//---------------------------------------------
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
		};


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
				})
			}else{
				$nav.css({'position':'relative'})
			}
		};


// --------------Mysql请求后台生成页面数据-----------------------
		//获取传递过来的ID;
		var $id =location.search.slice(4)*1;
		
		$.ajax({
			url:'../api/goods_two.php',
			dataType:'json',
			data:{id:$id},
			async:false,
			success:function(msg){
				// 商品代码
				var $spanguid = msg[0].guid;
				$('#guid').text($spanguid);

				// 大图与第一个小图的url
				var $imgurl = msg[0].imgurl;
				var $bigimgurl = msg[0].big_imgurl;
				$('.product_img img').attr({
					"src":$imgurl,
					"data-big":$bigimgurl
				});
				$('.product_selectimg ul li').eq(0).children('img').attr({
					"src":$imgurl,
					"data-big":$bigimgurl
				});

				// 第二个小图url
				var $imgurl_two = msg[0].imgurl_two;
				var $big_imgurl_two = msg[0].big_imgurl_two;
				$('.product_selectimg ul li').eq(1).children('img').attr({
					"src":$imgurl_two,
					"data-big":$big_imgurl_two
				});

				//第三个小图url
				var $imgurl_three = msg[0].imgurl_three;
				var $big_imgurl_three = msg[0].big_imgurl_three;

				$('.product_selectimg ul li').eq(2).children('img').attr({
					"src":$imgurl_three,
					"data-big":$big_imgurl_three
				});

				//第四个小图URL
				var $imgurl_four = msg[0].imgurl_four;
				var $big_imgurl_four = msg[0].big_imgurl_four;
				$('.product_selectimg ul li').eq(3).children('img').attr({
					"src":$imgurl_four,
					"data-big":$big_imgurl_four
				});


				// title && name
				var $title = msg[0].category;
				$('.product_title').text($title);
				var $name =msg[0].name;
				$('.product_name').text($name);

				// price && oldPrice
				var $price = msg[0].price;
				$('.product_price_box .product_price').text($price);
				var $oldPrice = msg[0].oldPrice;
				$('.oldPrice').text($oldPrice);

				//color
				$('.choose_a img').attr({
					"src":$imgurl
				});

				//size
				var $size_one = msg[0].size_one;
				var $size_two = msg[0].size_two;
				var $size_three = msg[0].size_three;
				$('.product_size ul.sizeNum li').eq(0).children('a').text($size_one);
				$('.product_size ul.sizeNum li').eq(1).children('a').text($size_two);
				$('.product_size ul.sizeNum li').eq(2).children('a').text($size_three);

			}
			
		});
		//处理不同数据下的情况:
			//1.没有尺寸,应该隐藏尺寸样式;
		if($('.product_size ul.sizeNum li').eq(0).children('a').text() ===''){
			var $size_style = $('.product_size ul.sizeNum li a');
			$size_style.hide();
		}

//---------------------------正版-------------------------------------

		// 引入放大镜插件效果;
		$('.product_img').gdszoom({
			width:200,
			height:225
		});
		// 点击下面小图切换效果;
		$('.product_selectimg img').on('click',function(){
			$('.product_img img').attr({
				'src':this.src,
				'data-big':this.dataset.big
			});
		});

		//需用到的基础变量元素;
		var $guid = $('#guid').text();
		
		var $my_goods =$('.my_goods');

		var $info = $('.product_info');

		var $price = $info.find('.product_price_box .product_price').text().slice(1,).replace(',','')*1;

		
		//折扣封装
		function discount(){
			var $old_Price = $('.oldPrice').text().slice(2)*1;
			var $discount_price = ($old_Price/$price).toFixed(1);
			$('.discount').text($discount_price);
		}

		//数量选择;
		var $number = $info.find('.number_choose .quantity_number').text()*1;

		// 点击选择尺码;
		var $sizeSelect = $('.sizeNum li a');
		$sizeSelect.on('click',function(){
			$sizeSelect.removeClass('active');
			$(this).addClass('active');
			return false;
		});
		//点击选择数量;
		var countReduce = $('.number_choose span.countReduce');
		var countIncrease = $('.number_choose span.number_increase');
		var quantity_number = $('.number_choose span.quantity_number');
			//增加++
		countIncrease.on('click',function(){
			$number++;
			quantity_number.text($number);
		});
			//减少--
		countReduce.on('click',function(){
			$number--;
			quantity_number.text($number);
		});


//----------------------	 cookie  ---------------------------------------------------
		// 一  接收Cookie; 生成页面;
		var goodscookies = com.getCookie('goodscookies')
		goodscookies = goodscookies?JSON.parse(com.getCookie('goodscookies')):[];

		render();
		icon();
		totalPrice();
	//Cookie加载页面封装;
		function render(){
			var res = goodscookies.map(function(item){
				return `<ul id="ul_${item.guid}">
						<li class ="my_goods_img"><img src = "${item.imgurl}"></li>
						<li class ="text">
						<p>${item.name}</p>
						<p>${item.size}</p>
						<p><span class="currentNum">${item.number}</span>&times<span class="currentPrice">￥${item.price}</span></p>
						</li>
						<li class="del">
							<span class="btn-close">删除</span>
						</li>
					</ul>`
			});
			$('.my_goods').html(res);	
		}
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

	//总价价格封装;
	function totalPrice(){
		var goodscookies = com.getCookie('goodscookies')
		goodscookies = goodscookies?JSON.parse(com.getCookie('goodscookies')):[];

		var total = 0;
		goodscookies.forEach(function(item){
				total += (item.price)*(item.number);
			});

		//总价根据当前的Cookie变化;
		var $total = $('.sub .total span');
		$total.text('￥'+total);
	}

// -------------二.点击购物车按钮事件;---
			/*思路: 
				重点:
					数量 与 价格  
					静态页面 与cookie页面
					通过id找寻相对应的商品至关重要;
				步骤:
				1.生成ul;  判断是否存在相同的ul;
				2.点击删除按钮;

				3.改变Cookie并且上传;
				4.动画效果;
				5.动画下拉效果;
			*/
		var $joinBtn = $('.join_shopping_bag');
		
		var timer;

		$joinBtn.on('click',function(){
			var $src = $info.find('.choose_a img').attr("src");

			var $name = $info.find('.product_name').text();
			
			var $size = $info.find('.sizeNum li a.active').text();

			//关键:当前id 对应的ul;
			var $ul_id = $('#ul_'+$guid);

			/*1.生成Li
			 	 判断,如果相同商品,则只改变数量(根据选择的数量改变);否则生成新的ul;
			*/

       		//商品存在则添加数量,价格;否则生成新的ul;
   			for(var i = 0;i<goodscookies.length;i++){
				if (goodscookies[i].guid === $guid){

					onlyFly();
	       			// 数量增加; 当前数量;
	       				//通过当前id对应的ul,找到对应的当前数量与当前价格;
	       			var $currentNum = $ul_id.find('span.currentNum');
	       			var $number2 = $currentNum.text()*1;
	       				//最后相加的数量为已选择后的数量加上将要选择的数量;
	       			var $number3 = $number + $number2;
	       			$currentNum.text($number3);

					//Cookie增加;
					//cookie数量的变化;
						//原先的数量+新增的数量 = 现在的数量;
					var cookieNum = goodscookies[i].number+$number;
					goodscookies[i].number = cookieNum;
					com.setCookie('goodscookies',JSON.stringify(goodscookies),'localhost','/');
						//每次重新上传Cookie后 更新总价,更新小图标;
					totalPrice();
					icon();
					break;
				}	
   			}
   			if (i===goodscookies.length){
   				//生成小型购物车;
       			show();
       			prefectFly();//飞入动画且添加节点;

       			var $category = $('.product_title').text();
				//上传Cookie;
				var goods_ul = {
					guid:$guid,
					category:$category,
					imgurl:$src,
					name:$name,
					size:$size,
					number:$number,
					price:$price
				}
				goodscookies.push(goods_ul);
				com.setCookie('goodscookies',JSON.stringify(goodscookies),'localhost','/');
				icon();
				totalPrice();


			};
			//生成首次My_goods封装;
			function show(){
				$clone_ul = 
				`<ul id = "ul_${$guid}">
					<li class ="my_goods_img"><img src = "${$src}"></li>
					<li class ="text">
					<p>${$name}</p>

					<p>${$size}</p>
					<p><span class="currentNum">${$number}</span>&times<span class="currentPrice">￥${$price}</span></p>
					</li>
					<li class="del">
						<span class="btn-close">删除</span>
					</li>
				</ul>`;
			};

			//3.完整动画效果(包含添加节点)封装
			function prefectFly(){
				var $currentImg = $joinBtn.closest('.container').find('.product_img img');
				var $cloneImg = $currentImg.clone();
				$cloneImg.css({
					position:'absolute',
		            left:$currentImg.offset().left,
		            top:$currentImg.offset().top,
		            width:$currentImg.outerWidth(),
		            height:$currentImg.outerHeight()
				}).appendTo('body');

				$cloneImg.animate({
					left:$my_goods.offset().left,
					top:$my_goods.offset().top +$my_goods.outerHeight(),
					width:10,
					height:10
				},"slow",function(){
					$my_goods.append($clone_ul);
					$cloneImg.remove();
					$my_goods.parent().css({
						height:'auto'
					});
				});
			};
			//单纯动画效果(不包括添加节点)封装;
			function onlyFly(){
		   		var $currentImg = $joinBtn.closest('.container').find('.product_img img');
				var $cloneImg = $currentImg.clone();
				$cloneImg.css({
					position:'absolute',
		            left:$currentImg.offset().left,
		            top:$currentImg.offset().top,
		            width:$currentImg.outerWidth(),
		            height:$currentImg.outerHeight()
				}).appendTo('body');

				
				$cloneImg.animate({
					left:$my_goods.offset().left,
					top:$my_goods.offset().top +$my_goods.outerHeight(),
					width:10,
					height:10
				},"slow",function(){
					$cloneImg.remove();
					$my_goods.parent().css({height: 'auto'});
					timer = setTimeout(function(){
						$my_goods.parent().animate({height: 0});
					},5000)
				});	
			};
			return false;
		});

		// 3.点击删除事件 数量的变化 ,价格的变化(有问题,当有两个详情页面的时候要调整) Cookie的变化;
	    $my_goods.on('click','.btn-close',function(){

	    	//当前ul的ID;
            var $currentUl = $(this).closest('ul');
            var $currentGuid = $currentUl.attr('id').slice(3);

            //当前的数量;
            var $current_span = $currentUl.find('.text .currentNum');
			var $current_number2 = $currentUl.find('.text .currentNum').text()*1;

       		if ($current_number2>1) {
       			//数量的变化
       			$current_number2--;
       			$current_span.text($current_number2);

       			//上传Cookie,保存;(减少相对应的id Cookie的数量)
       			var $guid = $('#guid').text();
       			for(var i = 0; i<goodscookies.length;i++){
					if (goodscookies[i].guid === $currentGuid) {
						goodscookies[i].number--;
						com.setCookie('goodscookies',JSON.stringify(goodscookies),'localhost','/');
						icon();
						totalPrice();
					}
				}
       		}else{
  			  //删除当前的Dom节点; 淡出效果;
          		 $currentUl.fadeOut('slow',function(){
          		 	$currentUl.remove();
          		 });

	          //删除互相对应的Cookie;
				for(var i = 0;i<goodscookies.length;i++){
	           		if (goodscookies[i].guid === $currentGuid) {
	           			goodscookies.splice(i,1);//删除自己
	           			com.setCookie('goodscookies',JSON.stringify(goodscookies),'localhost','/');
	           			icon();
	           			totalPrice();
	           		}
	           }
       		};
         
        });

        hovericon();
	    // 滑过购物袋,购物车出现;
		function hovericon(){
			var $my_goods =$('.my_goods');
			$('ul.nav_right').on('mouseenter',function(){
			$my_goods.parent().css({height: 'auto'});
			});

			$my_goods.parent().on('mouseenter',function(){
			clearTimeout(timer);
			$(this).css({height:'auto'});
			});	

			//动画效果;重点不自动消失;
			$my_goods.parent().on('mouseleave',function(){
			$(this).animate({'height':0});
			})
		};
	})

})
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