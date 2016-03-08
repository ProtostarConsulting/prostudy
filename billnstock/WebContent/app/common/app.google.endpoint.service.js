angular.module("stockApp").factory('googleEndpointSF', googleEndpointSF);

function googleEndpointSF($log, $q) {

	var serviceFactory = {};

	
	var LocationService = {};

	serviceFactory.getLocationService = function() {
		return LocationService;
	}

	LocationService.saveLocation = function(store) {
		$log.debug("No2");
		var deferred = $q.defer();
		gapi.client.locationService.saveLocation(store).execute(function() {
			deferred.resolve({
				"msg" : "Location Successfully Added"
			});

		});
		$log.debug("No3");
		return deferred.promise;
	}
	
	LocationService.getAllLocation = function() {
		var deferred = $q.defer();
		gapi.client.locationService.getAllLocation().execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	
	//---------------------------user login------------------------------
	var UserService = {};

	serviceFactory.getUserService = function() {
		return UserService;
	}

	UserService.addUser = function(user) {
		$log.debug("No2");
		var deferred = $q.defer();
		gapi.client.userService.addUser(user).execute(function() {
			deferred.resolve({
				"msg" : "user Successfully Added"
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

	UserService.getBusinessList= function() {
		var deferred = $q.defer();
		gapi.client.userService.getBusinessList().execute(function(resp) {
			$log.debug("getUser #resp :" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	
	UserService.getUsersByBusinessId= function(id) {
		var deferred = $q.defer();
		gapi.client.userService.getUsersByBusinessId({'id':id}).execute(function(resp) {
			$log.debug("getUser #resp :" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	
	UserService.getbusinessById= function(id) {
		var deferred = $q.defer();
		gapi.client.userService.getbusinessById({'id':id}).execute(function(resp) {
			$log.debug("getUser #resp :" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	
	UserService.updateUser = function(user) {
		$log.debug("No2");
		var deferred = $q.defer();
		gapi.client.userService.updateUser(user).execute(function() {
			deferred.resolve({
				"msg" : "user Successfully Updated"
			});
		});
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
		gapi.client.userService.addBusiness(business).execute(function() {
			deferred.resolve({
				"msg" : "Business Add Successfully."
			});
		});
		return deferred.promise;
	}

	UserService.addNewBusiness = function(business) {
		var deferred = $q.defer();
		gapi.client.userService.addNewBusiness(business).execute(function() {
			deferred.resolve({
				"msg" : "Business Add Successfully."
			});
		});
		return deferred.promise;
	}
	//---------------------------assetService--------------------------------
	
	var assetService={};
	
	serviceFactory.getAssetManagementService=function(){
		return assetService;
	}
	
	
	assetService.addAsset=function(asset){
		var deferred = $q.defer();
		gapi.client.assetService.addAsset(asset).execute(function() {
			deferred.resolve({
				"msg" : "assetService Added Successfully."
			});
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
	
	
	setupService.getAllUserOfOrg=function(id){
		var deferred = $q.defer();
		gapi.client.setupService.getAllUserOfOrg({'id':id}).execute(function(resp) {
					deferred.resolve(resp);
		});
		return deferred.promise;
}	
	
	
	
	
	setupService.getuserById=function(usrid){
		var deferred = $q.defer();
		gapi.client.setupService.getuser({'id' : usrid}).execute(function(resp) {
					deferred.resolve(resp);
		});
		return deferred.promise;
	}
	
	
	
	/*setupService.adduser= function(user) {

		var deferred = $q.defer();
		gapi.client.setupService.adduser(user).execute(function() {

			deferred.resolve({
				"msg" : "user Added Successfully."
			});

		});
		return deferred.promise;
	}
	*/
	
	
	
	
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

	hrService.getAllemp = function(id) {
		var deferred = $q.defer();
		gapi.client.hrService.getAllemp({'id':id}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.getempByID = function(selectedempNo) {
		var deferred = $q.defer();
		gapi.client.hrService.getempByID({
			'id' : selectedempNo
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

	hrService.findsalstructure = function(struct) {
		var deferred = $q.defer();
		gapi.client.hrService.findsalstructfromemp({
			'id' : struct
		}).execute(function(resp) {
			/*$log.debug("internet cost:=" + resp);*/
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.getAllempsSalStruct = function(id) {
		var deferred = $q.defer();
		gapi.client.hrService.getAllempsSalStruct({'id':id}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.viewfindsalstruct = function(struct) {
		var deferred = $q.defer();
		gapi.client.hrService.findsalstruct({'id' : struct}).execute(function(resp) {
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
		gapi.client.hrService.findsalstruct({
			'id' : struct
		}).execute(function(resp) {
			/*$log.debug("internet cost:=" + resp);*/
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.addgsalslip = function(salslip) {
		var deferred = $q.defer();
		gapi.client.hrService.addgsalslip(salslip).execute(function(resp) {
			deferred.resolve(resp);
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

	hrService.displyOnlySelected = function(curmonth,id) {
		var deferred = $q.defer();
		gapi.client.hrService.displyOnlySelected({'month' : curmonth,'id':id}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	hrService.printslip = function(salslipid) {
		var deferred = $q.defer();
		gapi.client.hrService.printslip({'id' : salslipid}).execute(function(resp) {
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

	hrService.getallsalslip = function(curryear,id) {
		var deferred = $q.defer();
		gapi.client.hrService.getallsalslip({'year' : curryear,'id':id}).execute(function(resp) {
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

	crmService.getAllleads = function(id) {
		var deferred = $q.defer();
		gapi.client.crmService.getAllleads({'id':id}).execute(function(resp) {
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

	crmService.getAllcontact = function(id) {
		var deferred = $q.defer();
		gapi.client.crmService.getAllcontact({'id':id}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	crmService.getContactById = function(contactNo) {
		var deferred = $q.defer();
		gapi.client.crmService.getContactById({
			'id' : contactNo
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
	opportunityService.getAllopportunity = function(id) {
		var deferred = $q.defer();
		gapi.client.opportunityService.getAllopportunity({'id':id}).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}
	opportunityService.getopportunityById = function(opportunityoid) {
		var deferred = $q.defer();
		gapi.client.opportunityService.getopportunityById({
			'id' : opportunityoid
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
	}// End of InternetService

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
			$log.debug("addCustomer#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});

		return deferred.promise;
	}

	CustomerService.getAllCustomersByCurrUser = function(id) {
		var deferred = $q.defer();
		gapi.client.customerService.getAllCustomersByCurrUser({"id" : id}).execute(function(resp) {
			$log.debug("getAllCustomers#resp at enpoint:" + angular.toJson(resp));
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



	// =====================================================================================================================================
	// Add Customer Service

	var AccountService = {};

	serviceFactory.getAccountService = function() {
		return AccountService;
	}

	AccountService.addAccount = function(account) {
		var deferred = $q.defer();

		gapi.client.accountService.addAccount(account).execute(function(resp) {
			$log.debug("addAccount#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});

		return deferred.promise;
	}

	AccountService.getAllAccountsByBusiness = function(id) {
		var deferred = $q.defer();
		gapi.client.accountService.getAllAccountsByBusiness({"id" : id}).execute(function(resp) {
			$log.debug("getAllAccountsByCurrUser#resp at enpoint:" + angular.toJson(resp));
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	

	AccountService.addPayable = function(payable) {
		var deferred = $q.defer();

		gapi.client.accountService.addPayable(payable).execute(function(resp) {
			$log.debug("addPayable#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});

		return deferred.promise;
	}

	AccountService.getAllPayablesByBusiness = function(id) {
		var deferred = $q.defer();
		gapi.client.accountService.getAllPayablesByBusiness({"id" : id}).execute(function(resp) {
			$log.debug("getAllPayablesByBusiness#resp at enpoint:" + angular.toJson(resp));
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	
	}
	
	
	AccountService.addReceivable = function(receivable) {
		var deferred = $q.defer();

		gapi.client.accountService.addReceivable(receivable).execute(function(resp) {
			$log.debug("addReceivable#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});

		return deferred.promise;
	}

	AccountService.getAllReceivablesByBusiness = function(id) {
		var deferred = $q.defer();
		gapi.client.accountService.getAllReceivablesByBusiness({"id" : id}).execute(function(resp) {
			$log.debug("getAllReceivablesByBusiness#resp at enpoint:" + angular.toJson(resp));
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	
	}
	// End of AccountService
	

	// =====================================================================================================================================
	// Add Customer Service

	/*var AccountService = {};

	serviceFactory.getAccountService = function() {
		return AccountService;
	}
*/
/*	AccountService.addAccount = function(account) {
		var deferred = $q.defer();

		gapi.client.accountService.addAccount(account).execute(function(resp) {
			$log.debug("addAccount#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});

		return deferred.promise;
	}
*/
/*	AccountService.getAllAccountsByBusiness = function(id) {
		var deferred = $q.defer();
		gapi.client.accountService.getAllAccountsByBusiness({"id" : id}).execute(function(resp) {
			$log.debug("getAllAccountsByCurrUser#resp at enpoint:" + angular.toJson(resp));
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}*/
// End of CustomerService
	

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

	StockService.getAllStock = function(id) {
		var deferred = $q.defer();
		gapi.client.stockService.getAllStock({"id":id}).execute(function(resp) {
			$log.debug("getAllStock#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	} 

	StockService.updateStock = function(updateStock) {
		var deferred = $q.defer();
		gapi.client.stockService.updateStock(updateStock).execute(
				function(resp) {
					$log.debug("updateStock#resp at enpoint:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}
	
	StockService.getReportByThreshold = function(id) {
		var deferred = $q.defer();
		gapi.client.stockService.getReportByThreshold({"id":id}).execute(function(resp) {
			$log.debug("getReportByThreshold#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	} // End of StockService
	
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

	TaxService.getAllTaxes = function(id) {
		var deferred = $q.defer();
		gapi.client.taxService.getAllTaxes({"id":id}).execute(function(resp) {
			$log.debug("getAllTaxes#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	
	TaxService.getTaxesByVisibility = function(id) {
		var deferred = $q.defer();
		gapi.client.taxService.getTaxesByVisibility({"id":id}).execute(function(resp) {
			$log.debug("getTaxesByVisibility#resp at enpoint:" + resp);
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
	
	TaxService.disableTax = function(tax) {
		var deferred = $q.defer();
		gapi.client.taxService.disableTax(tax).execute(function(resp) {
			$log.debug("disableTax#resp at enpoint:" + resp);
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

	InvoiceService.updateInvoice = function(valueToUpdate) {
		var deferred = $q.defer();
		
		gapi.client.invoiceService.updateInvoice(valueToUpdate).execute(function(resp) {
			$log.debug("UpdateInvoice#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	
	InvoiceService.addInvoice = function(invoice) {
		var deferred = $q.defer();
		
		gapi.client.invoiceService.addInvoice(invoice).execute(function(resp) {
			$log.debug("addInvoice#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});

		
		
		/*gapi.client.stockService.updateStock(invoice).execute(
				function(resp) {
					$log.debug("updateStock#resp at enpoint:" + resp);
					deferred.resolve(resp);
				});
		*/
		return deferred.promise;
	}

	InvoiceService.getAllInvoice = function(id) {
		var deferred = $q.defer();
		gapi.client.invoiceService.getAllInvoice({"id":id}).execute(function(resp) {
			$log.debug("getAllInvoice#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	InvoiceService.getinvoiceByID = function(id) {
		var deferred = $q.defer();
		gapi.client.invoiceService.getinvoiceByID({
			"id" : id
		}).execute(function(resp) {
			$log.debug("getinvoiceByID at enpoint" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	InvoiceService.getAllInvoiceByCustId = function(id) {
		var deferred = $q.defer();
		gapi.client.invoiceService.getAllInvoiceByCustId({"id":id}).execute(function(resp) {
			$log.debug("getAllInvoiceByCustId at enpoint" + resp.items);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	
	InvoiceService.getAllPayableInvoices = function(id) {
		var deferred = $q.defer();
		gapi.client.InvoiceService.getAllPayableInvoices({"id" : id}).execute(function(resp) {
			$log.debug("getAllPayableInvoices#resp at enpoint:" + angular.toJson(resp));
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}// End of InvoiceService

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

	SalesOrderService.getAllSalesOrder = function(id) {
		var deferred = $q.defer();
		gapi.client.salesOrderService.getAllSalesOrder({"id":id}).execute(
				function(resp) {
					//$log.debug("getAllSalesOrder#resp at enpoint:" + angular.toJson(resp));
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}

	SalesOrderService.getSOByID = function(id) {
		var deferred = $q.defer();
		gapi.client.salesOrderService.getSOByID({
			"id" : id
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

	PurchaseOrderService.getAllPurchaseOrder = function(id) {
		var deferred = $q.defer();

		gapi.client.purchaseOrderService.getAllPurchaseOrder({"id":id}).execute(
				function(resp) {
					$log.debug("getAllPurchaseOrder at enpoint:" + resp)
					deferred.resolve(resp.items)
				});
		return deferred.promise;
	}

	PurchaseOrderService.getPOByID = function(id) {
		var deferred = $q.defer();
		gapi.client.purchaseOrderService.getPOByID({
			"id" : id
		}).execute(function(resp) {
			$log.debug("getPOByID at enpoint" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	/* =============================================================================================================================== */
		
	return serviceFactory;
}
