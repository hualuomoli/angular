(function() {
	'use strict';

	angular
		.module('nstp.ui.toaster')
		.controller('nstp_ui_toasterCtrl', nstp_ui_toasterCtrl);

	/** @ngInject */
	function nstp_ui_toasterCtrl($scope, nstp_ui_toasterService, toaster) {

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadData();
		});

		$scope.toaster = {
			type: 'success',
			title: 'Title',
			text: 'Message'
		};
		$scope.pop = function() {
			toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
		};

		function loadData() {
			nstp_ui_toasterService
				.loadData()
				.then(function(data) {

				});
		}

	}

})();