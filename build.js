// 
var build = {};

// angular 文件
var files = [];

/**
 * 获取path的字符串路径
 * @param  path 路径Object
 * @return      相对路径
 */
function toString(path) {
  var dirname = path.dirname.split('\\').join('/');
  var basename = path.basename;
  var extname = path.extname;
  return dirname + '/' + basename + extname;
}

/**
 * 添加文件路径到js中
 * @param path 路径Object
 */
function add(path) {
  files[files.length] = toString(path);
}

/**
 * Objetct加另一个Objetct
 * @param dest 目标
 * @param src  需要添加的数据
 * @return     新目标
 */
function put(dest, src) {
  for (var key in src) {
    dest[key] = src[key];
  }
  return dest;
}

build.files = files;
build.add = add;
build.put = put;

module.exports = build;