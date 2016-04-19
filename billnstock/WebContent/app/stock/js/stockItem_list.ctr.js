angular.module("stockApp").controller(
		"stockListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $http,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside stockListCtr");

			  $scope.query = {
					    order: 'name',
					    limit: 5,
					    page: 1
					  };
			  
			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"
					+ angular.toJson($scope.curUser));

			$scope.selected = [];
/*			$scope.updateStock = function() {
				var stockService = appEndpointSF.getStockService();

				stockService.updateStock($scope.stock).then(
						function(msgBean) {
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
						});
			}
*/
			$scope.getAllStock = function() {
				$log.debug("Inside Ctr $scope.getAllStock");
				var stockService = appEndpointSF.getStockService();

				stockService.getAllStock($scope.curUser.business.id).then(
						function(stockList) {
							$log.debug("Inside Ctr getAllStock");
							$scope.stockData = stockList;
							$log.debug("Inside Ctr $scope.stockData:"
									+ angular.toJson($scope.stockData));
						});
			}
			
			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getAllStock();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}
			$scope.stockData = [];
			$scope.waitForServiceLoad();
			
			
				
			$scope.filteredStock = [];
			for(var i=0; i<$scope.stockData.length;i++){
				if($scope.stockData[i].id == $scope.selectedStocksId){
					$scope.filteredStock.push($scope.stockData[i]);
				}
			}
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
				$mdToast.show($mdToast.simple().content('Stock Updated....')
						.position("top").hideDelay(3000));
			};

		});