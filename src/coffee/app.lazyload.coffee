angular.module 'app'

# 配置 Jquery的控件
.constant 'JQ_ASSETS_LIB', {
  easyPieChart: [
    'http://cdn.bootcss.com/easy-pie-chart/1.2.5/jquery.easy-pie-chart.js'
  ]
}

# 配置其他控件
.constant 'ASSETS_LIB', {
  # 全屏
  screenfull: [
    '../bower_components/screenfull/dist/screenfull.min.js'
  ]
}

# 配置 ocLazyLoad
.config ['$ocLazyLoadProvider', ($ocLazyLoadProvider)->

  # 配置lazyload文件
  $ocLazyLoadProvider.config ({
    debug:  true,
    events: true,
    modules: []
  })
]