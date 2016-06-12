/**
 * 发布环境,使用公网资源,如果使用内网资源,请参考test.js
 * 配置config.js修改发布目录
 * gulp --gulpfile publish.js
 */
var gulp = require('gulp');

// 合并文件
var concat = require('gulp-concat');
// 添加文件哈希值(unicorn.css → unicorn-d41d8cd98f.css)
var rev = require('gulp-rev');
// 文件重命名
var rename = require("gulp-rename");
// 文件的原信息
var sourcemaps = require('gulp-sourcemaps');

// 清除目录
var clean = require('gulp-clean');

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

// 配置文件
var config = require('./config').test;

// 浏览器调试
var browserSync = require('browser-sync').create();

// 临时数据
var temp = {};

// 获取rev的路径字符串
function getRevPathStr(name) {
  var path = temp[name];
  return path.basename + '.min' + path.extname;
}

// 清空发布目录
gulp.task('clean', function () {
  return gulp.src([config.dist], {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

// CSS
gulp.task('css', function () {
  return gulp.src(['../public/css/**/*'], {
      base: '../public'
    })
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(cleanCSS())
    // 重命名 .min
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist));
})

// JS
// 1、组件 assets
gulp.task('assets:js', function () {
  return gulp.src([
      '../public/assets/**/*.module.js', // module
      '../public/assets/**/*.provider.js', // provider
      '../public/assets/**/*.factory.js', // factory
      '../public/assets/**/*.directive.js', // directive
      '../public/assets/**/*.interceptor.js', // interceptor
    ])
    // js验证
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // 合并成一个文件
    .pipe(concat('assets.js'))
    // 哈希
    .pipe(rev())
    // 记录文件信息
    .pipe(rename(function (path) {
      temp['assets:js'] = path;
    }))
    // angular注解
    .pipe(ngAnnotate())
    // 保存源码
    .pipe(gulp.dest(config.dist))
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(uglify())
    // 重命名 .min
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    // 输出压缩文件
    .pipe(gulp.dest(config.dist));
});

// 2、angular 模块和路由
gulp.task('app:js', function () {
  return gulp.src([
      '../public/app/**/*.module.js', // module
      '../public/app/**/*.router.js', // router
      '../public/app/app.config.js' // config
    ])
    // js验证
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // 合并成一个文件
    .pipe(concat('app.js'))
    // 哈希
    .pipe(rev())
    // 记录文件信息
    .pipe(rename(function (path) {
      temp['app:js'] = path;
    }))
    // angular注解
    .pipe(ngAnnotate())
    // 保存源码
    .pipe(gulp.dest(config.dist))
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(uglify())
    // 重命名 .min
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    // 输出压缩文件
    .pipe(gulp.dest(config.dist));
})

// image
gulp.task('image', function () {
  return gulp
    .src(['../public/image/**/*'], {
      base: '../public'
    })
    // 输出文件
    .pipe(gulp.dest(config.dist));
});


// Html
gulp.task('html', function () {
  return gulp
    .src(['../public/tpl/**/*'], {
      base: '../public'
    })
    // 输出文件
    .pipe(gulp.dest(config.dist));
});

// index.html
gulp.task('index', ['css', 'assets:js', 'app:js', 'image', 'html'], function () {
  return gulp.src('../public/index.html')
    .pipe(htmlreplace({
      'css': [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/simple-line-icons/css/simple-line-icons.css'
      ],
      'js': [

        // 必备
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/oclazyload/dist/ocLazyLoad.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',

        // 扩展
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-cookies/angular-cookies.min.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'bower_components/angular-touch/angular-touch.min.js',
        'bower_components/ngstorage/ngStorage.min.js',

        // 应用
        getRevPathStr('assets:js'), // 组件
        getRevPathStr('app:js') // app
      ]
    }))
    .pipe(gulp.dest(config.dist));
})

// 
gulp.task('default', ['clean'], function () {

  browserSync.init({
    port: config.port, // 端口
    server: {
      baseDir: [config.dist], // 主目录
      index: "index.html", // 主页
      routes: { // 路由
        "/bower_components": "../bower_components",
        '/favicon.ico': '../favicon.ico'
      }
    }
  });

  return gulp.start('index');
})