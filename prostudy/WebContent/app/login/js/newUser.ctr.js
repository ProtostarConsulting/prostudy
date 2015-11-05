angular.module("prostudyApp").controller(
		"newUserCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('login Saved!')
						.position("top").hideDelay(3000));
			};
			
			
			
			$scope.tempLogin = {name: "", userName: "", email_id: "", pwd:""};
			$scope.login = []; 
			
			$scope.addLogin = function(){
				$log
				.debug("No1");	
				var LoginService = appEndpointSF.getLoginService();
				LoginService.addLogin($scope.tempLogin)
				.then(
						function(msgBean) {
							$log.debug("No6");	
							$log.debug("Inside Ctr addLogin");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempLogin = {name: "", userName: "", email_id: "", pwd:""};
						});
				$log.debug("No4");	
			}
			
			$scope.getLogin = function(){
				var LoginService = appEndpointSF.getLoginService();					
										
				LoginService.getLogin()
				.then(
						function(loginList) {
							$log.debug("Inside Ctr getLogin");
							$scope.login = loginList;
						});
			}


			
		});
