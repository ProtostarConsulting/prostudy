angular.module("prostudyApp").controller(
		"loginModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory , $state) {

		/*	$scope.loadUsernameList = function() {
				console.log("inside getusernameList")
				$scope.users = [];
				$scope.selected = [];
				tableTestDataFactory.getusernameList().then(
						function(data) {
							$scope.users = data;
							$log.debug("inside ctr then $scope.getusernameList"
									+ $scope.users);
							console.log("inside getusernameList");

						});

			}// end of loadInstituteList load

			$log.debug("Inside loginModuleCtr");

			$scope.testGAPICall = function() {
				console.log("in side testGAPICall");
				var cars = appEndpointSF.getQuestionService().getCars()
						.execute(function(resp) {
							$log.debug("debug resp:" + resp);
							$log.info("info resp:" + resp);
							$log.warn("warn resp:" + resp);
							// $log.error("error resp:" + resp);
							var items = resp.items;
							$log.debug("cars:" + resp.items);

						});

			};

			$scope.loadUsernameList();*/
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('login Saved!')
						.position("top").hideDelay(3000));
			};
			
			$scope.tempLogin = {name: "", userName: "", email_id: "", pwd:""};
			$scope.login = []; 
			$scope.newlogin = [];
			
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

			

			/* Setup page menu */
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

			$scope.loginUser = function() {
				var loggedin = false;
				$scope.totalUsers = $scope.tempLogin.length;
				var usernameTyped = $scope.tempLogin.userName;
				var userpwdTyped = $scope.tempLogin.pwd;
				for (i = 0; i < $scope.login.length; i++) 
				{
					if ($scope.login[i].userName === usernameTyped
							&& $scope.login[i].pwd === userpwdTyped) 
					{
						loggedin = true;
						break;
					}
				}

				if (loggedin === true) {
					
					alert("loged in with  " + $scope.login[i].name);
					//$location.path("/exam/examdemo");
					$state.go('examtest')
					console.log("login =" +loggedin)
				} else 
				{
					 alert("username does not exist")
					console.log("login =" +loggedin)
				}
			}
			
			$scope.getLogin();
			
			

		});