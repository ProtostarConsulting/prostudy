angular.module("stockApp").controller(
		"hrCtr.emplist_to_ganeratesalslip",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {
			
			
			$scope.printempidsalslip = $stateParams.printempidsalslip;

			$scope.emp = {
					empid : "",
					empName : "",
					email : "",
					compemail : "",
					empAddress : ""
				};

				$scope.salstruct = {
					empid : "",
					empName : "",
					grosssal : "",
					monthly : "",
					Byearly : "",
					bmonthly : "",
					HRAyearly : "",
					HRAmonthly : "",
					CCAyearly : "",
					CCAmonthly : "",
					EC12Byearly : "",
					Convyearly : "",
					Convmonthly : "",
					SAyearly : "",
					grandtotal : "",
					SAmonthly : "",
					bgrandtotal : "",
					ptaxyearly : "",
					pf1 : 0,
					pf2 : 0,
					Ptaxgrandtotal : "",
					Netsalgrandtotalmonthly : "",
					Netsalgrandtotal : "",
					addprobonus : "",
					CTC : "",
					MCTC : ""
				};
				
				$scope.salslip = {
						ganeratedcode : "",
						salslip_id : "",
						// empdetail : $scope.emp,
						salarystruct : $scope.salstruct,
						month : "-",
						generateddate : "-",
						bank_name : "-",
						acno : "-"
					};

			
			
			var date = new Date();
			var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
					"Aug", "Sep", "Oct", "Nov", "Dec" ];

			$scope.getAllempsSalStruct = function() {
				$log.debug("Inside Ctr $scope.getAllempsSalStruct");
				var hrService = appEndpointSF.gethrService();

				hrService.getAllempsSalStruct().then(
						function(empSalstructList) {
							$log.debug("Inside Ctr getAllemps");
							$scope.empSalStruct = empSalstructList;

						});
			}
			$scope.empSalStruct = [];
			$scope.getAllempsSalStruct();

			$scope.getlastmonth = function() {

				for (var i = 0; i < 3; i++) {
					$scope.months.push(monthNames[date.getMonth()] + ' '
							+ date.getFullYear());

					// Subtract a month each time
					date.setMonth(date.getMonth() - 1);
				}
			}

			$scope.months = [];
			$scope.getlastmonth();
			
			
			$scope.ganeratesalslip = function() {
				$scope.printganeratesalslip();
				var hrService = appEndpointSF.gethrService();

				for (i = 0; i < $scope.selected.length; i++) {
					hrService
							.getstructByID($scope.selected[i].empid)
							.then(
									function(structlist) {
										$scope.selectedSalSlip = structlist;
										// --------insert element in
										// salslip database

										$scope.salslip.salarystruct = $scope.selectedSalSlip[0];

										hrService
												.addgsalslip($scope.salslip);

										// ----------

									});

				}

			}
			$scope.selectedSalSlip = [];

			$scope.printganeratesalslip = function() {
				var hrService = appEndpointSF.gethrService();
				hrService
						.countOfRecordsiInganeratedslip()
						.then(
								function(printSalSelectedSlipList) {
									$scope.printGSalStruct = printSalSelectedSlipList;

									$scope.salslip.ganeratedcode = $scope.printGSalStruct.length + 100;
									$scope.salslip.month = $scope.selectmonth;

								});
			}
			$scope.printGSalStruct = [];
			$scope.printganeratesalslip();
			
			$scope.displyOnlySelected = function(abc) {
				
				
				var hrService = appEndpointSF.gethrService();
				$scope.currmonth = "" + monthNames[date.getMonth()]	+ ' ' + date.getFullYear();
				
				$log.debug("*******************" + $scope.currmonth);
				if (typeof abc != 'undefined') {
					$scope.currmonth = abc;
					$log.debug("*******************" + abc);
				}

				hrService
						.displyOnlySelected($scope.currmonth)
						.then(
								function(getDisplyOnlySelected) {
									$scope.displyselected = getDisplyOnlySelected;
									$log.debug("$scope.displyselected=========="+ angular.toJson($scope.displyselected));
								});
			}
			$scope.displyselected = [];
			$scope.displyOnlySelected();
			
			
			
			
			$scope.printSalSlipDiv = function(salSlipDiv) {
				// window.frames["print_frame"].document.body.innerHTML
				// = printDivCSS
				// + document.getElementById(divId).innerHTML;
				window.frames["print_frame"].document.body.innerHTML = document
						.getElementById(salSlipDiv).innerHTML;
				window.frames["print_frame"].window.focus();
				window.frames["print_frame"].window.print();
			}

			
			
			$scope.printslip = function() {
				var hrService = appEndpointSF.gethrService();

				hrService
						.printslip($scope.printempidsalslip)
						.then(
								function(getslip) {
									$scope.printslectedslip = getslip;
									$log
											.debug("$scope.printslectedslip=========="
													+ $scope.printslectedslip);
								});
			}
			$scope.printslectedslip = [];
			$scope.printslip();


		});
