###
# 菜单
###
angular.module 'nstp'
.directive 'nstpUiNav', ['$timeout', ($timeout)->

  restrict: 'AC'
  link: (scope, ele, attrs)->
    _window = $(window)
    wrap = $('.app-aside')
    backdrop = '.dropdown-backdrop'
    # 小屏幕大小
    _mb = 768 
    next = false

    # 点击事件
    ele.on 'click', 'a', (e)->
      _this = $(this)
      next && next.trigger('mouseleave.nav')

      _this.parent().siblings( ".active" ).toggleClass('active')
      _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault()
      # mobile
      _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );


    # 鼠标进入 folded & fixed
    ele.on 'mouseenter', 'a', (e)->
      next && next.trigger('mouseleave.nav')
      $('> .nav', wrap).remove()

      # 
      if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb ) || $('.app-aside-dock').length) 
        return

      _this = $(e.target)
      w_h = $(window).height()
      offset = 50
      min = 150

      !_this.is('a') && (_this = _this.closest('a'))
      if( _this.next().is('ul') )
        next = _this.next()
      else
        return
      
      _this.parent().addClass('active')
      top = _this.parent().position().top + offset
      next.css('top', top)
      if( top + next.height() > w_h )
        next.css('bottom', 0)
      
      if(top + min > w_h)
        next.css('bottom', w_h - top - offset).css('top', 'auto')

      next.appendTo(wrap)

      next.on 'mouseleave.nav', (e)->
        $(backdrop).remove();
        next.appendTo(_this.parent())
        next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto')
        _this.parent().removeClass('active')

      $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on 'click', (next)->
        next && next.trigger('mouseleave.nav');

    
    wrap.on 'mouseleave', (e)->
      next && next.trigger('mouseleave.nav');
      $('> .nav', wrap).remove();
]