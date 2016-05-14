angular
		.module("prostudyApp")
		.controller(
				"studentscheduleExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,
						$state, $stateParams, installmentList) {
					
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

	
/*					$scope.addStudentPayment = function() {		
						$log.debug("$scope.installments***"+angular.toJson($scope.installments));
						$scope.tempPayment.installments = $scope.installments;
						var PaymentService = appEndpointSF.getPaymentService();
						PaymentService.addStudentPayment($scope.tempPayment)
								.then(function(inst) {
									$scope.showSavedToast();
									$scope.tempPayment = {};

								});
						$state.go("student.list", {});
					}
*/					
					$scope.cancelButton = function() {
						$state.go("^", {});
					}

				});
