var gulp = require('gulp');

// 清除目录
var clean = require('gulp-clean');
// 合并文件
var concat = require('gulp-concat');
// 文件重命名
var rename = require("gulp-rename");
// 文件的原信息
var sourcemaps = require('gulp-sourcemaps');

// coffee
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
// JS压缩
var uglify = require('gulp-uglify');

// sass编译
var sass = require('gulp-sass');
// 浏览器前缀
var autoprefixer = require('gulp-autoprefixer');
// CSS压缩
var cleanCSS = require('gulp-clean-css');

// html
var htmlreplace = require('gulp-html-replace');

// clean
gulp.task('clean', function () {
  return gulp.src('./dist', {
    read: false
  }).pipe(clean());
});

// coffee
gulp.task('coffee', function () {
  return gulp.src([
      './src/coffee/boot/*.coffee', // boot

      './src/coffee/**/*.module.coffee', // module
      './src/coffee/**/*.provider.coffee', // provider
      './src/coffee/**/*.factory.coffee', // factory
      './src/coffee/**/*.config.coffee', // config
      './src/coffee/**/*.router.coffee', // router
      './src/coffee/**/directives/*.coffee', // directives

      './src/coffee/**/*.service.coffee', // service
      './src/coffee/**/*.controller.coffee'
    ])
    // coffee
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    // 合并成一个文件
    .pipe(concat('app.js'))
    // 输出源码文件
    .pipe(gulp.dest('./dist'))
    // 压缩前修改文件名,增加.min
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(uglify())
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    // 输出压缩文件
    .pipe(gulp.dest('./dist'));
})

// sass
gulp.task('scss', function () {
  return gulp.src([
      './src/**/*.scss',
      './src/**/*.sass'
    ], {
      base: './src'
    })
    // sass编译
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    // 添加浏览器前缀
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '>5%'],
      cascade: false,
      remove: false
    }))
    // 修改输出目录
    .pipe(rename(function (path) {
      path.dirname = path.dirname + '/../css';
    }))
    // 输出源码文件
    .pipe(gulp.dest('./dist'))
    // 压缩前修改文件名,增加.min
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 压缩
    .pipe(cleanCSS())
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    // 输出压缩文件
    .pipe(gulp.dest('./dist'));
})

// img
gulp.task('img', function () {
  return gulp.src([
      './src/**/img/**/*'
    ], {
      base: './src'
    })
    .pipe(gulp.dest('./dist'))
})

// tpl
gulp.task('tpl', function () {
  return gulp.src([
      '!./src/index.html',
      './src/**/*.html'
    ], {
      base: './src'
    })
    .pipe(gulp.dest('./dist'))
})

// index
gulp.task('index', function () {
  return gulp.src([
      './src/index.html'
    ])
    .pipe(htmlreplace({
      'js': './app.js'
    }))
    .pipe(gulp.dest('./dist'))
})

// test json
gulp.task('test', function () {
  return gulp.src([
      './src/test/*.json'
    ], {
      base: './src'
    })
    .pipe(gulp.dest('./dist'))
})

// 开始
gulp.task('start', ['coffee', 'scss', 'img', 'tpl', 'index', 'test'], function (cb) {
  return cb();
})

// watch
gulp.task('watch', ['start'], function (cb) {
  return cb();
})

// 默认 
gulp.task('default', ['clean'], function () {
  return gulp.start('start');
})