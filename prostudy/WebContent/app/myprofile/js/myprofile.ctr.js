angular.module("prostudyApp").controller(
		"myProfileCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q,tableTestDataFactory,$state) {

			console.log("Inside myProfileCtr");
					  
		   //$scope.student = [];
			
	/*		$("#isCancelMyProfile").hide();
			$("#iseditMyProfile").show();*/
			$scope.isCancelMyProfile = false;
			  $scope.iseditMyProfile = true;
		   
			
			$scope.loadStudentList = function() 
			{	
				$("#isCancelMyProfile").hide();
				
				 console.log("loadStudentList");
				 
					tableTestDataFactory.getMyProfileList().then(
							function(data) {
								$scope.student = data;
								$scope.stud = $scope.student[0];
								
							
								$log.debug("inside ctr then $scope.student "+ $scope.stud.firstName);
							});//end of tableTestDataFactory

			
				 
				    
									$scope.modify = function(selectedStudent) {
										$scope.edit = true;
										
										 $scope.iseditMyProfile = true;
										  $scope.isCancelMyProfile = false;
							
										$scope.editRecord= angular.copy($scope.student[0]);
										console.log("EditRecord"+  $scope.editRecord.firstName);
										
										
									     
										$log.debug("Student" + $scope.student[0].firstName);  
										$scope.stud = selectedStudent;
										
										$log.debug("Stud" + $scope.stud.firstName); 
									
								
										
								
										
									};

									$scope.update = function() {
										$scope.edit  = false;
									
										  
									};// end of update
									
									
									$scope.cancelButton = function()
									{
										
										$scope.edit  = false;
										
										$log.debug("inside cancelButton");	
								/*		console.log("EditRecord cancelButton"+  $scope.editRecord.firstName);
										$log.debug("Stud cancelButton" + $scope.stud.firstName); 
										$log.debug("Student cancelButton" + $scope.student[0].firstName);  */
										
										angular.copy($scope.editRecord,$scope.stud);
										$log.debug("editRecordStud cancelButton" + $scope.stud.firstName); 
										
										angular.copy($scope.stud,$scope.editRecord);
						/*				$log.debug("editRecordonly cancelButton" + $scope.editRecord.firstName); */
									
								
										
										$scope.iseditMyProfile = false;
										  $scope.isCancelMyProfile = true;
									};//end of cancelButton
									
						

			
			};// end of loadStudentList
			
		
			 
			$scope.loadStudentList();

		});// end of myprofile ctr

