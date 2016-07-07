angular.module 'nstp'
.service 'nstpService', ['$http', 'hmResource', ($http, hmResource)->

  _self = this;
  _self.loadMenus = ()->
   return $http.get('test/menus.json')

  return _self
]