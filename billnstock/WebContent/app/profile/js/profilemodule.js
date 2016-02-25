angular
		.module("stockApp")
		.controller(
				"profileCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					
					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};
					
					
					$scope.curuser = appEndpointSF.getLocalUserService().getLoggedinUser();
	
					$scope.getuserById = function() {
						$log.debug("Inside Ctr $scope.getuserById");
						var setupService = appEndpointSF.getsetupService();
						if (typeof $scope.selecteduserNo != undefined) {
							setupService.getuserById($scope.curuser.id).then(
									function(userList) {
										$log.debug("Inside Ctr getAllleads");
										$scope.userL = userList.result;

									});
						}
					}

					$scope.userL = [];
					$scope.getuserById();

					$scope.updateuser = function() {
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.userL).then(function(msgBean) {
							$scope.showSimpleToast(msgBean.msg); 
						});
					}
					
					

					
					$scope.changepass=function(){
					
							if ($scope.password == $scope.confirmpassword) {
								$scope.savemsg=true;
								$scope.checkpass=false;
							} else {
								$scope.checkpass=true;
								$scope.savemsg=false;
							}
							
							if($scope.savemsg==true){
							$scope.userL.password=$scope.password;
							var UserService = appEndpointSF.getUserService();
							UserService.updateUser($scope.userL).then(function(msgBean) {
								$scope.showSimpleToast(msgBean.msg); 
							});
							}
					}
					
			
					
					
					
					
					app.directive('wjValidationError', function () {
						  return {
						    require: 'ngModel',
						    link: function (scope, elm, attrs, ctl) {
						      scope.$watch(attrs['wjValidationError'], function (errorMsg) {
						        elm[0].setCustomValidity(errorMsg);
						        ctl.$setValidity('wjValidationError', errorMsg ? false : true);
						      });
						    }
						  };
						});
					
					
					
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
