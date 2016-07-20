angular
		.module("prostudyApp")
		.controller(
				"directoryNewUserAccountCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,$stateParams,Upload,
						$mdUtil, $log, $mdDialog, $mdMedia, $q, tableTestDataFactory, appEndpointSF) {
					
					
					$scope.checkConfirmPassword = appEndpointSF
					.getUtilityService().checkConfirmPassword;
					
					$scope.isUploadFlag={'flag':false};
					$scope.currentUserDomain = $stateParams.currentUserDomain;
					$scope.user=true;
					
				$scope.tempUser={
					'id':"",
					'name': {
					 'givenName': "",
					 'familyName': ""
					},
					'primaryEmail': "",					
					'password': ""	,
					'includeInGlobalAddressList': true			
					}			
		
				$scope.cancelButton = function() {
					$state.go("gfe.directoryUserList", {});
				}
								
				$scope.showNewUserAccountAddedToast = function() {
					$mdToast.show($mdToast.simple().content(
							'New User Account Added Successfully!').position("top")
							.hideDelay(3000));
				};
				$scope.createNewUserAccount = function(user) {	
					
					$log.debug(angular.toJson(user));
					$scope.creating = true;	
					if($scope.isUploadFlag.flag==false)
					{
						user.primaryEmail=user.primaryEmail+"@"+$scope.currentUserDomain;
					}					
					var request = gapi.client.directory.users.insert(user);				
					request.execute(function(resp) {	
						$scope.creating = false;	
						
						$scope.tempUser={};
						$scope.showNewUserAccountAddedToast();
						$state.go("gfe.directoryUserList", {});
					});
				
				}
				
				
				$scope.UplodeExcel = function(ev) {
					var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
							&& $scope.customFullscreen;
					$mdDialog
							.show(
									{
										controller : DialogController,
										templateUrl : '/app/gfe/directory_uploaduserlist.html',
										parent : angular.element(document.body),
										targetEvent : ev,
										clickOutsideToClose : true,
										fullscreen : useFullScreen,
										locals : {
											createUserRef: $scope.createNewUserAccount,
											isUploadFlag:$scope.isUploadFlag
										}										
										
									})
							.then(
									function(answer) {
										$scope.status = 'You said the information was "'
												+ answer + '".';
									},
									function() {
										$scope.status = 'You cancelled the dialog.';
									});

				};

				function DialogController($scope, $mdDialog,createUserRef,isUploadFlag) {

					$scope.csvFile;
					$scope.uploadProgressMsg = null;
					
					$scope.uploadUserListCSV = function() {
						var csvFile = $scope.csvFile;
						Upload
								.upload(
										{
											url : 'UploadDirectoryUserListServlet',
											data : {
												file : csvFile,
											}
										})
								.then(
										function(resp) {
											$log.debug('Successfully uploaded '
															+ resp.config.data.file.name
															+ '.'
															+ angular
																	.toJson(resp.data));
											$scope.uploadProgressMsg = 'Successfully uploaded '
													+ resp.config.data.file.name
													+ '.';
											$mdToast.show($mdToast.simple()
															.content('UserList Uploaded Sucessfully.')
															.position("top")
															.hideDelay(3000));
											$scope.userList=resp.data;
						                   						                  			                    
						                    
						                    for(var i=0; i< $scope.userList.length;i++)
						                    	{						                    	  					                    	 
						                    	  isUploadFlag.flag=true;
						                    	   createUserRef($scope.userList[i]);
						                    	}
						                    $mdDialog.hide();			                    
											$scope.csvFile = null;				
											
										},
										function(resp) {
											$log.debug('Error Ouccured, Error status: '
															+ resp.status);
											$scope.uploadProgressMsg = 'Error: '
													+ resp.status;
										},
										function(evt) {
											var progressPercentage = parseInt(100.0
													* evt.loaded
													/ evt.total);
											$log.debug('Upload progress: '
															+ progressPercentage
															+ '% '
															+ evt.config.data.file.name);
											$scope.uploadProgressMsg = 'Upload progress: '
													+ progressPercentage
													+ '% '
													+ evt.config.data.file.name;
											+'...'
										});
					};

				}
				
			
				});