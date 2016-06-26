(function() {
	'use strict';

	angular
		.module('nstp.ui', [

			'ui.router',
			'oc.lazyLoad',

			'assets',

			// 
			'nstp.ui.buttons',
			'nstp.ui.icons',
			'nstp.ui.grid',
			'nstp.ui.widgets',
			'nstp.ui.bootstrap',
			'nstp.ui.sortable',
			'nstp.ui.portlet',
			'nstp.ui.timeline',
			'nstp.ui.toaster'

		])

})();