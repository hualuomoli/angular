/**
 * 开发环境,修改文件后浏览器自动刷新
 * 配置config.js修改发布目录
 * gulp --gulpfile development.js
 */
var gulp = require('gulp');

// 文件重命名
var rename = require("gulp-rename");

// 清除目录
var clean = require('gulp-clean');

// JS验证
var jshint = require('gulp-jshint');

// Html内容替换
var htmlreplace = require('gulp-html-replace');

// 浏览器调试
var browserSync = require('browser-sync').create();

// 配置文件
var config = require('./config').development;

// 临时数据
var temp = {
  js: {
    module: [],
    provider: [],
    directive: [],
    factory: [],
    interceptor: [],
    service: [],
    controller: [],
    config: [],
    router: [],
    other: []
  }
};

// 获取文件类型
function addTempFile(path, type) {
  var basename = path.basename;
  var index = basename.lastIndexOf('.');
  var name = '';
  if (index == -1) {
    name = 'other';
  } else {
    name = basename.substr(index + 1);
  }
  doAddTempFile(path, type, name);
}

// 添加文件
function doAddTempFile(path, type, name) {
  var array = temp[type][name];
  array[array.length] = getPathStr(path);
}

// 获取path的字符串路径
function getPathStr(path) {
  var dirname = path.dirname.split('\\').join('/');
  var basename = path.basename;
  var extname = path.extname;
  return dirname + '/' + basename + extname;
}

// 添加html的依赖
function addDependencys(array, type) {
  addDependency(array, type, 'module');
  addDependency(array, type, 'provider');
  addDependency(array, type, 'directive');
  addDependency(array, type, 'factory');
  addDependency(array, type, 'interceptor');
  // addDependency(array, type, 'controller'); // 懒加载
  // addDependency(array, type, 'service'); // 懒加载
  addDependency(array, type, 'config');
  addDependency(array, type, 'router');
  addDependency(array, type, 'other');
}

// 添加html的依赖
function addDependency(array, type, name) {
  var types = temp[type][name];
  for (var i = 0; i < types.length; i++) {
    array[array.length] = types[i];
  }
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
    .pipe(gulp.dest(config.dist));
})

// JS
gulp.task('js', function () {
  return gulp
    .src(['../public/assets/**/*', '../public/app/**/*'], {
      base: '../public'
    })
    // js验证
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // 记录文件类型
    .pipe(rename(function (path) {
      addTempFile(path, 'js');
    }))
    // 输出文件
    .pipe(gulp.dest(config.dist));
});

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

//////////////////////////////////
///////////  发布  ///////////////
//////////////////////////////////
// index.html
gulp.task('index', ['css', 'js', 'image', 'html'], function () {

  var jss = [
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
    'bower_components/ngstorage/ngStorage.min.js'
  ];

  // add
  addDependencys(jss, 'js');

  return gulp.src('../public/index.html')
    .pipe(htmlreplace({
      'css': [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/simple-line-icons/css/simple-line-icons.css'
      ],
      'js': jss
    }))
    .pipe(gulp.dest(config.dist));
})

// watch
gulp.task('watch', ['index'], function () {

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

  // 文件改变时重新加载
  gulp.watch('../public/**/*', ['index']).on('change', browserSync.reload);

});

// 
gulp.task('default', ['clean'], function () {
  return gulp.start('watch');
})