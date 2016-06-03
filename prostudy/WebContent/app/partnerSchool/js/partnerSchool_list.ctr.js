angular.module("prostudyApp").controller(
		"partnerSchoolListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, appEndpointSF, $state, $sce, $stateParams, $q,$mdDialog,$mdMedia) {

			$scope.selectedChapterId = $stateParams.selectedChapterId;
			$scope.chapter = [];
			
			$scope.query = {
			         order: 'name',
			         limit: 5,
			         page: 1
			       };
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Chapter Updated!').position("top").hideDelay(
						3000));
			};
			
			$scope.getPartnerSchoolByInstitute = function() {

				var PartnerService = appEndpointSF.getPartnerSchoolService();
				PartnerService.getPartnerByInstitute(
						$scope.curUser.instituteID).then(function(pSchoolList) {
					$scope.pSchoolList = pSchoolList;

				});
			}

		$scope.cancel = function() {
				$state.go('partnerSchool.listPartnerSchool');
			}
			
			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					
					$scope.getPartnerSchoolByInstitute();

				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}

			$scope.waitForServiceLoad();
			
			$scope.query = {
					order : 'description',
					limit : 5,
					page : 1
				};

			$scope.downloadData=function(){
				
				document.location.href="DownloadPartnerSchools?InstituteId="+$scope.curUser.instituteID;
				
				
			}
		/*	$scope.getLogUploadURLDownload=function(){
				var uploadUrlService = appEndpointSF.getuploadURLService();
				uploadUrlService.getPartnerSchoolsUploadURLForDownload()
						.then(function(url) {
							$scope.PartnerSchoolsUploadURLForDownload=url.msg;
								});
				
			}
			$scope.PartnerSchoolsUploadURLForDownload;
			
			$scope.waitForServiceLoad1 = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getLogUploadURLDownload();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad1, 1000);
				}
			}
			$scope.waitForServiceLoad1();*/
			
			// ----------------------UPLODE EXCEL FILE-------------------------------

			$scope.UplodeExcel = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog
						.show(
								{
									controller : DialogController,
									templateUrl : '/app/partnerSchool/AddPartnerSchools.html',
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
				 document.excelform.action = $scope.PartnerSchoolsUploadURL;
			        // calling servlet action 
				    document.excelform.submit();
			}
				
				$scope.getLogUploadURL=function(){
					var uploadUrlService = appEndpointSF.getuploadURLService();
					uploadUrlService.getPartnerSchoolsUploadURL()
							.then(function(url) {
								$scope.PartnerSchoolsUploadURL=url.msg;
									});
					
				}
				$scope.PartnerSchoolsUploadURL;
				
				$scope.waitForServiceLoad = function() {
					if (appEndpointSF.is_service_ready) {
						$scope.getLogUploadURL();
					} else {
						$log.debug("Services Not Loaded, watiting...");
						$timeout($scope.waitForServiceLoad, 1000);
					}
				}
				$scope.waitForServiceLoad();
			
				
			
				
			
				}

			// -------------------------------------------------------
			
			
			
			
		});