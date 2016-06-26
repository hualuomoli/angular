(function() {
	'use strict';

	angular
		.module('nstp')
		.service('nstpService', nstpService);

	/** @ngInject */
	function nstpService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadStates = loadStates;
		service.loadPermissions = loadPermissions;

		function loadStates() {
			return dataLoad.load([
				'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
			]);

		}

		function loadPermissions() {
			return dataLoad.load([
				'nstp:navigation',
				'nstp:dashboard',
				'nstp:dashboard:v1', // menu
				'nstp:dashboard:v1:view', // function
				'nstp:dashboard:v2',
				'nstp:calendar',
				'nstp:email',
				'nstp:apps',
				'nstp:apps:note',
				// 'nstp:apps:contacts', // remove
				'nstp:apps:weather',
			]);
		}

	}

})();