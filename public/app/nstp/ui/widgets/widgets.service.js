(function() {
	'use strict';

	angular
		.module('nstp.ui.widgets')
		.service('nstp_ui_widgetsService', nstp_ui_widgetsService);

	/** @ngInject */
	function nstp_ui_widgetsService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadData = loadData;

		function loadData() {
			return dataLoad.load();

		}
	}

})();