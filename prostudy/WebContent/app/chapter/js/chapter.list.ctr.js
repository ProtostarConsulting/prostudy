angular.module("prostudyApp")
		.controller(
				"chapterListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log) {
					console.log("Inside chapterListCtr");
					// console.log("Via Serice:" +
					// customerservice.addCustomer());
					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'chapterList Saved!').position("top").hideDelay(
								3000));
					};

					$scope.getCustomerList = function() {
						console.log("getCustomerList");

					};

					
	
					/* Setup menu */
					$scope.toggleRight = buildToggler('rightListPage');
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