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
									$scope.liveScheduledExams = scheduledExamList;
									
									/*var currentDate= new Date();
									$log.debug("before "+currentDate);
									$log.debug("before "+currentDate.toUTCString());
									dateStr = dateStr.toString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
									$log.debug("after dateStr"+dateStr);
									for(var i=0;i< scheduledExamList.length;i++)
									{
										$log.debug("####@ "+i);
									if (scheduledExamList[i].startdatentime <= currentDate.toUTCString() <= scheduledExamList[i].enddatentime)
									{
										$scope.liveScheduledExams.push(scheduledExamList[0]);
										$log.debug("#### "+i);
									}	
										}		*/								
									
								
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