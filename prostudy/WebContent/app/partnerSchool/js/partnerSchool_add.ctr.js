angular
		.module("prostudyApp")
		.controller(
				"partnerSchoolAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, $state,
						$stateParams, appEndpointSF, partnerSchoolLevels) {

					console.log("Inside partnerSchoolAddCtr");
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.partnerSchoolLevels = partnerSchoolLevels;
					

					$scope.partnerSchool = {
						instituteID : '',
						schoolName : "",
						pSLevel : "",
						address : "",
						primaryContact : "",
					};

					$scope.selectedPSchoolId = $stateParams.selectedPSchoolId;
					$log.debug("$scope.selectedPSchoolId :"	+ $scope.selectedPSchoolId);

					$scope.addPartnerSchool = function() {
						$scope.partnerSchool.instituteID = $scope.curUser.instituteID;
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.addPartnerSchool(
								$scope.partnerSchool).then(function(msgBean) {
							
									if ($scope.selectedPSchoolId != undefined) {
									$scope.showUpdateToast();
									}else{
										$scope.showAddToast(); 
									}
							
						});
						$state.go('partnerSchool');

					}

					$scope.getPSchoolByPSID = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.getPSchoolByPSID(
								$scope.selectedPSchoolId).then(
								function(pSchool) {

									$scope.partnerSchool = pSchool;
								});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							if ($scope.selectedPSchoolId != undefined) {
								$scope.getPSchoolByPSID();
							}

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();
					$scope.cancelButton = function() {

						$state.go('^', {});
					};

				});
