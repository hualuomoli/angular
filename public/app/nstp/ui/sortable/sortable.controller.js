(function() {
	'use strict';

	angular
		.module('nstp.ui.sortable')
		.controller('nstp_ui_sortableCtrl', nstp_ui_sortableCtrl);

	/** @ngInject */
	function nstp_ui_sortableCtrl($scope, nstp_ui_sortableService) {

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadData();
		});

		function loadData() {
			nstp_ui_sortableService
				.loadData()
				.then(function(data) {

				});
		}

	}

})();