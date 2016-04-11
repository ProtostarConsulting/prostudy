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
			
			$scope.query = {
			         order: 'name',
			         limit: 5,
			         page: 1
			       };
			
			$scope.contact = {
					business:"",
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
				$scope.contact.business=$scope.curUser.business;
				var leadService = appEndpointSF.getleadService();
				leadService.addcontact($scope.contact).then(function(msgBean) {
					$log.debug("Inside Ctr addlead");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSimpleToast(msgBean.msg);
					$scope.getAllcontact();
				});
				$scope.contactform.$setPristine();
				  $scope.contactform.$setValidity();
				  $scope.contactform.$setUntouched();
				$scope.contact = {};
			}

			$scope.getAllcontact = function() {
				var leadService = appEndpointSF.getleadService();
				leadService.getAllcontact($scope.curUser.business.id).then(function(contactList) {
					$log.debug("Inside Ctr getAllleads");
					$scope.contacts = contactList.items;
					$scope.cleadid = $scope.contacts.length + 1;
					$scope.contact.cid = $scope.cleadid;

				});
			}
			
			$scope.contacts = [];
			
			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getAllcontact();
					
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
