(function() {
	'use strict';

	angular
		.module('nstp.dashboard.v2')
		.controller('nstp_dashboard_v2Ctrl', nstp_dashboard_v2Ctrl);

	/** @ngInject */
	function nstp_dashboard_v2Ctrl($scope, nstp_dashboard_v2Service) {

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadData();
		});

		$scope.d = [];

		$scope.d0_1 = [];
		$scope.d0_2 = [];
		$scope.d1_1 = [];
		$scope.d1_2 = [];
		$scope.d1_3 = [];
		$scope.d2 = [];
		$scope.d3 = [];
		$scope.d4 = [];

		$scope.refreshData = function() {
			$scope.d0_1 = $scope.d0_2;
		};

		function loadData() {
			nstp_dashboard_v2Service
				.loadD()
				.then(function(data) {
					$scope.d = data;
				});
			nstp_dashboard_v2Service
				.loadD01()
				.then(function(data) {
					$scope.d0_1 = data;
				});
			nstp_dashboard_v2Service
				.loadD02()
				.then(function(data) {
					$scope.d0_2 = data;
				});
			nstp_dashboard_v2Service
				.loadD11()
				.then(function(data) {
					$scope.d1_1 = data;
				});
			nstp_dashboard_v2Service
				.loadD12()
				.then(function(data) {
					$scope.d1_2 = data;
				});
			nstp_dashboard_v2Service
				.loadD13()
				.then(function(data) {
					$scope.d1_3 = data;
				});
			nstp_dashboard_v2Service
				.loadD2()
				.then(function(data) {
					$scope.d2 = data;
				});
			nstp_dashboard_v2Service
				.loadD3()
				.then(function(data) {
					$scope.d3 = data;
				});
			nstp_dashboard_v2Service
				.loadD4()
				.then(function(data) {
					$scope.d4 = data;
				});
		}

	}

})();