(function() {
	'use strict';

	angular
		.module('nstp.ui.icons')
		.service('nstp_ui_iconsService', nstp_ui_iconsService);

	/** @ngInject */
	function nstp_ui_iconsService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadData = loadData;

		function loadData() {
			return dataLoad.load();

		}
	}

})();