angular.module("stockApp").factory('googleEndpointSF', googleEndpointSF);

function googleEndpointSF($log, $q) {

	var serviceFactory = {};

	//---------------------------user login------------------------------
	var UserService = {};

	serviceFactory.getUserService = function() {
		return UserService;
	}

	UserService.addUser = function(user) {
		$log.debug("No2");
		var deferred = $q.defer();
		gapi.client.userService.addUser(user).execute(function(resp) {
			deferred.resolve({
				"msg" : resp
			});

		});
		$log.debug("No3");
		return deferred.promise;
	}
	
	
	
	
	UserService.login = function(email,pass) {
		$log.debug("No2");
		var deferred = $q.defer();
		//gapi.client.userService.login(user).execute(function(resp) {
		gapi.client.userService.login({'email_id' : email,'password':pass}).execute(function(resp) {	
			deferred.resolve(resp);
		});
		$log.debug("No3");
		return deferred.promise;
	}
	
	


	UserService.getUser = function() {
		var deferred = $q.defer();
		gapi.client.userService.getUser().execute(function(resp) {
			$log.debug("getUser #resp :" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	UserService.getUserByEmailID = function(email_id) {
		var deferred = $q.defer();
		gapi.client.userService.getUserByEmailID({
			'email_id' : email_id
		}).execute(function(resp) {
			$log.debug("resp:" + angular.toJson(resp));

			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}

	UserService.updateUser = function(user) {
		$log.debug("No2");
		var deferred = $q.defer();
		gapi.client.userService.updateUser(user).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		$log.debug("No3");
		return deferred.promise;
	}

	UserService.getLoggedinUser = function() {
		var user = $localStorage.loggedinUser;
		if (user == 'undefined' || user == null)
			return null;
		else
			return $localStorage.loggedinUser;
	}


	UserService.logout = function() {
		$localStorage.loggedinUser = null;
	} // End of UserService

	
	
	//start business 

	UserService.addBusiness = function(business) {
		var deferred = $q.defer();
		gapi.client.userService.addBusiness(business).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	
	//--------------------setup service----------------------------
	
	var setupService={};
	
	serviceFactory.getsetupService=function(){
		return setupService;
	}
	
	setupService.getCurUserByEmailId=function(emailid){
		var deferred = $q.defer();
		gapi.client.setupService.getCurUserByEmailId({'adminGmailId' : emailid}).execute(function(resp) {
					deferred.resolve(resp);
		});
		return deferred.promise;
}

	setupService.updateBusiness = function(business) {
		var deferred = $q.defer();
		gapi.client.setupService.updateBusiness(business).execute(function() {
			deferred.resolve({
				"msg" : "Business updated Successfully."
			});
     	});
		return deferred.promise;
	}
	
	
	setupService.getAllUserOfOrg=function(orgid){
		var deferred = $q.defer();
		gapi.client.setupService.getAllUserOfOrg({'id' : orgid}).execute(function(resp) {
					deferred.resolve(resp);
		});
		return deferred.promise;
}	
	
	
	
	
	setupService.getuserById=function(usrid){
		var deferred = $q.defer();
		gapi.client.setupService.getuser({'email_id' : usrid}).execute(function(resp) {
					deferred.resolve(resp);
		});
		return deferred.promise;
	}
	
	
	
	setupService.adduser= function(user) {

		var deferred = $q.defer();
		gapi.client.setupService.adduser(user).execute(function() {

			deferred.resolve({
				"msg" : "user Added Successfully."
			});

		});
		return deferred.promise;
	}
	
	
	
	
	
	//--------------------hr services--------------------------------------

	var hrService = {};

	// Add Customer Service

	serviceFactory.gethrService = function() {
		return hrService;
	}

	hrService.addemp = function(emp) {

		var deferred = $q.defer();
		gapi.client.hrService.addemp(emp).execute(function() {

			deferred.resolve({
				"msg" : "employee Added Successfully."
			});

		});
		return deferred.promise;
	}

	hrService.getAllemp = function() {
		var deferred = $q.defer();
		gapi.client.hrService.getAllemp().execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.getempByID = function(selectedempNo) {
		var deferred = $q.defer();
		gapi.client.hrService.getempByID({
			'empid' : selectedempNo
		}).execute(function(resp) {
			/*$log.debug("internet cost:=" + resp);*/
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.updateemp = function(emp) {

		var deferred = $q.defer();
		gapi.client.hrService.updateemp(emp).execute(function() {

			deferred.resolve({
				"msg" : "employee Updated Successfully."
			});

		});
		return deferred.promise;
	}

	hrService.addsalstruct = function(struct) {

		var deferred = $q.defer();
		gapi.client.hrService.addsalstruct(struct).execute(function() {

			deferred.resolve({
				"msg" : "struct Added Successfully."
			});

		});
		return deferred.promise;
	}

	hrService.findsalstruct = function(struct) {
		var deferred = $q.defer();
		gapi.client.hrService.findsalstruct({
			'empid' : struct
		}).execute(function(resp) {
			/*$log.debug("internet cost:=" + resp);*/
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.getAllempsSalStruct = function() {
		var deferred = $q.defer();
		gapi.client.hrService.getAllempsSalStruct().execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.viewfindsalstruct = function(struct) {
		var deferred = $q.defer();
		gapi.client.hrService.viewfindsalstruct({
			'empid' : struct
		}).execute(function(resp) {
			/*$log.debug("internet cost:=" + resp);*/
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.updatesalinfo = function(struct) {

		var deferred = $q.defer();
		gapi.client.hrService.updatesalinfo(struct).execute(function() {

			deferred.resolve({
				"msg" : "struct Updated Successfully."
			});

		});
		return deferred.promise;
	}

	hrService.getstructByID = function(struct) {
		var deferred = $q.defer();
		gapi.client.hrService.viewfindsalstruct({
			'empid' : struct
		}).execute(function(resp) {
			/*$log.debug("internet cost:=" + resp);*/
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.addgsalslip = function(salslip) {

		var deferred = $q.defer();
		//salslip.salslip_id = salslipList.length + 100;

		gapi.client.hrService.addgsalslip(salslip).execute(function() {

			deferred.resolve({
				"msg" : "salslip Added Successfully."
			});

		});
		return deferred.promise;
	}

	hrService.countOfRecordsiInganeratedslip = function() {
		var deferred = $q.defer();
		gapi.client.hrService.countofrecord().execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.displyOnlySelected = function(curmonth) {
		var deferred = $q.defer();
		gapi.client.hrService.displyOnlySelected({
			'month' : curmonth
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.printslip = function(salslipid) {
		var deferred = $q.defer();
		gapi.client.hrService.printslip({
			'salslip_id' : salslipid
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.addtimesheet = function(timesheet) {
		var deferred = $q.defer();
		gapi.client.hrService.addtimesheet(timesheet).execute(function() {
			deferred.resolve({
				"msg" : "timesheet Added Successfully."
			});
		});
		return deferred.promise;
	}

	hrService.getcurweekdata = function(weekNumber) {
		var deferred = $q.defer();
		gapi.client.hrService.getcurweekdata({
			'week' : weekNumber
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.getallsalslip = function(curryear) {
		var deferred = $q.defer();
		gapi.client.hrService.getallsalslip({
			'year' : curryear
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	//------------------------- CRM ---------------------------------
	var crmService = {};

	serviceFactory.getleadService = function() {
		return crmService;
	}
	crmService.addlead = function(lead) {

		var deferred = $q.defer();
		gapi.client.crmService.addlead(lead).execute(function() {

			deferred.resolve({
				"msg" : "Lead Added Successfully."
			});

		});
		return deferred.promise;
	}

	crmService.getAllleads = function() {
		var deferred = $q.defer();
		gapi.client.crmService.getAllleads().execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	crmService.getLeadById = function(lead) {
		var deferred = $q.defer();
		gapi.client.crmService.getLeadById({
			'id' : lead
		}).execute(function(resp) {
			/*$log.debug("internet cost:=" + resp);*/
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	crmService.addupdatetask = function(lead) {

		var deferred = $q.defer();
		gapi.client.crmService.addupdatetask(lead).execute(function() {

			deferred.resolve({
				"msg" : "Lead updated Successfully."
			});

		});
		return deferred.promise;
	}

	crmService.addcontact = function(contact) {
		var deferred = $q.defer();
		gapi.client.crmService.addcontact(contact).execute(function() {
			deferred.resolve({
				"msg" : "contact Added Successfully."
			});
		});
		return deferred.promise;
	}

	crmService.getAllcontact = function() {
		var deferred = $q.defer();
		gapi.client.crmService.getAllcontact().execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	crmService.getContactById = function(contactNo) {
		var deferred = $q.defer();
		gapi.client.crmService.getContactById({
			'cid' : contactNo
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	crmService.updatecontact = function(contact) {
		var deferred = $q.defer();
		gapi.client.crmService.addcontact(contact).execute(function() {
			deferred.resolve({
				"msg" : "contact Updated Successfully."
			});
		});
		return deferred.promise;
	}

	//opportunity service

	var opportunityService = {};

	serviceFactory.getopportunityService = function() {
		return opportunityService;
	}

	opportunityService.addopportunity = function(opportunity) {
		var deferred = $q.defer();
		gapi.client.opportunityService.addopportunity(opportunity).execute(
				function() {
					deferred.resolve({
						"msg" : "opportunity Added Successfully."
					});

				});
		return deferred.promise;
	}
	opportunityService.getAllopportunity = function() {
		var deferred = $q.defer();
		gapi.client.opportunityService.getAllopportunity().execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}
	opportunityService.getopportunityById = function(opportunityoid) {
		var deferred = $q.defer();
		gapi.client.opportunityService.getopportunityById({
			'oid' : opportunityoid
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	opportunityService.addupdatetask = function(opportunity) {
		var deferred = $q.defer();
		gapi.client.opportunityService.addopportunity(opportunity).execute(
				function() {
					deferred.resolve({
						"msg" : "opportunity updated Successfully."
					});

				});
		return deferred.promise;
	}

	opportunityService.updateopportunity = function(opportunity) {
		var deferred = $q.defer();
		gapi.client.opportunityService.addopportunity(opportunity).execute(
				function() {
					deferred.resolve({
						"msg" : "opportunity updated Successfully."
					});

				});
		return deferred.promise;
	}

	//---------------------------------------------------------------
	//ADD INTERNET SERVICE

	var internetService = {};

	serviceFactory.getinternetService = function() {
		return internetService;
	}

	internetService.addinternet = function(internet) {
		var deferred = $q.defer();
		gapi.client.internetService.addinternet(internet).execute(
				function(resp) {
					$log.debug("addinternet#resp:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	internetService.findplan = function(rate) {
		var deferred = $q.defer();
		gapi.client.internetService.findplan({
			'rate' : rate
		}).execute(function(resp) {
			/*$log.debug("internet cost:=" + resp);*/
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	//Add Customer Service

	var InternetService = {};

	serviceFactory.getInternetService = function() {
		return InternetService;
	}

	InternetService.addInternet = function(internet) {
		var deferred = $q.defer();
		gapi.client.internetService.addInternet(internet).execute(
				function(resp) {
					$log.debug("addInternet##Resp## at enpoint:", +resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	InternetService.getAllInternet = function() {
		var deferred = $q.defer();
		gapi.client.internetService.getAllInternet().execute(function(resp) {
			$log.debug("getAllInternet#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	InternetService.searchRecord = function(plan) {
		var deferred = $q.defer();
		gapi.client.internetService.searchRecord({
			'plan' : plan
		}).execute(function(resp) {
			$log.debug("searchRecord at enpoint" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}// End of CustomerService

	InternetService.searchByCost = function(cost) {
		var deferred = $q.defer();
		gapi.client.internetService.searchByCost({
			'cost' : cost
		}).execute(function(resp) {
			$log.debug("searchRecord By Cost at enpoint" + resp);
			deffered.resolve(resp);
		})
		return deferred.promise;
	}
	// =====================================================================================================================================
	// Add Customer Service

	var CustomerService = {};

	serviceFactory.getCustomerService = function() {
		return CustomerService;
	}

	CustomerService.addCustomer = function(cust) {
		var deferred = $q.defer();

		gapi.client.customerService.addCustomer(cust).execute(function(resp) {
			/*$log.debug("addCustomer#resp:" + resp);*/
			deferred.resolve(resp);
		});

		gapi.client.customerService.addCustomer(cust).execute(function(resp) {
			$log.debug("addCustomer#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});

		return deferred.promise;
	}

	CustomerService.getAllCustomers = function() {
		var deferred = $q.defer();
		gapi.client.customerService.getAllCustomers().execute(function(resp) {
			$log.debug("getAllCustomers#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	CustomerService.searchCustomerByName = function(customerName) {
		var deferred = $q.defer();
		gapi.client.customerService.searchCustomerByName({
			"customerName" : customerName
		}).execute(function(resp) {
			$log.debug("getCustomerByID at enpoint" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	CustomerService.getCustomerByID = function(customerId) {
		var deferred = $q.defer();
		gapi.client.customerService.getCustomerByID({
			"customerId" : customerId
		}).execute(function(resp) {
			$log.debug("getCustomerByID at enpoint" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}// End of CustomerService

	/* =============================================================================================================================== */
	// Start of StockService
	var StockService = {};

	serviceFactory.getStockService = function() {
		return StockService;
	}

	StockService.addStock = function(stock) {
		var deferred = $q.defer();
		gapi.client.stockService.addStock(stock).execute(function(resp) {
			$log.debug("addStock#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	StockService.getAllStock = function() {
		var deferred = $q.defer();
		gapi.client.stockService.getAllStock().execute(function(resp) {
			$log.debug("getAllStock#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	} // End of StockService

	StockService.updateStock = function(updateStock) {
		var deferred = $q.defer();
		gapi.client.stockService.updateStock(updateStock).execute(
				function(resp) {
					$log.debug("updateStock#resp at enpoint:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}
	/* =============================================================================================================================== */

	// Start of StockService
	var TaxService = {};

	serviceFactory.getTaxService = function() {
		return TaxService;
	}

	TaxService.addTax = function(tax) {
		var deferred = $q.defer();
		gapi.client.taxService.addTax(tax).execute(function(resp) {
			$log.debug("addTax#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	TaxService.getAllTaxes = function() {
		var deferred = $q.defer();
		gapi.client.taxService.getAllTaxes().execute(function(resp) {
			$log.debug("getAllTaxes#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	TaxService.updateTax = function(tax) {
		var deferred = $q.defer();
		gapi.client.taxService.updateTax(tax).execute(function(resp) {
			$log.debug("updateTax#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	// End of TaxService

	/* =============================================================================================================================== */

	// Start of StockService
	var InvoiceService = {};

	serviceFactory.getInvoiceService = function() {
		return InvoiceService;
	}

	InvoiceService.addInvoice = function(invoice) {
		var deferred = $q.defer();
		gapi.client.invoiceService.addInvoice(invoice).execute(function(resp) {
			$log.debug("addInvoice#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	InvoiceService.getAllInvoice = function() {
		var deferred = $q.defer();
		gapi.client.invoiceService.getAllInvoice().execute(function(resp) {
			$log.debug("getAllInvoice#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	InvoiceService.getinvoiceByID = function(selectedBillNo) {
		var deferred = $q.defer();
		gapi.client.invoiceService.getinvoiceByID({
			"invoiceId" : selectedBillNo
		}).execute(function(resp) {
			$log.debug("getinvoiceByID at enpoint" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	InvoiceService.getAllInvoiceByCustId = function(customerId) {
		var deferred = $q.defer();
		gapi.client.invoiceService.getAllInvoiceByCustId({
			"customerId" : customerId
		}).execute(function(resp) {
			$log.debug("getAllInvoiceByCustId at enpoint" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}// End of StockService

	/* =============================================================================================================================== */

	// Start of SalesOrderService
	var SalesOrderService = {};

	serviceFactory.getSalesOrderService = function() {
		return SalesOrderService;
	}

	SalesOrderService.addSalesOrder = function(salesOrder) {
		var deferred = $q.defer();
		gapi.client.salesOrderService.addSalesOrder(salesOrder).execute(
				function(resp) {
					$log.debug("addSalesOrder#resp at enpoint:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	SalesOrderService.getAllSalesOrder = function() {
		var deferred = $q.defer();
		gapi.client.salesOrderService.getAllSalesOrder().execute(
				function(resp) {
					$log.debug("getAllSalesOrder#resp at enpoint:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}

	SalesOrderService.getSOByID = function(salesOrderId) {
		var deferred = $q.defer();
		gapi.client.salesOrderService.getSOByID({
			"salesOrderId" : salesOrderId
		}).execute(function(resp) {
			$log.debug("getSOByID at enpoint" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	/* =============================================================================================================================== */

	// Start of SalesOrderService
	var PurchaseOrderService = {};

	serviceFactory.getPurchaseOrderService = function() {
		return PurchaseOrderService;
	}

	PurchaseOrderService.addPurchaseOrder = function(purchaseOrder) {
		var deferred = $q.defer();
		gapi.client.purchaseOrderService.addPurchaseOrder(purchaseOrder)
				.execute(function(resp) {
					$log.debug("addPurchaseOrder at enpoint:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	PurchaseOrderService.getAllPurchaseOrder = function() {
		var deferred = $q.defer();

		gapi.client.purchaseOrderService.getAllPurchaseOrder().execute(
				function(resp) {
					$log.debug("getAllPurchaseOrder at enpoint:" + resp)
					deferred.resolve(resp.items)
				});
		return deferred.promise;
	}

	PurchaseOrderService.getPOByID = function(purchaseOrderNo) {
		var deferred = $q.defer();
		gapi.client.purchaseOrderService.getPOByID({
			"purchaseOrderNo" : purchaseOrderNo
		}).execute(function(resp) {
			$log.debug("getPOByID at enpoint" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	return serviceFactory;
}
