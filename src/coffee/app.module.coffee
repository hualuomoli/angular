###
# 项目主入口
###
angular.module 'app', [
  'ui.router',
  'oc.lazyLoad',

  'hm',

  # 启动配置
  'boot',

  # 主题
  'theme',
  'test',
  'nstp',

  # 项目
  'demo',
  'tester'
]