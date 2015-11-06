angular.module("stockApp").controller(
		"taxCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside taxCtr");
			

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Tax Data Saved!').position(
						"top").hideDelay(3000));
			};

			$scope.tax = {};
			$scope.addTax = function() {
				$log.debug("No1");
				var taxService = appEndpointSF.getTaxService();
				
				taxService.addTax($scope.tax).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addTax");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
							
						});
				$log.debug("No4");
			}

			$scope.getAllTaxes = function() {
				$log.debug("Inside Ctr $scope.getAllTaxes");
				var taxService = appEndpointSF.getTaxService();

				taxService.getAllTaxes().then(
						function(taxList) {
							$log.debug("Inside Ctr getAllTaxes");
							$scope.taxData = taxList;
							$log.debug("Inside Ctr $scope.taxData:"
									+ angular.toJson($scope.taxData));							
						});
			}
			
			$scope.taxData = [];
			$scope.getAllTaxes();
			
//			 Setup menu 
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
