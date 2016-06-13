// 
var build = {};

// angular 文件
var angularFiles = {
  module: [],
  provider: [],
  factory: [],
  directive: [],
  interceptor: [],
  service: [],
  controller: [],
  config: [],
  router: [],
  rev: []
}

// 临时文件
var temp = {};

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
  var basename = path.basename;

  // 获取basename的种类 user.config.js --> config
  var name = '';
  if (basename.lastIndexOf('.') !== -1) {
    name = basename.substr(basename.lastIndexOf('.') + 1);
  } else if (basename.lastIndexOf('-') !== -1) {
    name = 'rev';
  } else {
    throw new Error('can not support file ' + path);
  }

  var array = angularFiles[name];
  array[array.length] = path;
}

/**
 * 转换成array
 * @param  types 输出种类,默认输出所有
 * @return array
 */
function toArray(types) {

  types = !types ? Object.keys(angularFiles) : types; // 空,输出所有
  types = isArray(types) ? types : types.split(','); // 如果不是array,转化成array

  // 输出
  var array = [];
  for (var i = 0; i < types.length; i++) {
    var datas = angularFiles[types[i]];
    for (var j = 0; j < datas.length; j++) {
      array[array.length] = toString(datas[j]);
    }
  }
  return array;
}

/**
 * 是否是Array
 * @param obj object
 * @return 是否是array
 */
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * Array数组添加另一个array数组
 * @param dest 目标数组
 * @param src  需要添加的数据
 * @return     目标新数组
 */
function pushArray(dest, src) {
  for (var i = 0; i < src.length; i++) {
    dest[dest.length] = src[i];
  }
  return dest;
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

build.add = add;
build.toArray = toArray;
build.toString = toString;
build.temp = temp;
build.pushArray = pushArray;
build.put = put;

module.exports = build;