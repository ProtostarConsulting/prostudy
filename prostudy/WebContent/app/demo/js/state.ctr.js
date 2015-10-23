angular.module("prostudyApp")
		.controller(
				"statesPageCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF) {
					console.log("Inside statesPageCtr");

					$scope.things = [ "A", "Set", "Of", "Things", "out" ];
					$scope.items = [ "A", "List", "Of", "Items", "out" ];
					// console.log("Via Serice:" +
					// customerservice.addCustomer());
					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Student Saved!').position("top").hideDelay(
								3000));
					};



					/* Setup Menu */
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
					
					
					$scope.tempStudent = {firstName: "", lastName: ""};
					$scope.students = []; 
					
					$scope.addStudent = function(){
						var studentService = appEndpointSF.getStudentService();
						//$scope.students = studentService.addStudent($scope.tempStudent);
												
						studentService.addStudent($scope.tempStudent)
						.then(
								function() {
									$log
											.debug("Inside Ctr addStudent");
									$scope.showSimpleToast();
									$scope.tempStudent = {firstName: "", lastName: ""};
								});
					}
					
					$scope.getStudents = function(){
						//$scope.students = appEndpointSF.getStudentService().getStudents();
						var studentService = appEndpointSF.getStudentService();					
												
						studentService.getStudents($scope.tempStudent)
						.then(
								function(studList) {
									$log
											.debug("Inside Ctr getStudents");
									$scope.students = studList;
								});
					}

				});