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
								'Customer Saved!').position("top").hideDelay(
								3000));
					};
					

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
					
					
					$scope.tempStudent = {firstName: "", lastName: ""};
					$scope.students = [{firstName: "Ram", lastName: "Sharma"},{firstName: "Andy", lastName: "Patil"}]; 
					
					$scope.addStudent = function(){
						var studentService = appEndpointSF.getStudentService();
						$scope.students = studentService.addStudent($scope.tempStudent);
						$scope.tempStudent = {firstName: "", lastName: ""};
					}
					
					$scope.getStudents = function(){
						$scope.students = appEndpointSF.getStudentService().getStudents();
					}

				});