(function() {
	'use strict';

	angular
		.module('assets.device')
		.factory('device', device);

	/** @ngInject */
	function device($window) {

		return {
			isIE: isIE,
			isSmartDevice: isSmartDevice
		}

		// 是否是IE
		function isIE() {
			return !!navigator.userAgent.match(/MSIE/i);
		}

		// 是否是小型号设备
		function isSmartDevice() {
			// Adapted from http://www.detectmobilebrowsers.com
			var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
			// Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
			return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
		}

	}

})();