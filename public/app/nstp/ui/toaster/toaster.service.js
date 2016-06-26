(function() {
	'use strict';

	angular
		.module('nstp.ui.toaster')
		.service('nstp_ui_toasterService', nstp_ui_toasterService);

	/** @ngInject */
	function nstp_ui_toasterService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadData = loadData;

		function loadData() {
			return dataLoad.load();

		}
	}

})();