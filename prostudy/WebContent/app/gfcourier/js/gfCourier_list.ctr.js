angular
		.module("prostudyApp")
		.controller(
				"gfCourierListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $mdDialog, $mdMedia,
						tableTestDataFactory, appEndpointSF) {
					console.log("Inside studentListPageCtr");

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Scheduled Exam Assigned to Student!')
								.position("top").hideDelay(3000));
					};
					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};

					$scope.courierTypelist = [ "Book", "Certificate",
					       					"Error Certificate", "Error books", "Prize Certificate" ];

					$scope.getGFCourierByInstitute = function() {

						var gfCourierService = appEndpointSF.getGFCourierService();
						gfCourierService.getGFCourierByInstitute($scope.curUser.instituteID)
								.then(
										function(gfCouriertList) {
											$scope.gfCouriertList = gfCouriertList;
										});
					}

					$scope.getPartnerSchoolByInstitute = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.getPartnerSchoolByInstitute(
								$scope.curUser.instituteID).then(
								function(pSchoolList) {

									$scope.pSchoolList = pSchoolList;
								});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

								$scope.getGFCourierByInstitute();
								$scope.getPartnerSchoolByInstitute();
							
							
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				
				});