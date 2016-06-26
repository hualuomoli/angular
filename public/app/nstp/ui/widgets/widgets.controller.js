(function() {
	'use strict';

	angular
		.module('nstp.ui.widgets')
		.controller('nstp_ui_widgetsCtrl', nstp_ui_widgetsCtrl);

	/** @ngInject */
	function nstp_ui_widgetsCtrl($scope, nstp_ui_widgetsService) {

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadData();
		});

		function loadData() {
			nstp_ui_widgetsService
				.loadData()
				.then(function(data) {

				});
		}

	}

})();