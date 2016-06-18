var gulp = require('gulp');

// 清除目录
var clean = require('gulp-clean');
// 合并文件
var concat = require('gulp-concat');
// 添加文件哈希值(unicorn.css → unicorn-d41d8cd98f.css)
var rev = require('gulp-rev');
// 文件重命名
var rename = require("gulp-rename");
// 文件的原信息
var sourcemaps = require('gulp-sourcemaps');
// 判断环境
var gulpif = require('gulp-if');
// 获取输入参数
var minimist = require('minimist');

// JS验证
var jshint = require('gulp-jshint');
// angular注解自动处理
var ngAnnotate = require('gulp-ng-annotate');
// JS压缩
var uglify = require('gulp-uglify');

// CSS压缩
var cleanCSS = require('gulp-clean-css');

// Html内容替换
var htmlreplace = require('gulp-html-replace');

// 浏览器调试
var browserSync = require('browser-sync').create();

// 配置文件
var build = require('./build');

// 默认参数,gulp --dist ./dist --min--network --publish
var options = {
  dist: './dist',
  min: false, // 是否压缩
  network: false, // 是否从互联网下载资源
  publish: false // 是否是发布模式
}

options = build.put(options, minimist(process.argv.slice(2)));

console.log(options);

// clean
gulp.task('clean', function() {
  return gulp.src(options.dist, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

// assets
gulp.task('js:assets', function() {
  return gulp.src([
      './public/assets/**/*.module.js', // module
      './public/assets/**/*.provider.js', // provider
      './public/assets/**/*.factory.js', // factory
      './public/assets/**/*.service.js' // service
    ], {
      base: './public'
    })
    // js验证
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // 合并成一个文件
    .pipe(concat('assets.js'))
    // 哈希
    .pipe(gulpif(options.publish, rev()))
    // 记录文件信息
    .pipe(rename(function(path) {
      build.add(path);
    }))
    // angular注解
    .pipe(ngAnnotate())
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(gulpif(options.min, uglify()))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    // 输出压缩文件
    .pipe(gulp.dest(options.dist));
})

// hualuomoli - A
gulp.task('js:hma', function() {
  return gulp.src([
      './public/hma/directives/**/*' // directives
    ], {
      base: './public'
    })
    // js验证
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // 合并成一个文件
    .pipe(concat('hma.js'))
    // 哈希
    .pipe(gulpif(options.publish, rev()))
    // 记录文件信息
    .pipe(rename(function(path) {
      build.add(path);
    }))
    // angular注解
    .pipe(ngAnnotate())
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(gulpif(options.min, uglify()))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    // 输出压缩文件
    .pipe(gulp.dest(options.dist));
})

// app
gulp.task('js:app', function() {
  var ignore;
  if (options.network) {
    ignore = '!./public/app/app.lazyload.config.js';
  } else {
    ignore = '!./public/app/app.network.lazyload.config.js';
  }
  return gulp.src([
      // ocLazyLoad
      ignore,
      './public/app/**/*.module.js', // module
      './public/app/**/*.interceptor.js', // interceptor
      './public/app/**/*.router.js', // router
      './public/app/**/*.config.js', // config
    ], {
      base: './public'
    })
    // js验证
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // 合并成一个文件
    .pipe(concat('app.js'))
    // 哈希
    .pipe(gulpif(options.publish, rev()))
    // 记录文件信息
    .pipe(rename(function(path) {
      build.add(path);
    }))
    // angular注解
    .pipe(ngAnnotate())
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(gulpif(options.min, uglify()))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    // 输出压缩文件
    .pipe(gulp.dest(options.dist));
})

// app 懒加载
gulp.task('js:app:lazy', function() {
  return gulp.src([
      './public/app/**/*.service.js', // service
      './public/app/**/*.controller.js' // controller
    ], {
      base: './public'
    })
    // js验证
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // angular注解
    .pipe(ngAnnotate())
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(gulpif(options.min, uglify()))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    // 输出压缩文件
    .pipe(gulp.dest(options.dist));
})

// fonts
gulp.task('fonts', function() {
  return gulp.src(['./public/fonts/**/*'], {
      base: './public'
    })
    .pipe(gulp.dest(options.dist));
})

// css
gulp.task('css', ['fonts'], function() {
  return gulp.src(['./public/css/**/*'], {
      base: './public'
    })
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(gulpif(options.min, cleanCSS()))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(options.dist));
})

// image
gulp.task('image', function() {
  return gulp.src([
      './public/image/**/*',
      './public/img/**/*'
    ], {
      base: './public'
    })
    .pipe(gulp.dest(options.dist));
});

// tpl
gulp.task('tpl', function() {
  return gulp.src(['./public/tpl/**/*'], {
      base: './public'
    })
    .pipe(gulp.dest(options.dist));
});

// index
gulp.task('index', ['js:assets', 'js:hma', 'js:app', 'js:app:lazy', 'fonts', 'css', 'image', 'tpl'], function() {

  // css
  var cssArray;
  // js
  var jsArray;

  // 网络加载资源
  if (options.network) {
    // css
    cssArray = [
      // bootstrap
      'http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css',
      // 字体库
      'http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css',
      // 加载样式
      'http://cdn.bootcss.com/simple-line-icons/2.3.1/css/simple-line-icons.min.css'
    ];
    // js
    jsArray = [
      // jquery
      'http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js',
      // bootstrap
      'http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js',
      // angular
      'http://cdn.bootcss.com/angular.js/1.5.6/angular.min.js',
      // ocLazyLoad
      'http://cdn.bootcss.com/oclazyload/1.0.9/ocLazyLoad.min.js',
      // angular-ui-router
      'http://cdn.bootcss.com/angular-ui-router/0.3.1/angular-ui-router.min.js',
      // html转换
      'http://cdn.bootcss.com/angular.js/1.5.6/angular-sanitize.min.js',
      // 动画
      'http://cdn.bootcss.com/angular.js/1.5.6/angular-animate.min.js',
      // cookie
      'http://cdn.bootcss.com/angular.js/1.5.6/angular-cookies.min.js',
      // 资源加载
      'http://cdn.bootcss.com/angular.js/1.5.6/angular-resource.min.js',
      // 触屏
      'http://cdn.bootcss.com/angular.js/1.5.6/angular-touch.min.js',
      // 本地存储
      'http://cdn.bootcss.com/ngStorage/0.3.10/ngStorage.min.js',
      'http://cdn.bootcss.com/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min.js'
    ];
  } else {
    // css
    cssArray = [
      // bootstrap
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      // 字体库
      'bower_components/font-awesome/css/font-awesome.min.css',
      // 加载样式
      'bower_components/simple-line-icons/css/simple-line-icons.css'
    ];
    // js
    jsArray = [
      // jquery
      'bower_components/jquery/dist/jquery.min.js',
      // bootstrap
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      // angular
      'bower_components/angular/angular.min.js',
      // ocLazyLoad
      'bower_components/oclazyload/dist/ocLazyLoad.min.js',
      // angular-ui-router
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      // html转换
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      // 动画
      'bower_components/angular-animate/angular-animate.min.js',
      // cookie
      'bower_components/angular-cookies/angular-cookies.min.js',
      // 资源加载
      'bower_components/angular-resource/angular-resource.min.js',
      // 触屏
      'bower_components/angular-touch/angular-touch.min.js',
      // 本地存储
      'bower_components/ngstorage/ngStorage.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    ];
  }

  // app
  var cssAppArray = [
    // 'css/animate.css',
    // 'css/app.css',
    // 'css/font.css'
  ];
  var jsAppArray = build.files;

  return gulp.src('./public/index.html', {
      base: 'public'
    })
    .pipe(htmlreplace({
      'css': cssArray,
      'css-app': cssAppArray,
      'js': jsArray,
      'js-app': jsAppArray
    }))
    .pipe(gulp.dest(options.dist));

})

// watch
gulp.task('watch', ['index'], function() {

  // 浏览器调试工具
  browserSync.init({
    port: 3000, // 端口
    server: {
      baseDir: [options.dist], // 主目录
      index: "index.html", // 主页
      routes: { // 路由
        "/bower_components": "./bower_components",
        "/vendor/jquery": "./vendor/jquery",
        '/favicon.ico': './favicon.ico'
      }
    }
  });

  // js - assets
  gulp.watch([
    './public/assets/**/*.module.js', // module
    './public/assets/**/*.provider.js', // provider
    './public/assets/**/*.factory.js', // factory
    './public/assets/**/*.service.js' // service
  ], ['js:assets']).on('change', browserSync.reload);
  // js - hma
  gulp.watch(['./public/hma/directives/**/*'], ['js:hma']).on('change', browserSync.reload);
  // js - app
  gulp.watch([
    './public/app/**/*.module.js', // module
    './public/app/**/*.interceptor.js', // interceptor
    './public/app/**/*.router.js', // router
    './public/app/**/*.config.js', // config
    './public/app/app.lazyload.config.js',
    './public/app/app.network.lazyload.config.js'
  ], ['js:app']).on('change', browserSync.reload);
  // js - app - lazy
  gulp.watch([
    './public/app/**/*.service.js', // service
    './public/app/**/*.controller.js' // controller
  ], ['js:app:lazy']).on('change', browserSync.reload);
  // fonts
  gulp.watch(['./public/fonts/**/*'], ['fonts']).on('change', browserSync.reload);
  // css
  gulp.watch(['./public/css/**/*'], ['css']).on('change', browserSync.reload);
  // image
  gulp.watch([
    './public/image/**/*',
    './public/img/**/*'
  ], ['image']).on('change', browserSync.reload);
  // tpl
  gulp.watch(['./public/tpl/**/*'], ['tpl']).on('change', browserSync.reload);

})

// 默认任务
gulp.task('default', ['clean'], function() {
  if (options.publish) {
    gulp.start('index');
  } else {
    gulp.start('watch');
  }
})