angular.module("stockApp").controller(
		"stockListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $http, objectFactory, appEndpointSF) {

			$log.debug("Inside stockListCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"
					+ angular.toJson($scope.curUser));

			$scope.selected = [];
			$scope.updateStock = function() {
				var stockService = appEndpointSF.getStockService();

				stockService.updateStock($scope.selected[0]).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr updateStockItem");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
						});
				$log.debug("Selected Item updated");
				$scope.selected[0].id = "";
				$scope.selected[0].itemName = "";
				$scope.selected[0].category = "";
				$scope.selected[0].qty = "";
				$scope.selected[0].price = "";
				$scope.selected[0].thresholdValue = ""; 
				$scope.selected[0].notes = "";
			}

			$scope.getAllStock = function() {
				$log.debug("Inside Ctr $scope.getAllStock");
				var stockService = appEndpointSF.getStockService();

				stockService.getAllStock($scope.curUser.businessAccount.id).then(
						function(stockList) {
							$log.debug("Inside Ctr getAllStock");
							$scope.stockData = stockList;
							$log.debug("Inside Ctr $scope.stockData:"
									+ angular.toJson($scope.stockData));

						});
			}
			$scope.tempItem = [];
			$scope.stockData = [];
			$scope.getAllStock();
		
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
			

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Stock Data Saved!')
						.position("top").hideDelay(3000));
			};

		});