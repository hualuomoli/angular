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

// 发布目录
var dist = './dist';

// 清空发布目录
gulp.task('clean', function () {
  return gulp.src(dist, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

/**
 * Assets JS 组件压缩
 */
gulp.task('jsAssetsMin', function () {
  return gulp.src([
      './public/assets/**/*.module.js', // module
      './public/assets/**/*.provider.js', // provider
      './public/assets/**/*.factory.js', // factory
      './public/assets/**/*.directive.js' // directive
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
      build.tempFiles.jsAssetsMin = build.toString(path);
    }))
    // angular注解
    .pipe(ngAnnotate())
    // 保存源码
    .pipe(gulp.dest(dist))
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
    .pipe(gulp.dest(dist));
});

/**
 * App JS 复制
 */
gulp.task('jsAppCopy', function () {
  return gulp.src([
      './public/app/**/*.module.js', // module
      './public/app/**/*.interceptor.js', // interceptor
      './public/app/**/*.router.js', // router
      './public/app/**/*.service.js', // service
      './public/app/**/*.controller.js', // controller
      './public/app/app.config.js', // config
      './public/app/app.lazyload.config.js' // lazyLoad
    ], {
      base: './public'
    })
    // js验证
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // 记录文件类型
    .pipe(rename(function (path) {
      build.add(path); // 添加到js缓存
    }))
    // 输出文件
    .pipe(gulp.dest(dist));
});

/**
 * App资源压缩
 */
gulp.task('jsAppMin', ['jsAppMinCopy'], function () {
  // 压缩 module,router,interceptor,lazyload和app.config.js
  return gulp.src([
      './public/app/**/*.module.js', // module
      './public/app/**/*.interceptor.js', // interceptor
      './public/app/**/*.router.js', // router
      // ocLazyLoad
      './public/app/app.lazyload.config.js',
      './public/app/app.config.js' // config
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
      build.tempFiles.jsAppMin = build.toString(path);
    }))
    // angular注解
    .pipe(ngAnnotate())
    // 保存源码
    .pipe(gulp.dest(dist))
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
    .pipe(gulp.dest(dist));
});

/**
 * App资源压缩
 */
gulp.task('jsAppMinPublish', ['jsAppMinCopy'], function () {
  // 压缩 module,router,interceptor,lazyload和app.config.js
  return gulp.src([
      './public/app/**/*.module.js', // module
      './public/app/**/*.interceptor.js', // interceptor
      './public/app/**/*.router.js', // router
      // ocLazyLoad
      './public/app/app.network.lazyload.config.js',
      './public/app/app.config.js' // config
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
      build.tempFiles.jsAppMinPublish = build.toString(path);
    }))
    // angular注解
    .pipe(ngAnnotate())
    // 保存源码
    .pipe(gulp.dest(dist))
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
    .pipe(gulp.dest(dist));
});

/**
 * App资源压缩复制,懒加载
 */
gulp.task('jsAppMinCopy', function () {
  // 复制 service,controller
  return gulp.src([
      './public/app/**/*.service.js', // service
      './public/app/**/*.controller.js' // controller
    ])
    // js验证
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // angular注解
    .pipe(ngAnnotate())
    // 保存源码
    .pipe(gulp.dest(dist))
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
    .pipe(gulp.dest(dist));
});

/**
 * CSS复制
 */
gulp.task('cssCopy', function () {
  return gulp.src('./public/css/**/*', {
      base: './public'
    })
    .pipe(gulp.dest(dist));
});

/**
 * CSS压缩
 */
gulp.task('cssMin', function () {
  return gulp.src('./public/css/**/*', {
      base: './public'
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
    .pipe(gulp.dest(dist));
});

/**
 * 图片复制
 */
gulp.task('imageCopy', function () {
  return gulp
    .src(['./public/image/**/*'], {
      base: './public'
    })
    .pipe(gulp.dest(dist));
});

/**
 * 图片复制
 */
gulp.task('imageMin', function () {
  return gulp
    .src(['./public/image/**/*'], {
      base: './public'
    })
    .pipe(gulp.dest(dist));
});

/**
 * Html片段复制
 */
gulp.task('tplCopy', function () {
  return gulp
    .src(['./public/tpl/**/*'], {
      base: './public'
    })
    .pipe(gulp.dest(dist));
});

/**
 * Html片段复制
 */
gulp.task('tplMin', function () {
  return gulp
    .src(['./public/tpl/**/*'], {
      base: './public'
    })
    .pipe(gulp.dest(dist));
});

/**
 * 开发环境
 */
gulp.task('indexDev', ['jsAssetsMin', 'jsAppCopy', 'cssCopy', 'imageCopy', 'tplCopy'], function () {

  var jsArray = build.pushArray([
    // 必备
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/oclazyload/dist/ocLazyLoad.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'app/app.lazyload.config.js',
    'app/app.config.js'
  ], build.toArray([
    'module',
    'interceptor',
    'router'
  ]));


  return gulp.src('./public/index.html', {
      base: 'public'
    })
    .pipe(htmlreplace({
      'js': jsArray
    }))
    .pipe(gulp.dest(dist));


});

gulp.task('development', ['indexDev'], function () {

  browserSync.init({
    port: 3000, // 端口
    server: {
      baseDir: [dist], // 主目录
      index: "index.html", // 主页
      routes: { // 路由
        "/bower_components": "./bower_components",
        '/favicon.ico': './favicon.ico'
      }
    }
  });

  // 文件改变时重新加载
  gulp.watch('../public/**/*', ['indexDev']).on('change', browserSync.reload);

});


/**
 * 测试环境
 */
gulp.task('test', ['jsAssetsMin', 'jsAppMin', 'cssMin', 'imageMin', 'tplMin'], function () {

  gulp.src('./public/index.html', {
      base: 'public'
    })
    .pipe(htmlreplace({
      'js': [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/oclazyload/dist/ocLazyLoad.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        build.tempFiles.jsAssetsMin, // assets
        build.tempFiles.jsAppMin, // app
      ]
    }))
    .pipe(gulp.dest(dist));

  browserSync.init({
    port: 3000, // 端口
    server: {
      baseDir: [dist], // 主目录
      index: "index.html", // 主页
      routes: { // 路由
        "/bower_components": "./bower_components",
        '/favicon.ico': './favicon.ico'
      }
    }
  });


});


/**
 * 生产环境
 */
gulp.task('publish', ['jsAssetsMin', 'jsAppMinPublish', 'cssMin', 'imageMin', 'tplMin'], function () {
  gulp.src('./public/index.html', {
      base: 'public'
    })
    .pipe(htmlreplace({
      'js': [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/oclazyload/dist/ocLazyLoad.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        build.tempFiles.jsAssetsMin, // assets
        build.tempFiles.jsAppMinPublish, // app
      ]
    }))
    .pipe(gulp.dest(dist));

});


gulp.task('default', ['clean'], function () {
  return gulp.start('publish');
})