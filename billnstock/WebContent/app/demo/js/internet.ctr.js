angular.module("stockApp")
		.controller(
				"internet",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, appEndpointSF) {
					console.log("Inside statesPageCtr");
			
			//------------------------------------------------------------------		
					
					$scope.internet={
							plan:"",
							data:"",
							rate:""
					}
					$scope.inputcost = "";
					
					$scope.addinternet = function(){
						var internetService = appEndpointSF.getinternetService();
						internetService.addinternet($scope.internet)
						.then(
								function() {
									$log
											.debug("Inside Ctr addinternet");
									$scope.showSimpleToast();
							
								});
						$scope.internet=[];
					}		
					
					$scope.searchbycost= function(){
							
						var internetService = appEndpointSF.getinternetService();

						internetService.findplan($scope.inputcost).then(function(plan) {
							$scope.internets=plan;
						/*	$log
							.debug("plan.rate : "+plan.rate);
							$log
							.debug("plan.plan : "+plan.plan);*/
							
							$log.debug("get internet plan"+angular.toJson(plan));
							
							
							//$log.debug("get internet plan"+angular.toJson(plan.items));
							});
						
					}
					$scope.internets=[];

			//-----------------------------------------------------------------

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
					
					$scope.getJson = function(object) {
						return angular.toJson(object);
					};
					
					
					
					
			

				});