app = angular.module("stockApp");
app.controller("salesOrderAddCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $state, $http, $stateParams, $routeParams,
		$filter,$q, objectFactory, appEndpointSF) {

	
	$scope.curUser = appEndpointSF.getLocalUserService()
	.getLoggedinUser();
	$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
	
	$scope.salesOrder = {
//			salesOrderId : '',
			customer : {},
			customerRefId : '',
			quotationDate : new Date(),
			salesOrderDate : new Date(),
			to: '',
			shipTo: '',
			salesPerson:'',
			shippedVia: '',
			shippingTerms:'',
			deliveryDate: new Date(),
			paymentTerms:'',
			dueDate: new Date(),
			sOLineItemList : [],
			subTotal : '',
			taxCodeName : '',
			taxPercenatge : '',
			taxTotal : 0,
			finalTotal : '',
			loggedInUser:""
		};
		
		$scope.addSalesOrder = function() {
			var salesOrderService = appEndpointSF.getSalesOrderService();	
			$scope.salesOrder.loggedInUser =$scope.curUser;
			
			salesOrderService.addSalesOrder($scope.salesOrder).then(function(msgBean) {
				$scope.showSimpleToast(msgBean.msg);
			});

			$scope.salesOrder = {};
		}

		$scope.addItem = function() {
			var item = {
				srNo : $scope.salesOrder.sOLineItemList.length + 1,
				itemName : "",
				qty : 1,
				price : "",
				subTotal : ""
			};

			$scope.salesOrder.sOLineItemList.push(item);
		};
		
		$scope.removeItem = function(index) {
			$scope.salesOrder.sOLineItemList.splice(index, 1);
			$scope.calSubTotal();
			$scope.calfinalTotal();
		};
		
		$scope.calSubTotal = function() {
			$log.debug("##Came to calSubTotal...");
			$scope.salesOrder.subTotal = 0;

			for (var i = 0; i < $scope.salesOrder.sOLineItemList.length; i++) {
				var line = $scope.salesOrder.sOLineItemList[i];
				$scope.salesOrder.subTotal += (line.qty * line.price);

				$log.debug("subTotal :"
						+ $scope.salesOrder.subTotal);
			}
			$log.debug("$scope.salesOrder 1 :"
					+ $scope.salesOrder.subTotal);
			return $scope.salesOrder.subTotal;
		}

		$scope.calfinalTotal = function() {
			$log.debug("##Came to calfinalTotal...");

			$scope.salesOrder.finalTotal = $scope.salesOrder.subTotal
					+ $scope.salesOrder.taxTotal;
		}
		
		$scope.lineItemStockChange = function(index, stockItem) {
			$log.debug("##Came to lineItemStockChange...");
			var lineSelectedItem = $scope.salesOrder.sOLineItemList[index];
			lineSelectedItem.price = stockItem.price;
			lineSelectedItem.itemName = stockItem.itemName;
			lineSelectedItem.subTotal = stockItem.subTotal;

			$scope.calSubTotal();
			$scope.calfinalTotal();
		};

		$scope.CustomerddlChange = function(index, customer) {
			$log.debug("##Came to CustomerddlChange...");
		};
		
		$scope.lineItemTaxChange = function(index, selectedTaxItem) {
			$log.debug("##Came to lineItemTaxChange...");

			$scope.salesOrder.taxCodeName =$scope.salesOrder.selectedTaxItem.taxCodeName;
			$scope.salesOrder.taxPercenatge =$scope.salesOrder.selectedTaxItem.taxPercenatge;
			
			$scope.salesOrder.taxTotal = ($scope.salesOrder.selectedTaxItem.taxPercenatge / 100)
					* ($scope.salesOrder.subTotal)

			$scope.calfinalTotal();
		};
		
		/* Setup menu */
		$scope.toggleRight = buildToggler('right');
		/**
		 * Build handler to open/close a SideNav; when animation finishes report
		 * completion in console
		 */
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
			$mdToast.show($mdToast.simple().content('Customer Data Saved!')
					.position("top").hideDelay(3000));
		}
			
		$scope.getAllStock = function() {
			$log.debug("Inside Ctr $scope.getAllStock");
			var stockService = appEndpointSF.getStockService();

			stockService.getAllStock($scope.curUser.businessAccount.id).then(function(stockList) {
				$log.debug("Inside Ctr getAllStock");
				$scope.stockforPO = stockList;
				$log.debug("@@@ $scope.stockforPO==="+$scope.stockforPO);
			});
		}

		$scope.stockData = [];
		$scope.getAllStock();

		$scope.getAllTaxes = function() {
			$log.debug("Inside Ctr $scope.getAllTaxes");
			var taxService = appEndpointSF.getTaxService();

			taxService.getTaxesByVisibility($scope.curUser.businessAccount.id).then(function(taxList) {
				$log.debug("Inside Ctr getAllTaxes");
				$scope.taxforPO = taxList;
				$log.debug("@@@ $scope.taxforPO==="+$scope.taxforPO);
			});
		}
		$scope.taxData = [];
		$scope.getAllTaxes();
		
		// list of `state` value/display objects
		$scope.customersforinvoice = [];
		loadAll();
		$scope.salesOrder.customer = null;
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
	
		function loadAll() {
			
				var customerService = appEndpointSF.getCustomerService();
				customerService.getAllCustomersByCurrUser($scope.curUser.businessAccount.id).then(
						function(custList) {
							$scope.customersforinvoice = custList.items;	
						});			
		}

		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(cus) {
				return (angular.lowercase(cus.customerName).indexOf(lowercaseQuery) === 0);
			};
		}

	});
