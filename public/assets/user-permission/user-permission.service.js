(function() {
	'use strict';

	angular
		.module('user.permission')
		.service('userPermission', userPermission);

	/** @ngInject */
	function userPermission() {
		/* jshint validthis: true */
		var service = this;

		var datas = {};

		service.setPermissions = setPermissions;
		service.hasPermission = hasPermission;

		function setPermissions(permissions) {
			datas = permissions;
		}

		function hasPermission(permission) {
			var p = datas[permission];
			return !!p;
		}

	}

})();