(function() {
	'use strict';

	angular
		.module('nstp.ui.buttons')
		.service('nstp_ui_buttonsService', nstp_ui_buttonsService);

	/** @ngInject */
	function nstp_ui_buttonsService($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadData = loadData;

		function loadData() {
			return dataLoad.load();

		}
	}

})();