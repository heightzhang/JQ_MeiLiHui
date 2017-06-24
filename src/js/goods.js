
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