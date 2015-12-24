angular.module("stockApp").controller(
		"opportunity",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {

			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};
			$scope.selectedopportunityNo = $stateParams.selectedopportunityNo;
			
			
			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			}
			var day = d.getDate();
			$scope.curdate = year + "-" + month + "-" + day;
			
			$scope.from = [ "Lead", "Customer" ];
			$scope.taskType = [ "Phone Call", "Email", "Visit" ];
			
			$scope.opportunity={
					id:"",
					from:"",
					name:"",
					date:$scope.curdate,
					description:"",
					tasks:[]
					
			}
			$scope.task = {
					id : "",
					description : "",
					type : "",
					date : $scope.curdate,
					note : "",
					status : ""
				}
			
			
			$scope.getleadcust=function(from){
				var temp=from;
				$log.debug("============"+temp);
				if(temp.trim()=="Lead"){
					$log.debug("============"+temp);
					var leadService = appEndpointSF.getleadService();
					leadService.getAllleads().then(function(leadList) {
							$scope.leadorcustlist = leadList;
				});
				
				}
				
				
				if(temp.trim()=="Customer"){
					$log.debug("============"+temp);	
					var customerService = appEndpointSF.getCustomerService();
					customerService.getAllCustomers().then(
							function(custList) {
								$scope.leadorcustlist = custList;
							});
					
				}
				
				
			}
			$scope.leadorcustlist = [];

				$scope.addopportunity = function() {
					
					$scope.opportunity.from=$scope.f;
					
				var opportunityService = appEndpointSF.getopportunityService();
				
				opportunityService.addopportunity($scope.opportunity).then(function(msgBean) {

					$log.debug("Inside Ctr addlead");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSimpleToast(msgBean.msg);
					$scope.getAllopportunity();
				});

				$scope.opportunity ={};
				$scope.opportunity.date=$scope.curdate;
			}
			
			
				
			$scope.getAllopportunity = function() {
				var opportunityService = appEndpointSF.getopportunityService();
				opportunityService.getAllopportunity().then(function(opportunityList) {
					$log.debug("Inside Ctr getAllleads");
					$scope.opportunitys = opportunityList;
					$scope.cleadid = $scope.opportunitys.length + 1;
					$scope.opportunity.id = $scope.cleadid;
					
				});
				
			}
			
			$scope.opportunitys = [];
			$scope.getAllopportunity();
			
		
			$scope.getopportunityById = function() {
				$log.debug("Inside Ctr $scope.getAlllead");
				var opportunityService = appEndpointSF.getopportunityService();
				opportunityService.getopportunityById($scope.selectedopportunityNo).then(
						function(opportunityList) {
							$log.debug("Inside Ctr opportunityList");
							$scope.opportunityL = opportunityList[0];
							$scope.ctaskid = $scope.opportunityL.tasks.length + 1;
							$scope.task.id = $scope.ctaskid;
				
						});

			}

			$scope.opportunityL = [];
			$scope.getopportunityById();
		
			$scope.updateopportunity = function() {

				var opportunityService = appEndpointSF.getopportunityService();
				opportunityService.updateopportunity($scope.opportunityL).then(
						function(msgBean) {
							$log.debug("Inside Ctr opportunityL");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast(msgBean.msg);
							//	$scope.empDetail = [];
						});
			}
			
			
			
			//----------hide and show ---------------------------

			$scope.IsHidden = true;
			$scope.ShowHide = function() {
				$scope.IsHidden = $scope.IsHidden ? false : true;
			}
			//-----------------------------------------------------
			
			
			//------------------save task----------

			$scope.addupdatetask = function(oppid) {

				var opportunityService = appEndpointSF.getopportunityService();

				opportunityService.addupdatetask($scope.task, oppid).then(
						function(msgBean) {

							$log.debug("Inside Ctr addlead");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast(msgBean.msg);
							$scope.getopportunityById();
						});
				
				$scope.task = {};
				$scope.task.date = $scope.curdate;
	
			}

			//--------------------------------------
		
			
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
