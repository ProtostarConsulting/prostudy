var app = angular.module("stockApp");

app.controller("accountPayableCtr", function($scope, $window, $mdToast,
		$timeout, $mdSidenav, $mdUtil, $log, $stateParams,$q,$mdMedia, $mdDialog, objectFactory,
		appEndpointSF) {

	$log.debug("Inside accountAddCtr");

	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
	$log.debug("$scope.curUser++++++++" + angular.toJson($scope.curUser));

	$scope.accountPayable = {
		customer:[],
		invoiceId : '',
		invoiceDate : new Date(),
		finalTotal : '',
		payableDate: new Date(),
		invoiceDueDate : new Date(),
		purchaseOrderId : '',
		purchaseOrderDate : new Date(),
		business : ''
	};

	$scope.addPayable = function() {
		
		$scope.accountPayable.business = $scope.curUser.business;
		var payableService = appEndpointSF.getAccountService();
		
		payableService.addPayable($scope.accountPayable).then(function(msgBean) {
			$scope.showSimpleToast();
		});
		
		$scope.payableForm.$setPristine();
		$scope.payableForm.$setValidity();
		$scope.payableForm.$setUntouched();
		$scope.accountPayable = {};
	}
	
	$scope.toggleRight = buildToggler('right');

	function buildToggler(navID) {
		var debounceFn = $mdUtil.debounce(function() {
			$mdSidenav(navID).toggle().then(function() {
				$log.debug("toggle " + navID + " is done");
			});
		}, 200);
		return debounceFn;
	}

	$scope.close = function() {
		$mdSidenav('right').close().then(function() {
			$log.debug("close RIGHT is done");
		});
	};

	$scope.showSimpleToast = function() {
		$mdToast.show($mdToast.simple().content('Account Data Saved!')
				.position("top").hideDelay(3000));
	};
	
	$scope.CustomerddlChange = function (index, selectedcustomerName){
		$log.debug("##Came to CustomerddlChange...");
	}	
	
	// list of `state` value/display objects
	$scope.customersforinvoice = [];

	$scope.accountPayable.customer = null;
	$scope.searchTextInput = null;

	$scope.querySearch = function(query) {
		var results = query ? $scope.customersforinvoice
				.filter(createFilterFor(query)) : $scope.customersforinvoice;
		var deferred = $q.defer();
		$timeout(function() {
			deferred.resolve(results);
	//		$scope.salesOrder.customer = results;
		}, Math.random() * 1000, false);
		return deferred.promise;
	}

	function loadAllCustomers() {
		
			var customerService = appEndpointSF.getCustomerService();
			customerService.getAllCustomersByBusiness($scope.curUser.business.id).then(
					function(custList) {
						$scope.customersforinvoice = custList.items;	
					});			
	}

	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(cus) {
			return (angular.lowercase(cus.firstName).indexOf(lowercaseQuery) === 0);
		};
	}

	$scope.waitForServiceLoad = function() {
		if (appEndpointSF.is_service_ready) {
			loadAllCustomers();
		} else {
			$log.debug("Services Not Loaded, watiting...");
			$timeout($scope.waitForServiceLoad, 1000);
		}
	}
	$scope.waitForServiceLoad();
	
	
	$scope.addCustomer = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
				&& $scope.customFullscreen;
		$mdDialog
				.show({
					controller : DialogController,
					templateUrl : '/app/crm/customer_add.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
					locals : {
						curBusi : $scope.curUser.business,
						customer : $scope.customer
					}
				})
				.then(
						function(answer) {
							$scope.status = 'You said the information was "'
									+ answer + '".';
						},
						function() {
							$scope.status = 'You cancelled the dialog.';
						});
		
	};

	function DialogController($scope, $mdDialog, curBusi,
			customer) {

		$scope.addCustomer = function() {
			 $scope.customer.business = curUser.business;
			 $scope.customer.createdDate = new Date();
			 $scope.customer.modifiedBy = curUser.email_id;
			var customerService = appEndpointSF.getCustomerService();

			customerService.addCustomer($scope.customer).then(
					function(msgBean) {

					});
			$scope.hide();
		}
		
		$scope.hide = function() {
			$mdDialog.hide();
		};
	}
	
});
