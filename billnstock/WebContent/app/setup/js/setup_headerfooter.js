angular
		.module("stockApp")
		.controller(
				"setup_footer",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					$scope.curuser = appEndpointSF.getLocalUserService().getLoggedinUser();
					$scope.bizID ;
					$scope.logFooterURL ;
					$scope.getLogUploadFooterURL=function(){
						var uploadUrlService = appEndpointSF.getuploadURLService();
						uploadUrlService.getLogUploadFooterURL()
								.then(function(url) {
									$scope.logUploadURL=url.msg;
									$scope.bizID = $scope.curuser.business.id;
								});
						
					}
					$scope.logUploadURL;
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getLogUploadFooterURL();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();
					
					
					$scope.uplodeimage=function(){
						  document.footerform.action = $scope.logUploadURL;
				          document.footerform.submit();
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
											$scope.lodeImage();
											
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
					
					$scope.lodeImage=function(){
					if($scope.curUser!=undefined || $scope.curUser !==null){
						$scope.logFooterURL = '//' + window.location.host + '/serve?blob-key='+ $scope.curUser.business.footerBlobKey;
						}
					}
					
					
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
