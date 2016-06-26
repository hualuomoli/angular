(function() {
	'use strict';

	angular
		.module('nstp.ui.portlet')
		.service('nstp_ui_portletService', nstp_ui_portletService);

	/** @ngInject */
	function nstp_ui_portletService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadData = loadData;

		function loadData() {
			return dataLoad.load();

		}
	}

})();