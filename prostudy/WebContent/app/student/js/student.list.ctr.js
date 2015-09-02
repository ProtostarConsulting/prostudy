angular.module("prostudyApp")
		.controller(
				"studentListPageCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log) {
					console.log("Inside customerCtr");
					// console.log("Via Serice:" +
					// customerservice.addCustomer());
					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Customer Saved!').position("top").hideDelay(
								3000));
					};

					$scope.getCustomerList = function() {
						console.log("getCustomerList");

					};

					
					$scope.studList = [ {
						firstName : 'A',
						lastName : 'L',
						mobileNo : '89078923',
						email : 'a@b'
					}, {
						firstName : 'A',
						lastName : 'L',
						mobileNo : '89078923',
						email : 'a@b'
					}, {
						firstName : 'A',
						lastName : 'L',
						mobileNo : '89078923',
						email : 'a@b'
					} ]

					/* Setup menu */
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

				});