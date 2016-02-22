angular
		.module("prostudyApp")
		.controller(
				"instituteViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $stateParams, $filter) {

					$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
					
					$scope.selectedStandard;
					$scope.isGoogleUser;
					
					$scope.newField = {};
			        $scope.editingStd = false;
			        
			        $scope.newDiv = {};
			        $scope.editingDiv = false;

			        $scope.newSub = {};
			        $scope.editingSub = false;
			        $scope.newSubject= {};
			        
			        
					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedInstituteId:",
							$stateParams.selectedInstituteId);
					$log.debug("$stateParams.selectedStdID :",
							$stateParams.selectedStdID);
					$log.debug("$stateParams.selectedDivID :",
							$stateParams.selectedDivID);
					
					
					$scope.selectedInstituteId = $stateParams.selectedInstituteId;
					$scope.selectedStdID = $stateParams.selectedStdID;
					$scope.selectedDivID = $stateParams.selectedDivID; 
					
					$scope.currentInstID = $stateParams.currentInstID;
					$scope.currentStdID = $stateParams.currentStdID;
					$scope.currentDivID = $stateParams.currentDivID;
					
					
					$scope.showAdminSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Admin Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showTeacherSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Teacher Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showStudentSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Student Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showStandardSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Standard Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showUpdateSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Updated!').position("top")
								.hideDelay(3000));
					};

					$scope.students = [];
					$scope.adminList = [];
					$scope.teacherList = [];
					$scope.studentList = [];
					
					$scope.selectedStdID  = $stateParams.selectedStdID
					
					$scope.standard = {

						instituteID : $scope.curUser.instituteID,
						name : ""
					};
					
					$scope.division= {
							
							standardID : $scope.selectedStdID,
							name : ""
					};
				
					
					$scope.subjects = [];
					$scope.addSubjects = function() {
						$scope.subjects.push({
							'divisionID' : $scope.currentDivID,
							'name' : $scope.name,
							
						});
						$scope.name = '';
						
					};
					

					$scope.addStudents = function() {
						$scope.students.push({
							'instituteID' : $scope.curUser.instituteID,
							'institute' : $scope.name,
							'firstName' : $scope.firstName,
							'lastName' : $scope.lastName,
							'email_id' : $scope.email_id,
							'address' : $scope.address,
							'contact' : $scope.contact,
							'role' : "Student",
							'standard' : $scope.selectedStandard,
							'password' : $scope.password,
							'isGoogleUser' : $scope.isGoogleUser
						});
						$scope.firstName = '';
						$scope.lastName = '';
						$scope.email_id = '';
						$scope.address = '';
						$scope.contact = '';
						$scope.role = '';
						$scope.selectedStandard = '';
						$scope.password = '';
					};

					$scope.teachers = [];
					$scope.addTeachers = function() {
						$scope.teachers.push({
							'instituteID' : $scope.curUser.instituteID,
							'institute' : $scope.name,
							'firstName' : $scope.firstName,
							'lastName' : $scope.lastName,
							'email_id' : $scope.email_id,
							'address' : $scope.address,
							'contact' : $scope.contact,
							'role' : "Teacher",
							'password' : $scope.password,
							'isGoogleUser' : $scope.isGoogleUser
						});
						$scope.firstName = '';
						$scope.lastName = '';
						$scope.email_id = '';
						$scope.address = '';
						$scope.contact = '';
						$scope.role = '';
						$scope.password = '';
					};

					$scope.admins = [];
					$scope.addToAdminsList = function() {
						$scope.admins.push({
							'instituteID' : $scope.curUser.instituteID,
							'institute' : $scope.name,
							'firstName' : $scope.firstName,
							'lastName' : $scope.lastName,
							'email_id' : $scope.email_id,
							'address' : $scope.address,
							'contact' : $scope.contact,
							'role' : "Admin",
							'password' : $scope.password,
							'isGoogleUser' : $scope.isGoogleUser
						});
						$scope.firstName = '';
						$scope.lastName = '';
						$scope.email_id = '';
						$scope.address = '';
						$scope.contact = '';
						$scope.role = '';
						$scope.password = '';
					};

					$scope.selectedStudents = [];
					$scope.selectedTeachers = [];
					$scope.selectedAdmins = [];

					$scope.addInstituteAdmins = function() {
						var UserService = appEndpointSF.getUserService();
						for (i = 0; i < $scope.selectedAdmins.length; i++) {
							UserService.addUser($scope.selectedAdmins[i]).then(
									function(msgBean) {
										$log.debug("msgBean.msg:"
														+ msgBean.msg);

									});
						}
						$scope.showAdminSavedToast();
						$scope.cancelButton();

					}

					$scope.addInstituteTeachers = function() {
						var UserService = appEndpointSF.getUserService();
						for (i = 0; i < $scope.selectedTeachers.length; i++) {
							UserService.addUser($scope.selectedTeachers[i])
									.then(
											function(msgBean) {
												$log.debug("msgBean.msg:"
														+ msgBean.msg);

											});
						}
						$scope.showTeacherSavedToast();
						$scope.cancelButton();
					}

					$scope.addInstituteStudents = function() {
						var UserService = appEndpointSF.getUserService();
						for (i = 0; i < $scope.selectedStudents.length; i++) {
							UserService.addUser($scope.selectedStudents[i])
									.then(
											function(msgBean) {
												$log.debug("msgBean.msg:"
														+ msgBean.msg);

											});
						}

						$scope.showStudentSavedToast();
						$scope.cancelButton();
					}

					
					$scope.addInstituteSubjects = function() {
						var SubjectService = appEndpointSF.getSubjectService();
						$scope.currentDivID = $stateParams.currentDivID;
						
						for (i = 0; i < $scope.selectedSubjects.length; i++) {
						SubjectService.addSubjects($scope.selectedSubjects[i]).then(function(msgBean) {
								
							});
						}
						$state.go("institute.addDivisions",  {currentInstID : $scope.currentInstID,currentStdID : $scope.currentStdID });
					}

					$scope.showselectedInstitute = function() {
						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService.getInstituteById($scope.curUser.instituteID).then(
								function(institutes) {
									$scope.Institute = institutes;
								});
					}

					$scope.getUserByInstitute = function() {

						var UserService = appEndpointSF.getUserService();
						UserService
								.getUserByInstitute($scope.curUser.instituteID)
								.then(
										function(userList) {
											$scope.users = userList;
											$log.debug("$scope.users :"+ angular.toJson($scope.users));
											for (var i = 0; i < $scope.users.length; i++) {
												if ($scope.users[i].role == "Admin") {
													$scope.adminList
															.push($scope.users[i]);

												} else if ($scope.users[i].role == "Teacher") {
													$scope.teacherList
															.push($scope.users[i]);

												} else if ($scope.users[i].role == "Student") {
													$scope.studentList
															.push($scope.users[i]);

												}
											}

										});
					}

					$scope.getStandardByInstitute = function() {

						var StandardService = appEndpointSF
								.getStandardService();
						StandardService.getStandardByInstitute(
								$scope.curUser.instituteID).then(
								function(standardList) {
									$scope.standards = standardList;
									
								});
					}

					$scope.showselectedInstitute();
					$scope.getUserByInstitute();
					$scope.getStandardByInstitute();
					
					
					$scope.getDivisionByStandard = function() {

						var DivisionService = appEndpointSF
								.getDivisionService();
						DivisionService.getDivisionByStandard($scope.selectedStdID).then(
								function(divisionList) {
									$scope.divisions = divisionList;
									

								});
					}
					$scope.getDivisionByStandard();
					
					
					$scope.getSubjectByDivision = function() {

						var SubjectService = appEndpointSF.getSubjectService();
						SubjectService.getSubjectByDivision($scope.selectedDivID).then(
								function(subjectList) {
									$scope.subjects = subjectList;
									
								});
					}
					$scope.getSubjectByDivision();
					
					// Update Standard
					
					$scope.editStd = function(field) {
				        $scope.editingStd = $scope.standards.indexOf(field);
				        $scope.newField = angular.copy(field);
				        $log.debug("$scope.newField :"+angular.toJson($scope.newField));
				    }
				    
				    $scope.saveField = function(index) {
				        if ($scope.editingStd !== false) {
				            $scope.standards[$scope.editingStd] = $scope.newField;
				            $scope.editingStd = false;
				        }       
				    };
				    
				    $scope.cancel = function(index) {
				    	 $log.debug("$scope.newField :"+angular.toJson($scope.newField));
				        if ($scope.editingStd !== false) {
				            $scope.standards[$scope.editingStd] = $scope.newField;
				            $scope.editingStd = false;
				        }       
				    };
				    
					$scope.updateStandard = function() {
						
						var StandardService = appEndpointSF.getStandardService();
						
						$scope.selectedStandardId = $stateParams.selectedStandardId;  
						for(var i=0;i<$scope.standards.length;i++)
						{
							if($scope.selectedStandardId == $scope.standards[i].id)
							{
								 $scope.newStandards = $scope.standards[i]
							}
							
						}
						StandardService.editStandard($scope.newStandards).then(function(msgBean) {
							$log.debug("msgBean :"+angular.toJson(msgBean));
							$log.debug("Inside Ctr updateStandard");
							
						});
						
					}
					
					// End of Update Standard
					
					// Update Division
					
					$scope.editDiv = function(field) {
				        $scope.editingDiv = $scope.divisions.indexOf(field);
				        $scope.newDIv = angular.copy(field);
				        $log.debug("$scope.newDIv :"+angular.toJson($scope.newDIv));
				    }
				    
				    $scope.saveDiv = function(index) {
				        if ($scope.editingDiv !== false) {
				            $scope.divisions[$scope.editingDiv] = $scope.newDIv;
				            $scope.editingDiv = false;
				        }       
				    };
				    
				    $scope.cancelDiv = function(index) {
				    	 $log.debug("$scope.newDIv :"+angular.toJson($scope.newDIv));
				        if ($scope.editingDiv !== false) {
				            $scope.divisions[$scope.editingDiv] = $scope.newDIv;
				            $scope.editingDiv = false;
				        }       
				    };
				    
					$scope.updateDivision = function() {
						
						var DivisionService = appEndpointSF.getDivisionService();
						
						$log.debug("$stateParams.selectedDivisionId :",
								$stateParams.selectedDivisionId);
						$scope.selectedDivisionId = $stateParams.selectedDivisionId;  
						for(var i=0;i<$scope.divisions.length;i++)
						{
							if($scope.selectedDivisionId == $scope.divisions[i].id)
							{
								 $scope.newDivisions = $scope.divisions[i]
							}
							
						}
						
						DivisionService.editDivision($scope.newDivisions).then(function(msgBean) {
							$log.debug("msgBean :"+angular.toJson(msgBean));
							$log.debug("Inside Ctr updateDivision");
							
						});
						
					}
					
					// End of Update Division
					
					// Update Subject
					
					$scope.editSub = function(field) {
				        $scope.editingSub = $scope.subjects.indexOf(field);
				        $scope.newSub = angular.copy(field);
				        $log.debug("$scope.newSub :"+angular.toJson($scope.newSub));
				    }
				    
				    $scope.saveSub = function(index) {
				        if ($scope.editingSub !== false) {
				            $scope.subjects[$scope.editingSub] = $scope.newSub;
				            $scope.editingSub = false;
				        }       
				    };
				    
				    $scope.cancelSub = function(index) {
				    	 $log.debug("$scope.newSub :"+angular.toJson($scope.newSub));
				        if ($scope.editingSub !== false) {
				            $scope.subjects[$scope.editingSub] = $scope.newSub;
				            $scope.editingSub = false;
				        }       
				    };
				    
					$scope.updateSubject = function() {
						
						var SubjectService = appEndpointSF.getSubjectService();
						
						$log.debug("$stateParams.selectedSubjectId :",
								$stateParams.selectedSubjectId);
						$scope.selectedSubjectId = $stateParams.selectedSubjectId;  
						for(var i=0;i<$scope.subjects.length;i++)
						{
							if($scope.selectedSubjectId == $scope.subjects[i].id)
							{
								 $scope.newSubjects = $scope.subjects[i]
							}
							
						}
						SubjectService.editSubject($scope.newSubjects).then(function(msgBean) {
							$log.debug("msgBean :"+angular.toJson(msgBean));
							$log.debug("Inside Ctr updatesubject");
							
						});
						
					}
					
					// End of Update Subject
					
					
				
				
					$scope.editInstitute = function() {
						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService.editInstitute($scope.Institute).then(
								function(msgBean) {
									$log.debug("No6");
									$log.debug("Inside Ctr EditInstitute");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showUpdateSavedToast();
								});

						$state.go("institute.view");
					}
					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};
					$scope.onpagechange = function(page, limit) {
						var deferred = $q.defer();
						$timeout(function() {
							deferred.resolve();
						}, 2000);

						return deferred.promise;
					};

					$scope.onorderchange = function(order) {
						var deferred = $q.defer();

						$timeout(function() {
							deferred.resolve();
						}, 2000);

						return deferred.promise;
					};
					$scope.cancelButton = function() {
						$log.debug("inside cancelButton");
						$state.go('^', {});
					};
					$scope.selected = [];

				});
