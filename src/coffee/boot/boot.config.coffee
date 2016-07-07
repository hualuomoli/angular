###
# start app
###
angular.module 'boot', [
  'theme'
]

# 配置 Jquery的控件
.constant 'JQ_ASSETS_LIB', {
  easyPieChart: [
    '../bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js'
  ]
}

# 配置其他控件
.constant 'ASSETS_LIB', {
  # 全屏
  screenfull: [
    '../bower_components/screenfull/dist/screenfull.min.js'
  ]
}

# 主题
.config ['themeProvider', (themeProvider)->
  themeProvider.config.themeName = 'nstp'
]

# 配置 ocLazyLoad
.config ['$ocLazyLoadProvider', ($ocLazyLoadProvider)->

  # 配置lazyload文件
  $ocLazyLoadProvider.config ({
    debug:  true,
    events: true,
    modules: [{
      name: 'nstp',
      files: [
        'nstp/css/animate.css',
        'nstp/css/app.css'
      ]
    }]
  })
]
