(function() {
	'use strict';

	angular
		.module('nstp.ui.grid')
		.controller('nstp_ui_gridCtrl', nstp_ui_gridCtrl);

	/** @ngInject */
	function nstp_ui_gridCtrl($scope, nstp_ui_gridService) {

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadData();
		});

		function loadData() {
			nstp_ui_gridService
				.loadData()
				.then(function(data) {

				});
		}

	}

})();