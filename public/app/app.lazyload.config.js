(function() {
  'use strict';

  // 内网环境

  angular
    .module('app')
    .constant('JQ_CONFIG', { // jquery 插件
      easyPieChart: [
        'vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'
      ],
      sparkline: [
        'vendor/jquery/charts/sparkline/jquery.sparkline.min.js'
      ],
      plot: [
        'vendor/jquery/charts/flot/jquery.flot.min.js',
        'vendor/jquery/charts/flot/jquery.flot.resize.js',
        'vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
        'vendor/jquery/charts/flot/jquery.flot.spline.js',
        'vendor/jquery/charts/flot/jquery.flot.orderBars.js',
        'vendor/jquery/charts/flot/jquery.flot.pie.min.js'
      ],
      slimScroll: [
        'vendor/jquery/slimscroll/jquery.slimscroll.min.js'
      ],
      sortable: [
        'vendor/jquery/sortable/jquery.sortable.js'
      ],
      nestable: [
        'vendor/jquery/nestable/jquery.nestable.js',
        'vendor/jquery/nestable/nestable.css'
      ],
      filestyle: [
        'vendor/jquery/file/bootstrap-filestyle.min.js'
      ],
      slider: [
        'vendor/jquery/slider/bootstrap-slider.js',
        'vendor/jquery/slider/slider.css'
      ],
      chosen: [
        'vendor/jquery/chosen/chosen.jquery.min.js',
        'vendor/jquery/chosen/chosen.css'
      ],
      TouchSpin: [
        'vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
        'vendor/jquery/spinner/jquery.bootstrap-touchspin.css'
      ],
      wysiwyg: [
        'vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
        'vendor/jquery/wysiwyg/jquery.hotkeys.js'
      ],
      dataTable: [
        'vendor/jquery/datatables/jquery.dataTables.min.js',
        'vendor/jquery/datatables/dataTables.bootstrap.js',
        'vendor/jquery/datatables/dataTables.bootstrap.css'
      ],
      vectorMap: [
        'vendor/jquery/jvectormap/jquery-jvectormap.min.js',
        'vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
        'vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
        'vendor/jquery/jvectormap/jquery-jvectormap.css'
      ],
      footable: [
        'vendor/jquery/footable/footable.all.min.js',
        'vendor/jquery/footable/footable.core.css'
      ]
    })
    .constant('VENDOR_CONFIG', { // 第三方
      screenfull: [
        'bower_components/screenfull/dist/screenfull.min.js'
      ]
    })
    .constant('MODULE_CONFIG', { // 模块

    })
    .config(config);

  /** @ngInject */
  function config($ocLazyLoadProvider) {

    // 懒加载
    $ocLazyLoadProvider
      .config({
        debug: true,
        events: true,
        modules: [{ // app
          name: 'app',
          files: [

          ]
        }]
      });

  }

})();