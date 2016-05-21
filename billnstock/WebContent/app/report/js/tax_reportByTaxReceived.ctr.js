angular.module("stockApp").controller(
		"ReportByTaxReceivedCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $http, objectFactory, appEndpointSF) {

			$scope.getReportByTaxReceived = function() {
				var invoiceService = appEndpointSF.getInvoiceService();

				invoiceService.getAllInvoice($scope.curUser.business.id).then(
						function(receivedTaxList) {
							$scope.taxRcvData = receivedTaxList;

						})

			}
			$scope.taxReceived = [];
			$scope.showDetails = function(fromDate, toDate) {
				
			
					for (var i = 0; i <= $scope.taxRcvData.length; i++) {
						
						$scope.taxRcvData[i].invoiceDate = new Date($scope.taxRcvData[i].invoiceDate);
						
						if ($scope.taxRcvData[i].invoiceDate >= fromDate
								&& $scope.taxRcvData[i].invoiceDate <= toDate) {
							$scope.taxReceived.push($scope.taxRcvData[i]);
						}
					}
				}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getReportByTaxReceived();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}
			$scope.taxRcvData = [];
			$scope.waitForServiceLoad();

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

			$scope.query = {
				order : 'name',
				limit : 5,
				page : 1
			};
		});