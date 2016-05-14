angular
		.module("stockApp")
		.controller(
				"lead",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};
					$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
					
					$scope.query = {
					         order: 'name',
					         limit: 5,
					         page: 1
					       };
					$scope.Address={
							line1:"",
							line2:"",
							city:"",
							state:"",
							country:"",
							pin:""
					}
					$scope.lead ={
							business:"",
							loggedInUser:"",
							lid:"",
							name:"",
							company:"",
							phone:"",
							email:"",
							designation:"",
							address:"",
							tasks :[]
					}
					
					$scope.task  = [{
							id : "",
							description : "",
							type : "",
							date : $scope.curdate,
							note : "",
							status : ""
						}]
					
					$scope.addlead = function() {
						$scope.lead.address=$scope.Address;
						$scope.lead.tasks= $scope.task ;
						$scope.lead.loggedInUser=$scope.curUser;
						$scope.lead.business=$scope.curUser.business;
						var leadService = appEndpointSF.getleadService();
						
						leadService.addlead($scope.lead).then(function(msgBean) {
							$log.debug("Inside Ctr addlead");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showAddToast();
							$scope.getAllleads();
						});
						$scope.leadform.$setPristine();
						  $scope.leadform.$setValidity();
						  $scope.leadform.$setUntouched();
						$scope.lead = {};
					}
					
					
			$scope.getAllleads = function() {
						$log.debug("Inside Ctr $scope.getAlllead");
						var leadService = appEndpointSF.getleadService();

						leadService.getAllleads($scope.curUser.business.id).then(function(leadList) {
							$log.debug("Inside Ctr getAllleads");
							$scope.leads = leadList.items;
							$scope.Address=$scope.leads.address;
							$log.debug("Inside Ctr getAllleads===="+angular.toJson($scope.leads ));
							$scope.cleadid = $scope.leads.length + 1;
							$scope.lead.lid = $scope.cleadid;
							
						});
					}
					
					$scope.leads = [];
				
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getAllleads();
							
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();
					
					$scope.toggleRight = buildToggler('right');

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
