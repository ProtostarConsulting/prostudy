var app = angular.module("stockApp", [ 'ngMaterial', 'ngMessages', "xeditable",
		"ui.bootstrap", "ui.router", 'md.data.table', 'ngResource',
		'ngStorage', 'ngRoute']);

app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default').primaryPalette('light-blue')
			.accentPalette('pink');
});
app.config(function($logProvider) {
	// $logProvider.debugEnabled(false);
	$logProvider.debugEnabled(true);// this is default
});

app.config(function($stateProvider, $urlRouterProvider) {
	// This adds config 2
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/home");
	// Now set up the states
	$stateProvider.state('state1', {
		url : "/state1",
		templateUrl : "/app/demo/state1.html",
		controller : 'statesPageCtr'
	}).state('state1.list', {
		url : "/list/:someVal",
		templateUrl : "/app/demo/state1.list.html",
		controller : 'statesPageCtr'
	}).state('home', {
		url : "/home",
		templateUrl : '/home.html',
		controller : 'homeCtr'
	}).state('student', {
		url : "/student",
		templateUrl : '/app/student/student_module.html',
		controller : 'customerCtr'
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
	}).state('stock.reportByThreshold', {
		url : "/reportByThreshold",
		templateUrl : '/app/stock/stock_reportByThreshold.html',
		controller : 'addItemStockCtr'
	}).state('stock.taxadd', {
		url : "/tax/taxadd",
		templateUrl : '/app/tax/tax_add.html',
		controller : 'taxCtr'
	}).state('stock.taxlist', {
		url : "/tax/taxlist",
		templateUrl : '/app/tax/tax_list.html',
		controller : 'taxCtr'
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
		controller : 'invoiceCtr',
	}).state('invoice.view', {
		url : "/view/:selectedInvoiceNo",
		templateUrl : '/app/invoice/invoice_view.html',
		controller : 'invoiceCtr',
	}).state('customer', {
		url : "/customer",
		templateUrl : '/app/customer/customer_module.html',
		controller : 'customerCtr'
	}).state('customer.add', {
		url : "/add",
		templateUrl : '/app/customer/customer_add.html',
		controller : 'customerCtr'
	}).state('customer.view', {
		url : "/view/:selectedCustomerId",
		templateUrl : '/app/customer/customer_view.html',
		controller : 'customerCtr'
	}).state('customer.list', {
		url : "/list",
		templateUrl : '/app/customer/customer_list.html',
		controller : 'customerCtr'
	}).state('report', {
		url : "/report",
		templateUrl : '/app/report/report_module.html',
		controller : 'reportCtr'
	}).state('report.byThreshhold', {
		url : "/byThreshhold",
		templateUrl : '/app/report/report_bythreshold.html',
		controller : 'reportCtr'
	}).state('report.allcustomer', {
		url : "/allcustomer",
		templateUrl : '/app/report/customer_list.html',
		controller : 'reportCtr'
	}).state('salesOrder', {
		url : "/salesOrder",
		templateUrl : '/app/sales/sales_module.html',
		controller : 'salesCtr'
	}).state('salesOrder.SalesOrderAdd', {
		url : "/SalesOrderAdd",
		templateUrl : '/app/sales/salesOrder_add.html',
		controller : 'salesCtr'
	}).state('salesOrder.SalesOrderList', {
		url : "/SalesOrderList",
		templateUrl : '/app/sales/salesOrder_list.html',
		controller : 'salesCtr'
	}).state('salesOrder.view', {
		url : "/SalesOrderview/:selectedSOId",
		templateUrl : '/app/sales/salesOder_view.html',
		controller : 'salesCtr'
	}).state('salesOrder.PurchaseOrderadd', {
		url : "/PurchaseOrderadd",
		templateUrl : '/app/purchase/purchaseOrder_add.html',
		controller : 'purchaseCtr'
	}).state('salesOrder.PurchaseOrderList', {
		url : "/PurchaseOrderList",
		templateUrl : '/app/purchase/purchaseOrder_list.html',
		controller : 'purchaseCtr'
	}).state('salesOrder.POview', {
		url : "/POview/:selectedPONo",
		templateUrl : '/app/purchase/purchaseOrder_view.html',
		controller : 'purchaseCtr'
	}).state('hr', {
		url : "/hr",
		templateUrl : '/app/hr/hr_module.html',
		controller : 'customerCtr'
	}).state('hr.employeeadd', {
		url : "/empadd",
		templateUrl : '/app/hr/employee_add.html',
		controller : 'hrCtr.add'
	}).state('hr.employeelist', {
		url : "/emplist",
		templateUrl : '/app/hr/employee_list.html',
		controller : 'hrCtr.emplist'
	}).state('hr.empview', {
		url : "/view/:selectedempNo",
		templateUrl : '/app/hr/employee_view.html',
		controller : 'hrCtr.empview',
	}).state('hr.docuplode', {
		url : "/document",
		templateUrl : '/app/hr/employee_doc.html',
		controller : 'hrCtr.empdoc',
	}).state('hr.salarystru', {
		url : "/SalaryStructure",
		templateUrl : '/app/hr/employee_salstruct.html',
		controller : 'hrCtr.addupdatesalstruct',
	}).state('hr.salslip', {
		url : "/Salaryslip",
		templateUrl : '/app/hr/employee_salslip.html',
		controller : 'hrCtr.empsalslipstruct',
	}).state('hr.gSalSlip', {
		url : "/gSalSlip/:selectedempstructno",
		templateUrl : '/app/hr/ganerate_salaryslip.html',
		controller : 'hrCtr.empsalslipstruct',
	}).state('hr.generatesalslip', {
		url : "/generatesalslip",
		templateUrl : '/app/hr/ganerate_multiple_salaryslip.html',
		controller : 'hrCtr.emplist_to_ganeratesalslip',
	}).state('hr.printgeneratesalslip', {
		url : "/selectedlist",
		templateUrl : '/app/hr/slected_Employeesalaryslip.html',
		controller : 'hrCtr.emplist_to_ganeratesalslip',
	}).state('hr.print', {
		url : "/print/:printempidsalslip",
		templateUrl : '/app/hr/print_salaryslip.html',
		controller : 'hrCtr.emplist_to_ganeratesalslip',
	});
});
