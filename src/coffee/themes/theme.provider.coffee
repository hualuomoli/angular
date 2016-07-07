angular.module 'theme'
.provider 'theme', ['$stateProvider', ($stateProvider)->

  this.config = {
    themeName: 'app'
  }

  this.state = (state, config)->
    return $stateProvider.state(this.config.themeName + '.' + state, config)

  this.$get = ()->
   

  return

]