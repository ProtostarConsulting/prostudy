app = angular.module("stockApp");
app.controller("salesCtr1", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $state, $http, $stateParams, $routeParams,
		$filter, objectFactory, appEndpointSF) {

	$scope.salesOrder = {
		salesOrderId : '',
		customer : {},
		customerRefId : '',
		quotationDate : '',
		salesOrderDate : '',
		to: '',
		shipTo: '',
		salesPerson:'',
		shippedVia: '',
		shippingTerms:'',
		deliveryDate:'',
		paymentTerms:'',
		dueDate:'',
		sOLineItemList : [],
		subTotal : '',
		taxCodeName : '',
		taxPercenatge : '',
		taxTotal : 0,
		finalTotal : ''
		
	};
	
	$scope.addSalesOrder = function() {

		var salesOrderService = appEndpointSF.getSalesOrderService();
		salesOrderService.addSalesOrder($scope.salesOrder).then(function(msgBean) {

			$log.debug("Inside Ctr salesOrder");
			$log.debug("msgBean.msg:" + msgBean.msg);
			$scope.showSimpleToast(msgBean.msg);
			$scope.getAllSalesOrder();
		});

		$scope.salesOrder = {};
	}

	$scope.getAllSalesOrder = function() {
		$log.debug("Inside Ctr $scope.getAllSalesOrder");
		var salesOrderService = appEndpointSF.getSalesOrderService();

		salesOrderService.getAllSalesOrder().then(
				function(salesOrderList) {
					$log.debug("Inside Ctr getAllSalesOrder");
					$scope.salesOrderList = salesOrderList;
					$log.debug("@@@@@@@getAllSalesOrder:"+angular.toJson($scope.salesOrderList));
					$scope.tempSalesOrder = $scope.salesOrderList.length +1;
					$log.debug("@@@@@@@getAllSalesOrder!!!!!!!!!!!!!!:"+angular.toJson($scope.tempSalesOrder));
					$scope.salesOrder.salesOrderId = $scope.tempSalesOrder;
				});
	}

	$scope.salesOrderList = [];
	$scope.tempSalesOrder;
	$scope.getAllSalesOrder();

	
	$log.debug("$stateParams:", $stateParams);
	$log.debug("$stateParams.selectedSOId:",
			$stateParams.selectedSOId);

	$scope.selectedSalesOrderNo = $stateParams.selectedSOId;
	
	$scope.getSOByID = function() {
		var salesService = appEndpointSF.getSalesOrderService();

		salesService
				.getSOByID($scope.selectedSalesOrderNo)
				.then(function(sOList) {
							$scope.sODetail = sOList[0];
							$log
									.debug("$scope.showSales Order ===="
											+ angular
													.toJson($scope.sODetail));
						});

	}
	$scope.sODetail = [];
	//$scope.getSOByID();
	
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
	
	$scope.getAllCustomers = function() {
		$log.debug("Inside Ctr $scope.getAllCustomers");
		var customerService = appEndpointSF
				.getCustomerService();

		customerService.getAllCustomers().then(
				function(custList) {
					$log.debug("Inside Ctr getAllCustomers");
					$scope.customersforinvoice = custList;
				});
	}

//	$scope.customers = [];
	$scope.getAllCustomers();
	
	$scope.getAllStock = function() {
		$log.debug("Inside Ctr $scope.getAllStock");
		var stockService = appEndpointSF.getStockService();

		stockService.getAllStock().then(function(stockList) {
			$log.debug("Inside Ctr getAllStock");
			$scope.stockforPO = stockList;
			$log.debug("@@@ $scope.stockforPO==="+$scope.stockforPO);
		});
	}

//	$scope.stockData = [];
	$scope.getAllStock();

	$scope.getAllTaxes = function() {
		$log.debug("Inside Ctr $scope.getAllTaxes");
		var taxService = appEndpointSF.getTaxService();

		taxService.getAllTaxes().then(function(taxList) {
			$log.debug("Inside Ctr getAllTaxes");
			$scope.taxforPO = taxList;
			$log.debug("@@@ $scope.taxforPO==="+$scope.taxforPO);
		});
	}
//	$scope.taxData = [];
	$scope.getAllTaxes();
});
