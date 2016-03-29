angular
		.module("stockApp")
		.controller(
				"setup.adduser",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					// ////////////////////////////////////////////////////////////////////////////////////////////////
					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};

					$scope.selecteduserNo = $stateParams.selecteduserNo;
					$scope.id;

					$scope.items = [ "stock", "sales", "hr", "crm", "customer",
							"invoice", "purchase", "employee", "admin" ];
					$scope.selection = [];

					$scope.curuser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.getCurUserByEmailId = function() {
						var setupService = appEndpointSF.getsetupService();
						setupService
								.getCurUserByEmailId($scope.curuser.email_id)
								.then(
										function(user) {
											$scope.business = user.items[0].businessAccount;
											$scope.id = $scope.business.id;
											$log.debug("$scope.business.id"+ angular.toJson($scope.business));
											
											//use to set all item false to set authority to all new user new Authority
											for ( var item in $scope.items) {
												$scope.selection.push(user.items[0].authority.indexOf(item) > -1);
											}

											if ($scope.business.accounttype.maxuser == $scope.business.totalUser - 1) {
												$("#hideSpan").show();
												$log.debug("#hideSpan");
											} else {
												$("#hideSpan").hide();
												$("#hideDiv").hide();
											}

										});
					}
					$scope.business = {};
					$scope.getCurUserByEmailId();

					//set toggled value onclick on check box and push in selection array only tru or false value
					$scope.toggleSelection = function toggleSelection(index) {
						$scope.selection[index] = !$scope.selection[index];
					};

					$scope.condition = function() {
						if ($scope.user.isGoogleUser == false) {
							return true;
						} else {
							return false
						}
					}
					// -------------------------------------------------------------------------

					$scope.user = {
						businessAccount : "",
						email_id : "",
						firstName : "",
						lastName : "",
						password : "",
						isGoogleUser : true,
						authority : []
					}

					$scope.adduser = function(busi) {
						$scope.user.businessAccount = busi;
						//use selection array true false value and push that numbered item on authority
						$scope.user.authority = [];
						for (var i = 0; i < $scope.selection.length; i++) {
							if ($scope.selection[i])
								$scope.user.authority.push($scope.items[i]);
						}

						var setupService = appEndpointSF.getsetupService();
						if (typeof $scope.curuser.businessAccount.id != 'undefined') {
							setupService
									.getAllUserOfOrg($scope.curuser.businessAccount.id)
									.then(
											function(users) {
												$scope.userslist = users.items.length;
												if ($scope.userslist < $scope.curuser.businessAccount.accounttype.maxuser) {

													var UserService = appEndpointSF.getUserService();
													UserService.addUser($scope.user)
															.then(function(msgBean) {
																		$scope.showSimpleToast(msgBean.msg);
																	});
													$scope.user = {};
												} else {
													$scope.showSimpleToast("userlimit is low");
												}

											});

						}

					}
					
					
					

					
					
					
//----------------------view user separate the controller----------------
	/*				$scope.getuserById = function() {
						$log.debug("Inside Ctr $scope.getuserById");
						var setupService = appEndpointSF.getsetupService();
						if (typeof $scope.selecteduserNo != "undefined") {
							setupService
									.getuserById($scope.selecteduserNo)
									.then(
											function(userList) {
												$log.debug("Inside Ctr getAllleads");
												$scope.userL = userList.result;
												//push the authoried item index in true in selection array 
												for ( var i in $scope.items) {
						$scope.selection.push($scope.userL.authority.indexOf($scope.items[i]) > -1);
												}

											});
						}
					}

					$scope.userL = {};
					$scope.getuserById();

					$scope.updateuser = function() {
						$scope.userL.authority = [];
						for (var i = 0; i < $scope.selection.length; i++) {
							if ($scope.selection[i])
								$scope.userL.authority.push($scope.items[i]);
						}
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.userL).then(
								function(msgBean) {
									$scope.showSimpleToast(msgBean.msg);
								});
					}*/
//------------------------------------------------------------
				//-------------------Checkemail
					$scope.Checkemail = function(emailid) {
						var proadminService = appEndpointSF
								.getproadminService();
						proadminService
								.getAllemp()
								.then(
										function(empList) {
											$scope.user11 = empList.items;
											for (i = 0; i < $scope.user11.length; i++) {
												if ($scope.user11[i].email_id == emailid) {
													$scope.userexists = "user already exists"
													angular
															.element(document
																	.getElementById('fname'))[0].disabled = true;
													angular
															.element(document
																	.getElementById('lname'))[0].disabled = true;
													break;

												} else {
													$scope.userexists = "";
													angular
															.element(document
																	.getElementById('fname'))[0].disabled = false;
													angular
															.element(document
																	.getElementById('lname'))[0].disabled = false;

												}
											}
										});

					}
					$scope.user11 = [];
					$scope.userexist = "";

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
