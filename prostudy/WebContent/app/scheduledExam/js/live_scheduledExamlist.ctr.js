angular
		.module("prostudyApp")
		.controller(
				"liveScheduledExamListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
									
					$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
					$scope.selected = [];
					$scope.liveScheduledExams=[];
					
					$scope.getScheduledExamByInstitute = function() {						
					
						var ScheduledExamService = appEndpointSF.getScheduledExamService();
						ScheduledExamService.getScheduledExamByInstitute(
								$scope.curUser.instituteID).then(
								function(scheduledExamList) {									
								
									for(var i=0;i< scheduledExamList.length;i++)
									{
										
									if (new Date(scheduledExamList[i].startdatentime) <=  new Date(scheduledExamList[i].enddatentime) && new Date(scheduledExamList[i].enddatentime) >= new Date() && new Date(scheduledExamList[i].startdatentime) <= new Date())
									{										
										$scope.liveScheduledExams.push(scheduledExamList[i]);
										
									}	
										}						
									
								
								});
					}
					$scope.query = {
						order : 'name',
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
					$scope.waitForServiceLoad = function() {
						  if (appEndpointSF.is_service_ready) {					  
							  $scope.getScheduledExamByInstitute();  
						  } 
						  else {				 
						   $timeout($scope.waitForServiceLoad, 1000);
						  }
						 }
						  
						 $scope.waitForServiceLoad();
					
				
				});