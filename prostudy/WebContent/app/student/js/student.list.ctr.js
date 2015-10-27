angular.module("prostudyApp")
		.controller(
				"studentListPageCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory,appEndpointSF) {
					console.log("Inside studentListPageCtr");
					
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content('Institute Saved!')
								.position("top").hideDelay(3000));
					};

					$scope.tempStudent =  {firstName: "", lastName: "",phone_no:"",email:"",city:"",state:"",pin:""};
					$scope.students = []; 
					
					$scope.addStudent = function(){
						$log.debug("No1");	
						var studentService = appEndpointSF.getStudentService();
						
												
						studentService.addStudent($scope.tempStudent)
						.then(
								function(msgBean) {
									$log.debug("No6");	
									$log.debug("Inside Ctr addStudent");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast();
								    $scope.tempStudent = {firstName: "", lastName: "",phone_no:"",email:"",city:"",state:"",pin:""};
								});
						$log.debug("No4");	
					}
					
					$scope.getStudents = function(){
						
						var studentService = appEndpointSF.getStudentService();					
												
						studentService.getStudents()
						.then(
								function(studList) {
									$log
											.debug("Inside Ctr getStudents");
									$scope.students = studList;
								});
					}
					
					$scope.getStudents();
					
				

					/* Setup menu */
					$scope.toggleRight = buildToggler('rightListPage');
					
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