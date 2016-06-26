(function() {
	'use strict';

	angular
		.module('nstp.ui.grid')
		.service('nstp_ui_gridService', nstp_ui_gridService);

	/** @ngInject */
	function nstp_ui_gridService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadData = loadData;

		function loadData() {
			return dataLoad.load();

		}
	}

})();