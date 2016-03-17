angular.module("stockApp").controller(
		"contacts",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {

			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};
			$scope.selectedcontactNo = $stateParams.selectedcontactNo;
			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			
			$scope.contact = {
				loggedInUser : "",
				cid : "",
				fName : "",
				lName : "",
				status : "",
				phone : "",
				email : "",
				uid : "",
				supp : "",
				cust : "",
				salespartner : ""
			}

			$scope.addcontact = function() {
				$scope.contact.loggedInUser=$scope.curUser;
				var leadService = appEndpointSF.getleadService();
				leadService.addcontact($scope.contact).then(function(msgBean) {
					$log.debug("Inside Ctr addlead");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSimpleToast(msgBean.msg);
					// $scope.getAllleads();
				});

				$scope.contact = {};
			}

			$scope.getAllcontact = function() {
				var leadService = appEndpointSF.getleadService();
				leadService.getAllcontact($scope.curUser.businessAccount.id).then(function(contactList) {
					$log.debug("Inside Ctr getAllleads");
					$scope.contacts = contactList.items;
					$scope.cleadid = $scope.contacts.length + 1;
					$scope.contact.cid = $scope.cleadid;

				});
			}
			
			$scope.contacts = [];
			$scope.getAllcontact();

			$scope.getContactById = function() {
				$log.debug("Inside Ctr $scope.getAlllead");
				var leadService = appEndpointSF.getleadService();
				$scope.ctaskid;
				if (typeof $scope.selectedcontactNo != "undefined") {
				leadService.getContactById($scope.selectedcontactNo).then(
						function(contactList) {
							$log.debug("Inside Ctr getAllleads");
							$scope.contactL = contactList.result;

						});

			}
			}
			$scope.contactL = [];
			$scope.getContactById();

			$scope.updatecontact = function() {

				var leadService = appEndpointSF.getleadService();
				leadService.updatecontact($scope.contactL).then(
						function(msgBean) {
							$log.debug("Inside Ctr updateemp");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast(msgBean.msg);
							// $scope.empDetail = [];
						});
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
