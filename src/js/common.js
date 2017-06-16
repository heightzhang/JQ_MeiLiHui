
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