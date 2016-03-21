angular.module("stockApp").controller(
		"stockEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $http,$stateParams,$location, objectFactory, appEndpointSF) {

			$log.debug("Inside stockEditCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"
					+ angular.toJson($scope.curUser));

			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedStocksId:",
					$stateParams.selectedStocksId);

			$scope.selectedStocksId = $stateParams.selectedStocksId;
			
			$scope.getStockById = function() {
				var stockService = appEndpointSF.getStockService();
				stockService.getStockById($scope.selectedStocksId).then(
						function(stock) {
		
							$scope.stockData = stock;
							$log.debug("Inside Ctr $scope.stockData:"
									+ angular.toJson($scope.stockData));
							
						});
			}
			$scope.stockData = [];
			$scope.getStockById();

			
			$scope.updateStock = function() {
				var stockService = appEndpointSF.getStockService();
				stockService.updateStock($scope.stockData).then(function(msgBean) {
					$scope.showSimpleToast(msgBean.msg);
				});
			}
			
			$scope.cancelUpdate = function() {
				window.history.back();
			}
			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Stock Item Saved!')
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