(function() {
	'use strict';

	angular
		.module('nstp.dashboard.v1')
		.controller('nstp_dashboard_v1Ctrl', nstp_dashboard_v1Ctrl);

	/** @ngInject */
	function nstp_dashboard_v1Ctrl($scope, nstp_dashboard_v1Service) {

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
			nstp_dashboard_v1Service
				.loadD()
				.then(function(data) {
					$scope.d = data;
				});
			nstp_dashboard_v1Service
				.loadD01()
				.then(function(data) {
					$scope.d0_1 = data;
				});
			nstp_dashboard_v1Service
				.loadD02()
				.then(function(data) {
					$scope.d0_2 = data;
				});
			nstp_dashboard_v1Service
				.loadD11()
				.then(function(data) {
					$scope.d1_1 = data;
				});
			nstp_dashboard_v1Service
				.loadD12()
				.then(function(data) {
					$scope.d1_2 = data;
				});
			nstp_dashboard_v1Service
				.loadD13()
				.then(function(data) {
					$scope.d1_3 = data;
				});
			nstp_dashboard_v1Service
				.loadD2()
				.then(function(data) {
					$scope.d2 = data;
				});
			nstp_dashboard_v1Service
				.loadD3()
				.then(function(data) {
					$scope.d3 = data;
				});
			nstp_dashboard_v1Service
				.loadD4()
				.then(function(data) {
					$scope.d4 = data;
				});
		}

	}

})();