(function() {
	'use strict';

	angular
		.module('nstp.ui.timeline')
		.controller('nstp_ui_timelineCtrl', nstp_ui_timelineCtrl);

	/** @ngInject */
	function nstp_ui_timelineCtrl($scope, nstp_ui_timelineService) {

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadData();
		});

		function loadData() {
			nstp_ui_timelineService
				.loadData()
				.then(function(data) {

				});
		}

	}

})();