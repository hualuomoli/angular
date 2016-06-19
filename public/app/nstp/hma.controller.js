(function() {
	'use strict';

	angular
		.module('hma')
		.controller('HmaAppCtrl', HmaAppCtrl);

	/** @ngInject */
	function HmaAppCtrl($scope, $localStorage, $http, $window, device) {

		// add 'ie' classes to html
		device.isIE() && angular.element($window.document.body).addClass('ie');
		device.isSmartDevice() && angular.element($window.document.body).addClass('smart');

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

		/////////////////////////////////////////////////////////
		//////////////////////  app message  ////////////////////
		/////////////////////////////////////////////////////////
		$scope.selected = undefined;
		$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
		// Any function returning a promise object can be used to load values asynchronously
		$scope.getLocation = function(val) {
			return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					address: val,
					sensor: false
				}
			}).then(function(res) {
				var addresses = [];
				angular.forEach(res.data.results, function(item) {
					addresses.push(item.formatted_address);
				});
				return addresses;
			});
		};

	}

})();