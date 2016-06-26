(function() {
	'use strict';

	angular
		.module('nstp.ui.buttons')
		.controller('nstp_ui_buttonsCtrl', nstp_ui_buttonsCtrl);

	/** @ngInject */
	function nstp_ui_buttonsCtrl($scope, nstp_ui_buttonsService) {

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadData();
		});

		function loadData() {
			nstp_ui_buttonsService
				.loadData()
				.then(function(data) {

				});
		}

	}

})();