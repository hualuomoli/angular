(function() {
	'use strict';

	angular
		.module('data.load')
		.factory('dataLoad', dataLoad);

	/** @ngInject */
	function dataLoad($q, $timeout) {

		return {
			load: load
		}

		// 加载本地数据,符合promise规范
		function load(data) {
			var deferred = $q.defer();
			$timeout(function() {
				deferred.resolve(data);
			}, 100);
			return deferred.promise;
		}

	}

})();