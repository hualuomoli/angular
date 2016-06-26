(function() {
	'use strict';

	angular
		.module('nstp')
		.controller('nstpCtrl', nstpCtrl);

	/** @ngInject */
	function nstpCtrl($rootScope, $scope, $localStorage, nstpService, userPermission) {

		// config
		$scope.app = {
			name: 'Angulr',
			version: '1.3.3',
			// for chart colors
			color: {
				primary: '#7266ba',
				info: '#23b7e5',
				success: '#27c24c',
				warning: '#fad733',
				danger: '#f05050',
				light: '#e8eff0',
				dark: '#3a3f51',
				black: '#1c2b36'
			},
			settings: {
				themeID: 1,
				navbarHeaderColor: 'bg-black',
				navbarCollapseColor: 'bg-white-only',
				asideColor: 'bg-black',
				headerFixed: true,
				asideFixed: false,
				asideFolded: false,
				asideDock: false,
				container: false
			}
		}

		$localStorage.settings = undefined;

		// save settings to local storage
		if (angular.isDefined($localStorage.settings)) {
			$scope.app.settings = $localStorage.settings;
		} else {
			$localStorage.settings = $scope.app.settings;
		}
		$scope.$watch('app.settings', function() {
			if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
				// aside dock and fixed must set the header fixed.
				$scope.app.settings.headerFixed = true;
			}
			// save to local storage
			$localStorage.settings = $scope.app.settings;
		}, true);

		// header
		$scope.selected = undefined;
		$scope.states = [];

		// 是否有权限
		$rootScope.hasPermission = function(permission) {
			return userPermission.hasPermission(permission);
		}

		// 页面加载完成后,加载数据
		$scope.$watch('$viewContentLoaded', function() {
			loadStates();
		});

		function loadStates() {
			nstpService
				.loadStates()
				.then(function(data) {
					$scope.states = data;
				});
			nstpService
				.loadPermissions()
				.then(function(datas) {
					var permissions = {};
					for (var i = 0; i < datas.length; i++) {
						permissions[datas[i]] = true;
					}
					userPermission.setPermissions(permissions);
				});
		}

	}

})();