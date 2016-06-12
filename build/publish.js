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
var config = require('./config').publish;

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
        'http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css',
        'http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css',
        'http://cdn.bootcss.com/simple-line-icons/2.3.1/css/simple-line-icons.min.css'
      ],
      'js': [

        // 必备
        'http://cdn.bootcss.com/jquery/2.2.3/jquery.min.js',
        'http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js',
        'http://cdn.bootcss.com/angular.js/1.5.6/angular.min.js',
        'http://cdn.bootcss.com/oclazyload/1.0.9/ocLazyLoad.min.js',
        'http://cdn.bootcss.com/angular-ui-router/0.3.1/angular-ui-router.min.js',

        // 扩展
        'http://cdn.bootcss.com/angular.js/1.5.6/angular-sanitize.min.js',
        'http://cdn.bootcss.com/angular.js/1.5.6/angular-animate.min.js',
        'http://cdn.bootcss.com/angular.js/1.5.6/angular-cookies.min.js',
        'http://cdn.bootcss.com/angular.js/1.5.6/angular-resource.min.js',
        'http://cdn.bootcss.com/angular.js/1.5.6/angular-touch.min.js',
        'http://cdn.bootcss.com/ngStorage/0.3.10/ngStorage.min.js',

        // 应用
        getRevPathStr('assets:js'), // 组件
        getRevPathStr('app:js') // app
      ]
    }))
    .pipe(gulp.dest(config.dist));
})

// 
gulp.task('default', ['clean'], function () {
  return gulp.start('index');
})