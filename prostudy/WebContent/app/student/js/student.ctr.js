angular.module("prostudyApp")
		.controller(
				"studentPageCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log) {
					console.log("Inside studentPageCtr");
					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content('XX Saved!')
								.position("top").hideDelay(3000));
					};

					$scope.addStudentToDB = function() {
						console.log("in side addStudent");
					};// end of call to addStudent

					$scope.newStudent = function() {
						return {
							firstName : '',
							lastName : '',
							mobileNo : '',
							email : '',
							address : {
								line1 : '',
								line2 : '',
								city : '',
								state : '',
								pin : '',
							}
						};
					}

					$scope.studentVM = $scope.newStudent();

					/* Setup menu */
					$scope.toggleRight = buildToggler('right');
					/**
					 * Build handler to open/close a SideNav; when animation
					 * finishes report completion in console
					 */
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