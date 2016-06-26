(function() {
	'use strict';

	angular
		.module('nstp.ui.portlet')
		.controller('nstp_ui_portletCtrl', nstp_ui_portletCtrl);

	/** @ngInject */
	function nstp_ui_portletCtrl($scope, nstp_ui_portletService) {

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadData();
		});

		function loadData() {
			nstp_ui_portletService
				.loadData()
				.then(function(data) {

				});
		}

	}

})();