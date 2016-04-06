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
					$log.debug("$scope.selectedID"+$scope.selectedID);
					
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
													$log.debug("==id="+$scope.user[0]);
													$scope.user.push($scope.users[i]);
													$scope.role = $scope.users[i].role;												
													
												}
											}
											$log.debug("$scope.user[0]"+$scope.user[0]);
											if($scope.user[0].role=="Student")
											{
												$scope.getSubjectsByDivName();
											$scope.getSubjectsByStudentID();
											}

										});
					}
					$scope.getUsers();

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
							
								$scope.studID = $scope.user[0].id;
								$scope.subID=$scope.subjectList[i].id;
								$log.debug("$scope.studID:"+$scope.studID +" $scope.subID"+
										$scope.subID);
								
								
								
								$log.debug("To Mark this subject as Inactive:"
										+ $scope.subjectList[i].name+ $scope.subjectList[i].id);
							
								$scope.getStudSubByStudIdAndSubId();									
								
								$log.debug("$scope.selectedStudSub"+$scope.selectedStudSub);															
								
							}
						}
					}
					//Function for If subject was selected earlier and now removed.
					$scope.removeStudSubject = function() {
						
					var StudSubService = appEndpointSF.getStudSubService();								
					$scope.selectedStudSub.active=false;					
					
					StudSubService.removeStudSubject($scope.selectedStudSub)
						.then(
								function(msgBean) {											
								});
					}
					
					$scope.getStudSubByStudIdAndSubId = function() {

						var StudSubService = appEndpointSF.getStudSubService();
						StudSubService.getStudSubByStudIdAndSubId($scope.studID,$scope.subID).then(
										function(studsub) {	
											
											$scope.selectedStudSub=studsub;											
											if($scope.selectedStudSub!=undefined)
											{$scope.removeStudSubject();}											
										});
					}					

				});
