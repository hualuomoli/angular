(function() {
	'use strict';

	angular
		.module('nstp.ui.sortable')
		.service('nstp_ui_sortableService', nstp_ui_sortableService);

	/** @ngInject */
	function nstp_ui_sortableService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadData = loadData;

		function loadData() {
			return dataLoad.load();

		}
	}

})();