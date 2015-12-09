angular.module("stockApp").factory('localDBServiceFactory',
		localDBServiceFactory);

function localDBServiceFactory($log, $q, $timeout, $localStorage) {

	var serviceFactory = {};

	// Add Customer Service
	var CustomerService = {};

	serviceFactory.getCustomerService = function() {
		return CustomerService;
	}

	CustomerService.addCustomer = function(cust) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addCustomer...");
			var custList = angular.fromJson($localStorage.dbCustomers);
			if (typeof custList === 'undefined')
				custList = [];
			cust.customerId = custList.length + 1;
			custList.push(cust);
			$localStorage.dbCustomers = angular.toJson(custList);
			deferred.resolve({
				"msg" : "Customer Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	CustomerService.getCustomerByID = function(selectedCustomerId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];

			var custList = angular.fromJson($localStorage.dbCustomers);

			if (typeof custList === 'undefined')
				custList = [];

			for (i = 0; i < custList.length; i++) {
				if (selectedCustomerId == custList[i].customerId) {

					// selectedBillNo = invoiceList[i];
					tempItem.push(custList[i]);

					// $log.debug("TEMP===" + tempItem[i]);
				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}

	CustomerService.getAllCustomers = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getCustomers...");
			var custList = angular.fromJson($localStorage.dbCustomers);
			if (typeof custList === 'undefined')
				custList = [];
			deferred.resolve(custList);
		}, 1000);

		return deferred.promise;

	} // End of CustomerService

	//*************************************************************************************************************************		
	// Add hr Service
	var hrService = {};

	serviceFactory.gethrService = function() {
		return hrService;
	}

	hrService.addemp = function(emp) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addemp...");
			var empList = angular.fromJson($localStorage.dbemp);
			if (typeof empList === 'undefined')
				empList = [];
			empList.push(emp);
			$localStorage.dbemp = angular.toJson(empList);
			deferred.resolve({
				"msg" : "employee Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	hrService.getAllemp = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getemp...");
			var empList = angular.fromJson($localStorage.dbemp);
			if (typeof empList === 'undefined')
				empList = [];
			deferred.resolve(empList);
		}, 1000);

		return deferred.promise;

	}

	hrService.updateemp = function(editProfile) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side updated local DB updateuser...");
			var empList = angular.fromJson($localStorage.dbemp);
			if (typeof empList === 'undefined')
				empList = [];

			for (var i = 0; i < empList.length; i++) {
				if (editProfile.empid == empList[i].empid)
					empList[i] = editProfile;
			}

			$localStorage.dbemp = angular.toJson(empList);
			deferred.resolve({
				"msg" : "User data Updated Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	hrService.getempByID = function(selectedempNo) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];
			var empList = angular.fromJson($localStorage.dbemp);

			if (typeof empList === 'undefined')
				empList = [];

			for (i = 0; i < empList.length; i++) {
				if (selectedempNo == empList[i].empid) {
					tempItem.push(empList[i]);

				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}

	hrService.addsalstruct = function(salstruct) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addemp...");
			var salstructList = angular.fromJson($localStorage.dbsalstruct);
			if (typeof salstructList === 'undefined')
				salstructList = [];
			salstructList.push(salstruct);
			$localStorage.dbsalstruct = angular.toJson(salstructList);
			deferred.resolve({
				"msg" : "employee Salary Structure Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	hrService.findsalstruct = function(empid) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];
			var structList = angular.fromJson($localStorage.dbsalstruct);

			if (typeof structList === 'undefined')
				structList = [];

			for (i = 0; i < structList.length; i++) {
				if (empid == structList[i].empid) {
					tempItem.push(structList[i]);

				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}

	hrService.updatesalinfo = function(editsalstruct) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side updated local DB updateuser...");
			var salstructList = angular.fromJson($localStorage.dbsalstruct);
			if (typeof salstructList === 'undefined')
				salstructList = [];

			for (var i = 0; i < salstructList.length; i++) {
				if (editsalstruct.empid == salstructList[i].empid)
					salstructList[i] = editsalstruct;
			}

			$localStorage.dbsalstruct = angular.toJson(salstructList);
			deferred.resolve({
				"msg" : "User salary structure List Updated Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	hrService.adddoc = function(document) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB adddocumentr...");
			var documentList = angular.fromJson($localStorage.dbdocument);
			if (typeof documentList === 'undefined')
				documentList = [];
			documentList.push(document);
			$localStorage.dbdocument = angular.toJson(documentList);
			deferred.resolve({
				"msg" : "document Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	hrService.getstructByID = function(selectedempNo) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];
	
			var empstructList = angular.fromJson($localStorage.dbsalstruct);
		

			if (typeof empstructList === 'undefined')
				empstructList = [];
		

			for (i = 0; i < empstructList.length; i++) {
				if (selectedempNo == empstructList[i].empid) {
					tempItem.push(empstructList[i]);

				}
			}
			
			deferred.resolve(tempItem);
			

		}, 1000);
		return deferred.promise;
	}

	hrService.getAllempsSalStruct = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side get local DB dbsalstruct...");
			var empstructList = angular.fromJson($localStorage.dbsalstruct);
			if (typeof empstructList === 'undefined')
				empstructList = [];
			deferred.resolve(empstructList);
		}, 1000);

		return deferred.promise;

	}

	hrService.viewfindsalstruct = function(empid) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];
			var structList = angular.fromJson($localStorage.dbsalstruct);

			if (typeof structList === 'undefined')
				structList = [];

			for (i = 0; i < structList.length; i++) {
				if (empid == structList[i].empid) {
					tempItem.push(structList[i]);
				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}

	hrService.addgsalslip = function(salslip) {

		var deferred = $q.defer();
		//$timeout(function() {

			$log.debug("In side local DB addgsalslip...");
			var salslipList = angular.fromJson($localStorage.dbsalslip);
			if (typeof salslipList === 'undefined')
				salslipList = [];
			
			salslip.salslip_id = salslipList.length + 100;
			salslipList.push(salslip);
			$localStorage.dbsalslip = angular.toJson(salslipList);

		//}, 1000);

		return deferred.promise;
	}
	
	hrService.countOfRecordsiInganeratedslip = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side get local DB printganeratesalslip...");
			var empsalslipList = angular.fromJson($localStorage.dbsalslip);
			if (typeof empsalslipList === 'undefined')
				empsalslipList = [];
			deferred.resolve(empsalslipList);
		}, 1000);

		return deferred.promise;

	}
	hrService.displyOnlySelected= function(currmionth) {
		
		var deferred = $q.defer();
	//	$timeout(function() {
			var tempItem = [];
			var seletedtList = angular.fromJson($localStorage.dbsalslip);

			if (typeof seletedtList === 'undefined')
				seletedtList = [];

			for (i = 0; i < seletedtList.length; i++) {
				if (currmionth == seletedtList[i].month) {
					tempItem.push(seletedtList[i]);
				}
			}
			deferred.resolve(tempItem);

	//	}, 1000);
		return deferred.promise;
	}

	
	hrService.printslip = function(empid) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];
			var salslipList = angular.fromJson($localStorage.dbsalslip);

			if (typeof salslipList === 'undefined')
				salslipList = [];

			for (i = 0; i < salslipList.length; i++) {
				if (empid == salslipList[i].salslip_id) {
					tempItem.push(salslipList[i]);
				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}
	
	
	
	hrService.getallsalslip = function(empid) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];
			var salslipList = angular.fromJson($localStorage.dbsalslip);

			if (typeof salslipList === 'undefined')
				salslipList = [];

			for (i = 0; i < salslipList.length; i++) {
				if (empid == salslipList[i].salarystruct.empid) {
					tempItem.push(salslipList[i]);
				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}

	
	// End of hrService

	//*************************************************************************************************************************		
	// Start of StockService
	var StockService = {};

	serviceFactory.getStockService = function() {
		return StockService;
	}

	StockService.addStock = function(stock) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStock...");
			var stockList = angular.fromJson($localStorage.dbStocks);
			if (typeof stockList === 'undefined')
				stockList = [];
			stockList.push(stock);
			$localStorage.dbStocks = angular.toJson(stockList);
			deferred.resolve({
				"msg" : "StockItem Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	StockService.updateStock = function(invoiceObj) {
		var deferred = $q.defer();
		$timeout(
				function() {

					$log.debug("In side local DB updateStock...");
					var stockList = angular.fromJson($localStorage.dbStocks);

					if (typeof stockList === 'undefined')
						stockList = [];

					for (var i = 0; i < stockList.length; i++) {
						if (invoiceObj.invoiceLineItemList.itemName == stockList[i].itemName)
							stockList[i] = invoiceObj;
					}

					$localStorage.dbStocks = angular.toJson(stockList);
					deferred.resolve({
						"msg" : "StockItem Updated Successfully."
					});

				}, 1000);

		return deferred.promise;
	}

	StockService.getAllStock = function() {
		var deferred = $q.defer();
		$timeout(function() {
			var stockList = angular.fromJson($localStorage.dbStocks);
			if (typeof stockList === 'undefined')
				stockList = [];
			deferred.resolve(stockList);

		}, 1000);

		return deferred.promise;
	} // End of StockService

	StockService.getstockByThreshold = function() {
		var deferred = $q.defer();
		$timeout(function() {
			var stockByThreshold = [];

			var stockList = angular.fromJson($localStorage.dbStocks);
			//	if (typeof stockList === 'undefined')
			//		stockList = [];

			for (i = 0; i < stockList.length; i++) {
				if (stockList[i].qty <= stockList[i].thresholdValue) {

					stockByThreshold.push(stockList[i]);

					$log.debug("TEMP===" + stockByThreshold);
				}
			}

			deferred.resolve(stockList);

		}, 1000);

		return deferred.promise;
	} // End of StockService

	//*************************************************************************************************************************		
	// Start of TaxService
	var TaxService = {};

	serviceFactory.getTaxService = function() {
		return TaxService;
	}

	TaxService.addTax = function(tax) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addTax...");
			var taxList = angular.fromJson($localStorage.dbTaxes);
			if (typeof taxList === 'undefined')
				taxList = [];
			taxList.push(tax);
			$localStorage.dbTaxes = angular.toJson(taxList);
			deferred.resolve({
				"msg" : "Tax Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	TaxService.getAllTaxes = function() {
		var deferred = $q.defer();
		$timeout(function() {
			var taxList = angular.fromJson($localStorage.dbTaxes);
			if (typeof taxList === 'undefined')
				taxList = [];
			deferred.resolve(taxList);

		}, 1000);

		return deferred.promise;
	} // End of TaxService

	//*************************************************************************************************************************	
	// Start of InvoiceService
	var InvoiceService = {};

	serviceFactory.getInvoiceService = function() {
		return InvoiceService;
	}

	InvoiceService.addInvoice = function(invoice) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addInvoice...");
			var invoiceList = angular.fromJson($localStorage.dbinvoice);

			if (typeof invoiceList === 'undefined')
				invoiceList = [];

			//		invoice.invoiceId = invoiceList.length + 100;

			invoiceList.push(invoice);
			$localStorage.dbinvoice = angular.toJson(invoiceList);

			/*			var stockList = angular.fromJson($localStorage.dbStocks);		
			 for(i=0;i<=invoice.invoiceLineItemList.length;i++)
			 {
			 if (invoice.invoiceLineItemList[i].itemName == stockList.itemName) {
			 stockList.qty = stockList.qty - invoice.invoiceLineItemList[i].qty;
			 }
			 }
			
			 */
			/*			 for(var i=0;i<stockList.length;i++)
			 { 
			 if(invoice.invoiceLineItemList.itemName==stockList[i].itemName)
			 stockList[i] = invoice;
			 }
			 */
			//			$localStorage.dbStocks = angular.toJson(stockList);
			deferred.resolve({
				"msg" : "StockItem Updated Successfully."
			});

			deferred.resolve({
				"msg" : "Invoice Added Successfully."

			});

		}, 1000);

		return deferred.promise;
	}

	InvoiceService.getAllInvoice = function(invoiceId) {
		var deferred = $q.defer();
		$timeout(function() {
			var invoiceList = angular.fromJson($localStorage.dbinvoice);
			if (typeof invoiceList === 'undefined')
				invoiceList = [];
			deferred.resolve(invoiceList);

		}, 1000);

		return deferred.promise;
	} // End of TaxService

	InvoiceService.getinvoiceByID = function(selectedBillNo) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];
			var invoiceList = angular.fromJson($localStorage.dbinvoice);

			if (typeof invoiceList === 'undefined')
				invoiceList = [];

			for (i = 0; i < invoiceList.length; i++) {
				if (selectedBillNo == invoiceList[i].invoiceId) {

					// selectedBillNo = invoiceList[i];
					tempItem.push(invoiceList[i]);

					// $log.debug("TEMP===" + tempItem[i]);
				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}

	InvoiceService.getAllInvoiceByCustId = function(selectedCustomerId) {

		var deferred = $q.defer();
		$timeout(
				function() {
					var tempInvoice = [];
					var custInvoiveList = angular
							.fromJson($localStorage.dbinvoice);

					if (typeof custInvoiveList === 'undefined')
						custInvoiveList = [];

					for (i = 0; i < custInvoiveList.length; i++) {
						if (selectedCustomerId == custInvoiveList[i].customerName.customerId) {

							// selectedBillNo = invoiceList[i];
							tempInvoice.push(custInvoiveList[i]);

							// $log.debug("TEMP===" + tempItem[i]);
						}
					}
					deferred.resolve(tempInvoice);

				}, 1000);
		return deferred.promise;
	}
	//*************************************************************************************************************************	

	// Add Sales Service
	var SalesService = {};

	serviceFactory.getSalesService = function() {
		return SalesService;
	}

	SalesService.addSalesOrder = function(salesOrder) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addSalesOrder...");
			var salesOrderList = angular.fromJson($localStorage.dbSalesOrder);
			if (typeof salesOrderList === 'undefined')
				salesOrderList = [];
			salesOrderList.push(salesOrder);
			$localStorage.dbSalesOrder = angular.toJson(salesOrderList);
			deferred.resolve({
				"msg" : "Sales Orde Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	SalesService.getAllSalesOrder = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getAllSalesOrder...");
			var salesOrderList = angular.fromJson($localStorage.dbSalesOrder);
			if (typeof salesOrderList === 'undefined')
				salesOrderList = [];
			deferred.resolve(salesOrderList);
		}, 1000);

		return deferred.promise;

	}

	SalesService.getSOByID = function(selectedSOId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempSOItem = [];

			var sOList = angular.fromJson($localStorage.dbSalesOrder);

			if (typeof sOList === 'undefined')
				sOList = [];

			for (i = 0; i < sOList.length; i++) {
				if (selectedSOId == sOList[i].salesOrderId) {

					// selectedBillNo = invoiceList[i];
					tempSOItem.push(sOList[i]);

					$log.debug("TEMP===" + tempSOItem[i]);
				}
			}
			deferred.resolve(tempSOItem);

		}, 1000);
		return deferred.promise;
	}
	/*
	 SalesService.updateemp = function(editProfile) {
	 var deferred = $q.defer();
	 $timeout(function() {

	 $log.debug("In side updated local DB updateuser...");
	 var empList = angular.fromJson($localStorage.dbemp);
	 if (typeof empList === 'undefined')
	 empList = [];

	 for (var i = 0; i < empList.length; i++) {
	 if (editProfile.empid == empList[i].empid)
	 empList[i] = editProfile;
	 }

	 $localStorage.dbemp = angular.toJson(empList);
	 deferred.resolve({
	 "msg" : "User data Updated Successfully."
	 });

	 }, 1000);

	 return deferred.promise;
	 }

	 SalesService.getempByID = function(selectedempNo) {

	 var deferred = $q.defer();
	 $timeout(function() {
	 var tempItem = [];
	 var empList = angular.fromJson($localStorage.dbemp);

	 if (typeof empList === 'undefined')
	 empList = [];

	 for (i = 0; i < empList.length; i++) {
	 if (selectedempNo == empList[i].empid) {

	 $log.debug("************TEMP===" + empList[i].empid);
	 tempItem.push(empList[i]);

	 }
	 }
	 deferred.resolve(tempItem);

	 }, 1000);
	 return deferred.promise;
	 }
	 */

	//*************************************************************************************************************************	
	// Add Purchase Service
	var PurchaseService = {};

	serviceFactory.getPurchaseService = function() {
		return PurchaseService;
	}

	PurchaseService.addPurchaseOrder = function(purchaseOrderObj) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addPurchaseOrder...");
			var purchaseOrderList = angular
					.fromJson($localStorage.dbPurchaseOrder);
			if (typeof purchaseOrderList === 'undefined')
				purchaseOrderList = [];
			purchaseOrderList.push(purchaseOrderObj);
			$localStorage.dbPurchaseOrder = angular.toJson(purchaseOrderList);
			deferred.resolve({
				"msg" : "Purchase Orde Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	PurchaseService.getAllPurchaseOrder = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getAllPurchaseOrder...");
			var purchaseOrderList = angular
					.fromJson($localStorage.dbPurchaseOrder);
			if (typeof purchaseOrderList === 'undefined')
				purchaseOrderList = [];
			deferred.resolve(purchaseOrderList);
		}, 1000);

		return deferred.promise;

	}

	PurchaseService.getPOByID = function(selectedPurchaseOrderNo) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempPOItem = [];

			var pOList = angular.fromJson($localStorage.dbPurchaseOrder);

			if (typeof pOList === 'undefined')
				pOList = [];

			for (i = 0; i < pOList.length; i++) {
				if (selectedPurchaseOrderNo == pOList[i].purchaseOrderNo) {

					// selectedBillNo = invoiceList[i];
					tempPOItem.push(pOList[i]);

					// $log.debug("TEMP===" + tempItem[i]);
				}
			}
			deferred.resolve(tempPOItem);

		}, 1000);
		return deferred.promise;
	}
	//*************************************************************************************************************************				

	return serviceFactory;
}
