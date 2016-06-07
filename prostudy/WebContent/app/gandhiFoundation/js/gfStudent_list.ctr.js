angular
		.module("prostudyApp")
		.controller(
				"gfStudentListCtr",
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

					// $scope.curUser=appEndpointSF.getLocalUserService().getLoggedinUser();
					$scope.students = [];

					$scope.getGFStudentsByInstitute = function() {

						var gfStudentService = appEndpointSF.getGFStudentService();
						gfStudentService.getGFStudentsByInstitute($scope.curUser.instituteID)
								.then(
										function(gfStudentList) {
											$scope.gfStudentList = gfStudentList;
										});
					}

					$scope.getPartnerByInstitute = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.getPartnerByInstitute(
								$scope.curUser.instituteID).then(
								function(pSchoolList) {

									$scope.pSchoolList = pSchoolList;
								});
					}

/*				$scope.sendData = function() {
						 $scope.$broadcast('studEditEvent', { studDetails: result.result });
					}
*/
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							if ($scope.examStudent != undefined) {
								$scope.getStudentByExam();
							} else {
								$scope.getGFStudentsByInstitute();
								$scope.getPartnerByInstitute();
							
							}
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				
					
					$scope.UplodeExcel = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogController,
											templateUrl : '/app/gandhiFoundation/uploadBulkStudent.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen,
											locals : {
												curuser : $scope.curUser
											}
										})
								.then(
										function(answer) {
											$scope.status = 'You said the information was "'
													+ answer + '".';
										},
										function() {
											$scope.status = 'You cancelled the dialog.';
										});
						
					};

					function DialogController($scope, $mdDialog, curuser) {
						
						$scope.insId=curuser.instituteID;
						$scope.loding=false;
						$scope.uplodeExcel=function(){
							$scope.loding=true;
						 document.excelform.action = $scope.BulkGFStudentUploadURL;
					        // calling servlet action 
						    document.excelform.submit();
					}
						
						$scope.getBulkGFStudentUploadURL=function(){
							var uploadUrlService = appEndpointSF.getuploadURLService();
							uploadUrlService.getBulkGFStudentUploadURL()
									.then(function(url) {
										$scope.BulkGFStudentUploadURL=url.msg;
											});
							
						}
						$scope.BulkGFStudentUploadURL;
						$scope.selectedSchool;
						$scope.getSchoolID = function(){
							$scope.selectedSchoolID = $scope.selectedSchool.id;
						}
						
						$scope.getPartnerSchoolByInstitute = function() {

							var PartnerService = appEndpointSF.getPartnerSchoolService();
							PartnerService.getPartnerByInstitute(
									$scope.insId).then(function(pSchoolList) {
								$scope.pSchoolList = pSchoolList;

							});
						}
						$scope.waitForServiceLoad = function() {
							if (appEndpointSF.is_service_ready) {
								$scope.getPartnerSchoolByInstitute();
								$scope.getBulkGFStudentUploadURL();
							} else {
								$log.debug("Services Not Loaded, watiting...");
								$timeout($scope.waitForServiceLoad, 1000);
							}
						}
						$scope.waitForServiceLoad();
						}
					
				});