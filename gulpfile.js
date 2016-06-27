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

// scss编译
var scss = require('gulp-scss');
// 浏览器前缀
var autoprefixer = require('gulp-autoprefixer');
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

// 浏览器前缀配置
var autoprefixerConfig = {
  browsers: ['last 2 versions', '>5%'],
  cascade: false,
  remove: false
}

options = build.put(options, minimist(process.argv.slice(2)));

console.log(options);

// clean
gulp.task('clean', function () {
  return gulp.src(options.dist, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

// assets
gulp.task('js:assets', function () {
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
    .pipe(rename(function (path) {
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
gulp.task('js:app', function () {
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
      './public/directives/**/*', // directives
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
    .pipe(rename(function (path) {
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
gulp.task('js:app:lazy', function () {
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
gulp.task('fonts', function () {
  return gulp.src(['./public/**/fonts/**/*'], {
      base: './public'
    })
    .pipe(gulp.dest(options.dist));
})

// scss
gulp.task('scss', function () {
  return gulp.src(['./public/**/scss/*.scss'], {
      base: './public'
    })
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // scss编译
    .pipe(scss())
    // 输出到css目录下
    .pipe(rename(function (path) {
      path.dirname += '/../css';
    }))
    // 添加浏览器前缀
    .pipe(autoprefixer(autoprefixerConfig))
    // 压缩
    .pipe(gulpif(options.min, cleanCSS()))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(options.dist));
})

// css
gulp.task('css', function () {
  return gulp.src(['./public/**/css/**/*'], {
      base: './public'
    })
    // sourcemaps开始
    .pipe(sourcemaps.init())
    // 添加浏览器前缀
    .pipe(autoprefixer(autoprefixerConfig))
    // 压缩
    .pipe(gulpif(options.min, cleanCSS()))
    // sourcemaps结束
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(options.dist));
})

// image
gulp.task('image', function () {
  return gulp.src([
      './public/**/image/**/*',
      './public/**/img/**/*'
    ], {
      base: './public'
    })
    .pipe(gulp.dest(options.dist));
});

// tpl
gulp.task('tpl', function () {
  return gulp.src([
      './public/index.html',
      './public/**/tpl/**/*'
    ], {
      base: './public'
    })
    .pipe(gulp.dest(options.dist));
});

// start
gulp.task('start', ['js:assets', 'js:app', 'js:app:lazy', 'fonts', 'scss', 'css', 'image', 'tpl'], function (cb) {
  return cb();
})

// index -- 替换
gulp.task('index', ['start'], function () {

  var jsAppArray = build.files;

  return gulp.src('./public/index.html', {
      base: 'public'
    })
    .pipe(htmlreplace({
      'css': [ // 公共CSS库
        // bootstrap
        'http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css',
        // 字体库
        'http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css',
        // 加载样式
        'http://cdn.bootcss.com/simple-line-icons/2.3.1/css/simple-line-icons.min.css'
      ],
      'js': [ // 公共依赖
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
        // 模板
        'http://cdn.bootcss.com/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min.js'
      ],
      'js-app': jsAppArray
    }))
    .pipe(gulp.dest(options.dist));

})

// watch
gulp.task('watch', ['start'], function () {

  // 浏览器调试工具
  browserSync.init({
    port: 3000, // 端口
    server: {
      baseDir: [options.dist], // 主目录
      index: "index.html", // 主页
      routes: { // 路由
        "/bower_components": "./bower_components",
        "/vendor": "./vendor",
        '/favicon.ico': './favicon.ico',
      }
    }
  });

  // js - assets
  gulp.watch(['./public/**/*'], ['start']).on('change', browserSync.reload);

})

// 默认任务
gulp.task('default', ['clean'], function () {
  if (options.publish) {
    gulp.start('index');
  } else {
    gulp.start('watch');
  }
})