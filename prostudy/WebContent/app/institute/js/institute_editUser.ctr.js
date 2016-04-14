angular
		.module("prostudyApp")
		.controller(
				"userEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF,
						tableTestDataFactory, $state, appEndpointSF,
						$stateParams) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					
					$scope.tempStudSub = {
							studID : "",
							subID : "",
							active : true
						};

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Student Updated!').position("top").hideDelay(
								3000));
					};
					$scope.currentInstID = $stateParams.currentInstID;
					$scope.selectedID = $stateParams.selectedID;				
					
					$scope.user = [];
					$scope.flag1;
					$scope.role;

					$scope.getUsers = function() {

						var UserService = appEndpointSF.getUserService();
						UserService
								.getUserByInstitute($scope.currentInstID)
								.then(
										function(userList) {
											$scope.users = userList;
											
											for (i = 0; i < $scope.users.length; i++) {
												if ($scope.selectedID == $scope.users[i].id) {													
													$scope.user.push($scope.users[i]);
													$scope.role = $scope.users[i].role;												
													
												}
											}
											$log.debug("$scope.user[0]"+$scope.user[0]);
											if($scope.user[0].role=="Student")
											{
											$scope.getSubjectsByDivName();
											$scope.getSubjectsByStudentID();	
											$scope.getSubByStudId();
											}

										});
					}
					

					$scope.updateUser = function() {
						$scope.checkForSubjectChange();
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.user[0]).then(
								function(msgBean) {
									$scope.showSavedToast();
									$state.go("^", {});
								});

					}
					
					$scope.cancel = function() {
						$state.go("^", {});
					}

					$scope.changeRole = function() {
						
						if ($scope.curUser.role == $scope.role) {
							return $scope.flag1 = true;

						} else if ($scope.role == "Admin"
								&& $scope.curUser.role == "Teacher"
								|| $scope.curUser.role == "Student") {
							return $scope.flag1 = true;
						} 
						
						else if ($scope.role == "Student"
								&& $scope.curUser.role == "Teacher"
								|| $scope.curUser.role == "Admin") {
							return $scope.flag1 = false;
						}
						
						else if ($scope.role == "Teacher"
								&& $scope.curUser.role == "Student") {
							return $scope.flag1 = true;
						}
					}
					$scope.subjectList=[];
					$scope.getSubjectsByDivName = function() {

						var DivisionService = appEndpointSF
								.getDivisionService();
						$log.debug("$scope.user[0].division"+$scope.user[0].division);
						DivisionService
								.getSubjectsByDivName($scope.user[0].division)
								.then(
										function(subList) {
											$scope.subjectList = subList;
											for (var i = 0; i < $scope.subjectList.length; i++) {
												$scope.selectedSubjectsIndx
														.push(false);
											}											
										});
					}

					$scope.getSubjectsByStudentID = function() {
						var SubjectService = appEndpointSF.getSubjectService();
						SubjectService
								.getSubjectsByStudentID($scope.user[0].id)
								.then(
										function(subList) {
											$scope.selectedSubjectList = subList;

											for (var i = 0; i < $scope.subjectList.length; i++) {
												$scope.selectedSubjectsIndx[i] = appEndpointSF
														.getUtilityService()
														.objectArrayContains(
																$scope.selectedSubjectList,
																$scope.subjectList[i]);
											}
										});
					}
					$scope.selectedSubjectsIndx = [];
				
					$scope.toggleSelection = function toggleSelection(index) {
						$scope.selectedSubjectsIndx[index] = !$scope.selectedSubjectsIndx[index];
					};
					
					$scope.checkForSubjectChange = function() {
						var StudSubService = appEndpointSF.getStudSubService();
						$scope.tempStudSub.studID = $scope.user[0];

						for (var i = 0; i < $scope.selectedSubjectsIndx.length; i++) {
							
							// If subject is selected now , which was not earlier and now Added.
							if ($scope.selectedSubjectsIndx[i]
									&& !appEndpointSF.getUtilityService()
											.objectArrayContains(
													$scope.selectedSubjectList,
													$scope.subjectList[i])) {
								$scope.tempStudSub.subID = $scope.subjectList[i];
								StudSubService
										.addStudSubject($scope.tempStudSub)
										.then(
												function(msgBean) {
													$scope.selectedSubjectList
															.push($scope.subjectList[i]);
												});
							}

							// If subject was selected earlier and now removed.
							if (!$scope.selectedSubjectsIndx[i]
									&& appEndpointSF.getUtilityService()
											.objectArrayContains(
													$scope.selectedSubjectList,
													$scope.subjectList[i])) {						
								
								
								$log.debug("To Mark this subject as Inactive:"
										+ $scope.subjectList[i].name+ $scope.subjectList[i].id);
								
								
								for(var j=0;j<$scope.selectedStudSubList.length;j++)
									{
									if ($scope.selectedStudSubList[j].subID.id==$scope.subjectList[i].id)
										{										
										$scope.tempStudSub=$scope.selectedStudSubList[j];
											$scope.removeStudSubject();
											break;
										}
									}		
							}
						}
					}
					
				//	$scope.selStudSub=[];
					//Function for If subject was selected earlier and now removed.
					
					
					$scope.removeStudSubject = function()
					{
						$scope.tempStudSub.active=false;
						$scope.tempStudSub.id=5277655813324800;					
					$log.debug("# $scope.selStudSub js..................... #"+angular.toJson($scope.tempStudSub));
					var StudSubService = appEndpointSF.getStudSubService();		
					StudSubService.removeStudSubject($scope.tempStudSub)
						.then(
								function(msgBean) {	
									$log.debug("#match after remove #");
								});
					}
					
					
					$scope.selectedStudSubList=[];
					$scope.getSubByStudId = function() {

						var StudSubService = appEndpointSF.getStudSubService();
						StudSubService.getSubByStudId($scope.user[0].id).then(
										function(studsub) {												
											$scope.selectedStudSubList=studsub;		
											$log.debug("$scope.selectedStudSubList"+angular.toJson($scope.selectedStudSubList));											
										});
					}

					$scope.waitForServiceLoad = function() {
						  if (appEndpointSF.is_service_ready) {					  
							  $scope.getUsers();		  
						  } 
						  else {
						   $log.debug("Services Not Loaded, watiting...");
						   $timeout($scope.waitForServiceLoad, 1000);
						  }
						 }
						  
						 $scope.waitForServiceLoad();					
					
					

				});
