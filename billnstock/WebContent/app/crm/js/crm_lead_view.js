angular.module("stockApp").controller(
		"lead_view",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {

			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};
			$scope.selectedleadNo = $stateParams.selectedleadNo;

			$scope.taskType = [ "Phone Call", "Email", "Visit" ];
			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			}

			var day = d.getDate();
			$scope.curdate = year + "-" + month + "-" + day;

			$scope.lead = {
				id : "",
				name : "",
				company : "",
				phone : "",
				email : "",
				designation : "",
				address : "",
				tasks : []
			}

			$scope.task = {
				id : "",
				description : "",
				type : "",
				date : $scope.curdate,
				note : "",
				status : ""
			}
			$scope.converttocustomer = {
				customerId : "",
				customerName : "",
				mobile : "",
				email :"",
				customerAddress : ""
			}

			$scope.getLeadById = function() {
				$log.debug("Inside Ctr $scope.getAlllead");
				var leadService = appEndpointSF.getleadService();
				$scope.ctaskid;
				leadService.getLeadById($scope.selectedleadNo).then(
						function(leadList) {
							$log.debug("Inside Ctr getAllleads");
							$scope.leads = leadList[0];
							$scope.ctaskid = $scope.leads.tasks.length + 1;
							$scope.task.id = $scope.ctaskid;
						});
				
				/*for(i=0;i<$scope.ctaskid;i++){
					if($scope.leads.tasks[i].status=="inactive"){
					$scope.activetask.push($scope.leads.task[i]);
					$log.debug("********************==="+$scope.activetask);
					}
					}*/
			}

			$scope.leads = [];
			$scope.activetask = [];
			$scope.getLeadById();

			//------------------save task----------

			$scope.addupdatetask = function(leadid) {

				var leadService = appEndpointSF.getleadService();

				leadService.addupdatetask($scope.task, leadid).then(
						function(msgBean) {

							$log.debug("Inside Ctr addlead");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast(msgBean.msg);
							$scope.getLeadById();
						});
				
				$scope.task = {};
	
			}

			//--------------------------------------
			//----------hide and show ---------------------------

			$scope.IsHidden = true;
			$scope.ShowHide = function() {
				$scope.IsHidden = $scope.IsHidden ? false : true;
			}
			//-----------------------------------------------------

			$scope.convertocustomer = function(leadid) {
				$scope.converttocustomer.customerId = $scope.leads.id;
				$scope.converttocustomer.customerName = $scope.leads.name;
				$scope.converttocustomer.mobile = $scope.leads.phone;
				$scope.converttocustomer.email = $scope.leads.email;
				$scope.converttocustomer.customerAddress = $scope.leads.address;
				
				var customerService = appEndpointSF.getCustomerService();
				customerService.addCustomer($scope.converttocustomer).then(
						function(msgBeanz) {
						
						});
				
				

				$scope.converttocustomer = {};
				var leadService = appEndpointSF.getleadService();
				leadService.deletelead(leadid).then(function(msgBean) {
					$scope.showSimpleToast(msgBean);
				});
				$scope.leads={};
				$scope.task={};

			}

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
