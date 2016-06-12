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

// 浏览器自动刷新,调试工具
var browserSync = require('browser-sync').create();

// 配置信息
var config = {
  dist: './dist',
  rev: {}
}

// 清空发布目录
gulp.task('clean', function () {
  return gulp.src([
      config.dist
    ], {
      read: false
    })
    .pipe(clean({}));
});

// CSS


// JS
// 1、组件 assets
gulp.task('assets:js', function () {
  return gulp
    .src([
      './public/assets/**/*.module.js', // module
      './public/assets/**/*.provider.js', // provider
      './public/assets/**/*.directive.js', // directive
      './public/assets/**/*.factory.js', // factory
      './public/assets/**/*.service.js', // service
      './public/assets/**/*.controller.js', // controller
      './public/assets/**/*.config.js', // config
      './public/assets/**/*.router.js' // router
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
      config.rev['assets:js'] = path;
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
  return gulp
    .src([
      './public/app/**/*.module.js', // module
      './public/app/**/*.router.js' // router
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
      config.rev['app:js'] = path;
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


// Html


// index.html
gulp.task('index', ['assets:js', 'app:js'], function () {
  return gulp.src('./index-tpl.html')
    .pipe(htmlreplace({
      'css': [
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/font-awesome/css/font-awesome.min.css',
        './bower_components/simple-line-icons/css/simple-line-icons.css'
      ],
      'js': [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/oclazyload/dist/ocLazyLoad.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        getRevPathStr('assets:js'), // 组件
        getRevPathStr('app:js') // app
      ]
    }))
    .pipe(rename(function (path) {
      path.basename = "index";
    }))
    .pipe(gulp.dest('./'));
})

// 获取rev的路径字符串
function getRevPathStr(name) {
  var path = config.rev[name];
  return path.basename + path.extname;
}

// 发布
gulp.task('publish', ['clean'], function () {
  return gulp.start('index');
})