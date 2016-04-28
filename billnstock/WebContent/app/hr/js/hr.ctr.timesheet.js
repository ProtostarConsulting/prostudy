angular.module("stockApp").controller(
		"timesheet",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, $filter, appEndpointSF) {

			Date.prototype.getWeek = function() {
				var onejan = new Date(this.getFullYear(), 0, 1);
				return Math.ceil((((this - onejan) / 86400000)
						+ onejan.getDay() + 1) / 7);
			}
			
			// -------------------------------------------------------------------------------------
			var weekNumber = (new Date()).getWeek() + " "
					+ (new Date()).getFullYear();
			// -------------------------------------------------------------------------------------
		

			$scope.curdate = $filter("date")(Date.now(), 'dd-MM-yyyy')

			var curr = new Date(); // get current date
			var first = curr.getDate() - curr.getDay();

			$scope.firstdate = new Date(curr.setDate(first));

			$scope.initTimesheetEntity = function(addDay) {
				return {
					week : "",
					task : [],
					toDate : "",
					fromDate : ""

				};
			}
			$scope.TimesheetEntity = $scope.initTimesheetEntity();
			
			$scope.gettoandformDate = function(addDay) {
				var date = new Date($scope.firstdate.getTime() + addDay * 24
						* 60 * 60 * 1000);
				return date.getDate() + "/" + (date.getMonth() + 1)+"/"+date.getFullYear();
			
			}

			$scope.getDispalyDate = function(addDay) {
				var date = new Date($scope.firstdate.getTime() + addDay * 24
						* 60 * 60 * 1000);
				return date.getDate() + "/" + (date.getMonth() + 1);
				
			}

			$scope.taskROW = [ "1", "2", "3" ];
			$scope.taskType = [ "Software Development", "Testing", "lerning" ];

			$scope.addItem = function() {
				$scope.item = {
						
					tid : "",
					taskname : "",
					monday : 0,
					tuesday : 0,
					wenesday : 0,
					thesday : 0,
					friday : 0,
					saturday : 0,
					sunday : 0,
				};

				$scope.TimesheetEntity.task.push($scope.item);
				$scope.calTotal();
			};

			$scope.addtimesheet = function(val) {
				var hrService = appEndpointSF.gethrService();
				var weekNumber = (new Date()).getWeek() + " "
						+ (new Date()).getFullYear();
				$scope.TimesheetEntity.week = weekNumber;
				
				$scope.TimesheetEntity.fromDate = $scope.gettoandformDate(0);
				$scope.TimesheetEntity.toDate = $scope.gettoandformDate(6);
				hrService.addtimesheet($scope.TimesheetEntity).then(
						function(msgBean) {
							$scope.showAddToast();

						});
			}

			$scope.removeItem = function(index) {
				$scope.TimesheetEntity.task.splice(index, 1);
				$scope.calTotal();
			};

			$scope.calTotal = function() {
				$scope.sum = 0;
				$scope.sum1 = 0;
				$scope.sum2 = 0;
				$scope.sum3 = 0;
				$scope.sum4 = 0;
				$scope.sum5 = 0;
				$scope.sum6 = 0;
				for (var i = 0; i < $scope.TimesheetEntity.task.length; i++) {

					var line = $scope.TimesheetEntity.task[i];
					$scope.sum += Number(line.monday);
					$scope.mondaytotal = $scope.sum;

					$scope.sum1 += Number(line.tuesday);
					$scope.tuesdaytotal = $scope.sum1;

					$scope.sum2 += Number(line.wenesday);
					$scope.wenesdaytotal = $scope.sum2;

					$scope.sum3 += Number(line.thesday);
					$scope.thesdaytotal = $scope.sum3;

					$scope.sum4 += Number(line.friday);
					$scope.fridaytotal = $scope.sum4;

					$scope.sum5 += Number(line.saturday);
					$scope.saturdaytotal = $scope.sum5;

					$scope.sum6 += Number(line.sunday);
					$scope.sundaytotal = $scope.sum6;

					$scope.finaltotal = $scope.mondaytotal
							+ $scope.tuesdaytotal + $scope.wenesdaytotal
							+ $scope.thesdaytotal + $scope.fridaytotal
							+ $scope.saturdaytotal + $scope.sundaytotal

					$scope.TimesheetEntity.task[i].total = Number(line.monday)
							+ Number(line.tuesday) + Number(line.wenesday)
							+ Number(line.thesday) + Number(line.friday)
							+ Number(line.saturday) + Number(line.sunday);

				}

			}

	
			$scope.getcurweekdata = function(weekno) {
				$scope.TimesheetEntity = $scope.initTimesheetEntity();
				var hrService = appEndpointSF.gethrService();
				if (typeof weekno != 'undefined') {
					weekNumber = weekno;
				}
				hrService.getcurweekdata(weekNumber).then(function(weekdata) {

					$scope.weekdatas = weekdata.result;
					if (typeof $scope.weekdatas.task != 'undefined') {
						$scope.TimesheetEntity = $scope.weekdatas;
					} else {
						$scope.addItem();
						$scope.addItem();
					}

				});
				$scope.calTotal();
			}

			$scope.weekdatas = [];
			$scope.getcurweekdata();

			$scope.nextWeek = function() {
				var week = (Number(weekNumber.substring(0, 1)) + 1) + " "
						+ (new Date()).getFullYear();
				$scope.getcurweekdata(week);
				
				$scope.firstdate = new Date($scope.firstdate.getTime() + 7 * 24
						* 60 * 60 * 1000);
				$scope.calTotal();
			}

			$scope.prevWeek = function() {
				var week = (Number(weekNumber.substring(0, 1)) - 1) + " "
						+ (new Date()).getFullYear();
				$scope.getcurweekdata(week);
				$scope.firstdate = new Date($scope.firstdate.getTime() - 7 * 24
						* 60 * 60 * 1000);
				$scope.calTotal();
			}

			// -------------------------------------------------------------------------------------------------
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
