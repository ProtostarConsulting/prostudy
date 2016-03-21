angular.module("stockApp").controller(
		"taxCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside taxCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
			
			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Tax Data Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tax = {
					taxCodeName:'',
					taxPercenatge:'',
					taxVisibility:true
			}
			
			$scope.addTax = function() {
				$log.debug("No1");
				$scope.tax.loggedInUser =$scope.curUser;
				
				var taxService = appEndpointSF.getTaxService();

				taxService.addTax($scope.tax).then(function(msgBean) {
					$scope.showSimpleToast();

				});
				$log.debug("No4");
				$scope.tax = {};
			}

			$scope.getAllTaxes = function() {
				$log.debug("Inside Ctr $scope.getAllTaxes");
				var taxService = appEndpointSF.getTaxService();

				taxService.getAllTaxes($scope.curUser.businessAccount.id).then(
						function(taxList) {
							$scope.taxData = taxList;
							$log.debug("Inside Ctr $scope.taxData:"
									+ angular.toJson($scope.taxData));
						});
			}

			$scope.taxData = [];
			$scope.getAllTaxes();

			$scope.selected = [];		
			
			$scope.updateTax = function() {
				var taxService = appEndpointSF.getTaxService();

				taxService.updateTax($scope.selected[0]).then(
						function(msgBean) {							
							$scope.showSimpleToastUpdateTax();
					  		$scope.getAllTaxes();
					  		window.history.back();
						});
			}
		
			$scope.cancelUpdate = function() {	
				window.history.back();
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
				$mdToast.show($mdToast.simple().content('Tax Data Saved!')
						.position("top").hideDelay(3000));
			};
			
			$scope.showSimpleToastUpdateTax = function() {
				$mdToast.show($mdToast.simple().content('Tax Updated!')
						.position("top").hideDelay(3000));
			};
		});
