(function() {
	'use strict';

	angular
		.module('nstp.ui.bootstrap')
		.service('nstp_ui_bootstrapService', nstp_ui_bootstrapService);

	/** @ngInject */
	function nstp_ui_bootstrapService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadData = loadData;

		function loadData() {
			return dataLoad.load();

		}
	}

})();