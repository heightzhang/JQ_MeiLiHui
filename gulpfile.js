var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('compileSass',function(){
	//1)找到list.css
	// 匹配所有sass文件
	// 如果不想编译的sass文件名前添加_
	gulp.src('./src/sass/*.scss')
	//2)编译sass
	.pipe(sass())

	//3)将编译好的文件输出文件到css文件夹
	.pipe(gulp.dest('./src/css'))
});

//如何执行任务; 在当地文件位置打开cmd命令行, 输入gulp + 任务名

//监听
// 自动编译
// watch
gulp.task('jtSass',function(){
	// 监听文件修改，执行相应任务
	gulp.watch('./src/sass/*.scss',['compileSass']);
});


// --------------浏览器同步------------------

//浏览器同步插件
var browserSync = require('browser-sync');

gulp.task('server',function(){
	browserSync({
		// 设置服务器路径(静态服务器)
		server:'./src/',

		// 服务器端口
		//port:8888,

		// // 代理
		// proxy:'http://localhost:2000',

		// 监听文件修改，自动刷新
		files:['./src/**/*.html','./src/css/*.css','./src/js/*.js']
	});

	// 监听sass修改
	//gulp.watch('./src/sass/*.scss',['compileSass']);
});