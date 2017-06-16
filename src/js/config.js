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