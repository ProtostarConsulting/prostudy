angular.module("stockApp").controller(
		"stockAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $http, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"
					+ angular.toJson($scope.curUser));



			$scope.stock = {
				itemId : "",
				itemName : "",
				category : "",
				qty : "",
				price : "",
				thresholdValue : '',
				notes : '',
				loggedInUser:""
			};
			$scope.addStock = function() {
				$log.debug("No1");
				var stockService = appEndpointSF.getStockService();
				$scope.stock.loggedInUser =$scope.curUser;
				
				stockService.addStock($scope.stock).then(function(msgBean) {
					$log.debug("No6");
					$log.debug("Inside Ctr addStock");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSimpleToast();

				});
				$log.debug("No4");
				$scope.stock = {};
			}

			/*
			 * $scope.selected = []; $scope.updateStockItem = function() { var
			 * stockService = appEndpointSF.getStockService();
			 * 
			 * stockService.updateStockItem($scope.selected).then(
			 * function(msgBean) { $log.debug("No6"); $log.debug("Inside Ctr
			 * updateStockItem"); $log.debug("msgBean.msg:" + msgBean.msg);
			 * $scope.showSavedToast(); }); $log.debug("Selected Item updated");
			 *  }
			 */
/*			$scope.getAllStock = function() {
				$log.debug("Inside Ctr $scope.getAllStock");
				var stockService = appEndpointSF.getStockService();

				stockService.getAllStock().then(
						function(stockList) {
							$log.debug("Inside Ctr getAllStock");
							$scope.stockData = stockList;
							$scope.tempItem = $scope.stockData.length + 1;
							$scope.stock.itemId = $scope.tempItem;
							$log.debug("Inside Ctr $scope.stockData:"
									+ angular.toJson($scope.stockData));

						});
			}
			$scope.tempItem = [];
			$scope.stockData = [];
			$scope.getAllStock();
*/			/*
			 * $scope.getstockByThreshold = function(){ $log.debug("Inside Ctr
			 * $scope.getstockByThreshold");
			 * 
			 * var stockService = appEndpointSF.getStockService();
			 * 
			 * stockService.getstockByThreshold().then(
			 * function(stockByThreshold) { $log.debug("Inside Ctr
			 * getstockByThreshold"); $scope.thresholdStock = stockByThreshold;
			 * $log.debug("Inside Ctr $scope.thresholdStock:" +
			 * angular.toJson($scope.thresholdStock)); })
			 *  }
			 * 
			 * $scope.thresholdStock = []; $scope.getstockByThreshold();
			 */
			
			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Data Saved!')
						.position("top").hideDelay(3000));
			};

			
			// Setup menu
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
		});