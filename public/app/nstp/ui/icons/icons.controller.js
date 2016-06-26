(function() {
	'use strict';

	angular
		.module('nstp.ui.icons')
		.controller('nstp_ui_iconsCtrl', nstp_ui_iconsCtrl);

	/** @ngInject */
	function nstp_ui_iconsCtrl($scope, nstp_ui_iconsService) {

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadData();
		});

		function loadData() {
			nstp_ui_iconsService
				.loadData()
				.then(function(data) {

				});
		}

	}

})();