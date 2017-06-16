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