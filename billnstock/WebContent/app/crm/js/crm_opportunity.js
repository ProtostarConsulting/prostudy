angular
		.module("stockApp")
		.controller(
				"opportunity",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {

					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};
					$scope.selectedopportunityNo = $stateParams.selectedopportunityNo;
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
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

					$scope.opportunity = {
						loggedInUser : "",
						oid : "",
						from : "",
						name : "",
						date : $scope.curdate,
						description : "",
						tasks : []

					}
					$scope.task = [ {
						tid : "",
						description : "",
						type : "",
						date : $scope.curdate,
						note : "",
						status : ""
					} ]

					$scope.taskobj = {
						tid : "",
						description : "",
						type : "",
						date : $scope.curdate,
						note : "",
						status : ""
					}

					$scope.getleadcust = function(from) {
						var temp = from;
						$log.debug("============" + temp);
						if (temp.trim() == "Lead") {
							$log.debug("============" + temp);
							var leadService = appEndpointSF.getleadService();
							leadService.getAllleads(
									$scope.curUser.businessAccount.id).then(
									function(leadList) {
										$scope.leadorcustlist = leadList.items;
									});

						}

						if (temp.trim() == "Customer") {
							$log.debug("============" + temp);
							var customerService = appEndpointSF
									.getCustomerService();
							customerService.getAllCustomersByCurrUser(
									$scope.curUser.businessAccount.id).then(
									function(custList) {
										$scope.leadorcustlist = custList;
									});

						}

					}
					$scope.leadorcustlist = [];

					$scope.addopportunity = function() {

						$scope.opportunity.loggedInUser = $scope.curUser;
						$scope.opportunity.from = $scope.f;	
						$scope.opportunity.tasks = $scope.task;
						var opportunityService = appEndpointSF
								.getopportunityService();

						opportunityService.addopportunity($scope.opportunity)
								.then(function(msgBean) {

									$log.debug("Inside Ctr addlead");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast(msgBean.msg);
									$scope.getAllopportunity();
								});

						$scope.opportunity = {};
						$scope.opportunity.date = $scope.curdate;
					}

					$scope.getAllopportunity = function() {
						var opportunityService = appEndpointSF
								.getopportunityService();
						opportunityService
								.getAllopportunity(
										$scope.curUser.businessAccount.id)
								.then(
										function(opportunityList) {
											$log
													.debug("Inside Ctr getAllleads");
											$scope.opportunitys = opportunityList.items;
											$scope.cleadid = $scope.opportunitys.length + 1;
											$scope.opportunity.oid = $scope.cleadid;

										});
					}

					$scope.opportunitys = [];
					$scope.getAllopportunity();

					$scope.getopportunityById = function() {
						$log.debug("Inside Ctr $scope.getAlllead");
						var opportunityService = appEndpointSF
								.getopportunityService();
						opportunityService
								.getopportunityById(
										$scope.selectedopportunityNo)
								.then(
										function(opportunityList) {
											$log
													.debug("Inside Ctr opportunityList");
											$scope.opportunityL = opportunityList.result;
											$scope.ctaskid = $scope.opportunityL.tasks.length + 1;
											$scope.taskobj.id = $scope.ctaskid;
											$scope.taskobj.date = $scope.curdate;
										});
					}

					$scope.opportunityL = [];
					$scope.getopportunityById();

					$scope.updateopportunity = function() {

						var opportunityService = appEndpointSF
								.getopportunityService();
						opportunityService.updateopportunity(
								$scope.opportunityL).then(function(msgBean) {
							$log.debug("Inside CtropportunityL");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast(msgBean.msg);
							// $scope.empDetail =[];
						});
					}

					// ----------hide and show ---------------------------
					$scope.IsHidden = true;
					$scope.ShowHide = function() {
						$scope.IsHidden = $scope.IsHidden ? false : true;
					}
					// -----------------------------------------------------

					// ------------------save task----------

					$scope.addupdatetask = function(oppid) {

						var opportunityService = appEndpointSF
								.getopportunityService();
						$scope.opportunityL.tasks.push($scope.taskobj);

						opportunityService.addupdatetask($scope.opportunityL)// $scope.task,
																				// oppid
						.then(function(msgBean) {

							$scope.showSimpleToast(msgBean.msg);
							$scope.getopportunityById();
						});

						$scope.taskobj = {};
						$scope.task.date = $scope.curdate;
					}

					// --------------------------------------

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
