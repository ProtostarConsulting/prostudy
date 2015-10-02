angular.module(
		"stockApp",
		[ 'ngMaterial', 'ngMessages', "xeditable", "ui.bootstrap", "ui.router",
				'md.data.table', 'ngResource' ]).config(
		function($mdThemingProvider) {
			$mdThemingProvider.theme('default').primaryPalette('light-blue')
					.accentPalette('pink');
		}).config(
		function($stateProvider, $urlRouterProvider) {
			// This adds config 2
			// For any unmatched url, redirect to /state1
			$urlRouterProvider.otherwise("/home");

			// Now set up the states
			$stateProvider.state('state1', {
				url : "/state1",
				templateUrl : "/app/demo/state1.html",
				controller : 'statesPageCtr'
			}).state('state1.list', {
				url : "/list",
				templateUrl : "/app/demo/state1.list.html",
				controller : 'statesPageCtr'
			}).state('home', {
				url : "/home",
				templateUrl : '/home.html',
				controller : 'homeCtr'
			}).state('student.listtest', {
				url : "/listtest",
				templateUrl : '/app/demo/table_demo3_view.html',
				controller : 'nutritionController'
			}).state('stock', {
				url : "/stock",
				templateUrl : '/app/stock/stock_module.html',
				controller : 'addItemStockCtr'
			}).state('stock.stockItemAdd', {
				url : "/stockItemAdd",
				templateUrl : '/app/stock/stockItem_add.html',
				controller : 'addItemStockCtr'
			}).state('stock.stockItemList', {
				url : "/stockItemList",
				templateUrl : '/app/stock/stockItem_list.html',
				controller : 'addItemStockCtr'
			}).state('invoice', {
				url : "/invoice",
				templateUrl : '/app/invoice/invoice_module.html',
				controller : 'invoiceCtr'
			}).state('invoice.add', {
				url : "/add",
				templateUrl : '/app/invoice/invoice_add.html',
				controller : 'invoiceCtr'
			}).state('invoice.list', {
				url : "/list",
				templateUrl : '/app/invoice/invoice_list.html',
				controller : 'invoiceCtr'
			}).state('customer', {
				url : "/customer",
				templateUrl : '/app/customer/customer_module.html',
				controller : 'customerCtr'
			}).state('customer.add', {
				url : "/add",
				templateUrl : '/app/customer/customer_add.html',
				controller : 'customerCtr'
			}).state('customer.list', {
				url : "/list",
				templateUrl : '/app/customer/customer_list.html',
				controller : 'customerCtr'
			})/*.state('fileupload', {
				url : "/fileupload",
				templateUrl : '/app/fileupload/fileupload.html',
				controller : 'fileuploadCtr'
			}).state('fileupload', {
				url : "/fileupload",
				templateUrl : '/app/fileupload/fileupload.html',
				controller : 'fileuploadCtr'
			})*/;
		});