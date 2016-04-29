angular
		.module("stockApp")
		.controller(
				"setup.setLogo",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $mdMedia, $mdDialog, $log,
						objectFactory, appEndpointSF,$http) {

					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};
					$scope.businessNo = $stateParams.businessNo;
							
				
					$scope.curuser = appEndpointSF.getLocalUserService().getLoggedinUser();
				
					$scope.bizID ;
							
					$scope.getLogUploadURL=function(){
						var uploadUrlService = appEndpointSF.getuploadURLService();
						uploadUrlService.getLogUploadURL()
								.then(function(url) {
									$scope.logUploadURL=url.msg;
									$scope.bizID = $scope.curuser.business.id;
								});
						
					}
					$scope.logUploadURL;
					
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getLogUploadURL();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();
				
					
					$scope.uplodeimage=function(){
							/*action="{{logUploadURL}}"*/
						 document.imageform.action = $scope.logUploadURL;
					        // calling servlet action 
						    document.imageform.submit();
						    
						   // $scope.getBusinessById();    
					}
					
					//use to update localdatabase business value 
					$scope.getBusinessById=function(){
						if(typeof $scope.businessNo == "undefined"){
							$scope.Bid=$scope.curuser.business.id;
						}else{
							$scope.Bid=$scope.businessNo;
						}
						var UserService = appEndpointSF	.getUserService();
							UserService.getbusinessById($scope.Bid).then(function(Business) {
										$scope.business=Business;
										$scope.curuser.business=Business;
										appEndpointSF.getLocalUserService().saveLoggedInUser($scope.curuser);
											$scope.initCommonSetting();
							});
						
					}
					$scope.business={};
				

					$scope.waitForServiceLoad1 = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getBusinessById();  
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad1, 1000);
						}
					}
					$scope.waitForServiceLoad1();
					
					
					$scope.toggleRight = buildToggler('right');
					
					
	/*				$('.dropzone').html5imageupload();*/
					
					

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
