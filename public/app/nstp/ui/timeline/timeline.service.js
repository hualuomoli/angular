(function() {
	'use strict';

	angular
		.module('nstp.ui.timeline')
		.service('nstp_ui_timelineService', nstp_ui_timelineService);

	/** @ngInject */
	function nstp_ui_timelineService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadData = loadData;

		function loadData() {
			return dataLoad.load();

		}
	}

})();