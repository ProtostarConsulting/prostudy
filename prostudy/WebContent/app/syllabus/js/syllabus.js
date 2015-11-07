angular.module("prostudyApp").controller(
		"syllabusCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF, $filter,
				$log) {
			$scope.isShowTable = true;
			$scope.isShowRecord = false;
			
			//$scope.isUpdated=false;
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Syllabus Saved!')
						.position("top").hideDelay(3000));
			};
			$scope.syllabus = "";
			//$scope.uniqueid = 0;
			$scope.selected = [];

			$scope.query = {
				order : 'name',
				limit : 5,
				page : 1
			};

			$scope.onpagechange = function(page, limit) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};

			$scope.onorderchange = function(order) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};
			/* Setup menu */
			$scope.toggleRight = buildToggler('rightListPage');
			/**
			 * Build handler to open/close a SideNav; when animation finishes
			 * report completion in console
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
			}

			$scope.tempSyllabus = {
				syllabusId:"",
				board : "",
				standard : "",
				subject : "",
				chapterName : "",
				chapterContent : ""
			};
			$scope.syllabus = [];
			$scope.syllabus1 = {};
			$scope.syllabus2 = {};
			$scope.syllabus3 = {};
			
			$scope.addSyllabus = function() {
				$log.debug("No1");
				var SyllabusService = appEndpointSF.getSyllabusService();
				
				SyllabusService.addSyllabus($scope.tempSyllabus).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addSyllabus");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();

					});
				$log.debug("No4");
				
			}

			$scope.getSyllabus = function() {
				var SyllabusService = appEndpointSF.getSyllabusService();

				SyllabusService.getSyllabus().then(function(syllabusList) {
					$log.debug("Inside Ctr getSyllabus");
					$scope.syllabus = syllabusList;
				});
			}
			
			$scope.getSyllabus();
			// Function for getting Board depending on selection of board
			$scope.getBoard = function(board) {
				var bb = [];
				for (var i = 0; i < $scope.syllabus.length; i++) {
					if (board == $scope.syllabus[i].board)
						bb.push($scope.syllabus[i].standard);

				}
				$scope.standardsList = bb.filter(onlyUnique); // returns Unique
															// Standards
				$log.debug(" standardsList Value:" + $scope.standardsList);
			};
			// function for finding unique elements from array
			function onlyUnique(value, index, self) {
				return self.indexOf(value) === index;
			}
	
			
			// Function for getting Standard depending on selection of board
			$scope.getStandard = function(board, standard) {

				var bb = [];
				for (var i = 0; i < $scope.syllabus.length; i++) {
					if (board == $scope.syllabus[i].board
							&& standard == $scope.syllabus[i].standard)
						bb.push($scope.syllabus[i].subject);

				}

				$scope.subjectList = bb.filter(onlyUnique); // returns Unique
														// Subject
				$log.debug(" subjectList Value:" + $scope.subjectList);
				
				
				

			};
			// Function for getting Subject depending on selection of board,
			// standard
			$scope.getSubject = function(board, standard, subject) {
				// $log.debug(board, standard, subject);
				var bb = [];
				for (var i = 0; i < $scope.syllabus.length; i++) {
					if (board == $scope.syllabus[i].board
							&& standard == $scope.syllabus[i].standard
							&& subject == $scope.syllabus[i].subject)
						bb.push($scope.syllabus[i].chapterName);

				}
				$scope.chapterList = bb.filter( onlyUnique ); // returns Unique Chapters
				$log.debug(" chapterList Value:" + $scope.chapterList);
				

			};

			// Function for getting chapter depending on selection of board,
			// standard, subject
			$scope.getChapter = function(board, standard, subject, chapter) {
				console.log(board, standard, subject, chapter);
				var bb = [];
				for (var i = 0; i < $scope.syllabus.length; i++) {
					if (board == $scope.syllabus[i].board
							&& standard == $scope.syllabus[i].standard
							&& subject == $scope.syllabus[i].subject
							&& chapter == $scope.syllabus[i].chapterName)
						bb.push($scope.syllabus[i].chapterContent);

				}
				$scope.chapterContentList = bb.filter( onlyUnique ); // returns Unique Standards
				$log.debug(" chapterContentList Value:"
						+ $scope.chapterContentList);
				
			};

			// $scope.editRecord = create copy of selected[0];
			$scope.editSyllabus = function() {
				$scope.editRecord = angular.copy($scope.selected[0]);
				$scope.isShowTable = false;
				$scope.isShowRecord = true;

			}
			$scope.cancel = function() {

				$scope.isShowTable = true;
				$scope.isShowRecord = false;

			}
			
			/*
			$scope.update = function() {
				for (var i = 0; i < $scope.syllabus.length; i++) {

					if ($scope.syllabus[i].board == $scope.editRecord.board) {
						$scope.syllabus[i] = $scope.editRecord;
						//$scope.sel = $scope.editRecord;
						break;
					}
				}$scope.isShowTable = true;
				$scope.isShowRecord = false;
				
				
				
				//$log.debug(" $scope.editRecord Value:"	+$scope.editRecord.subject);
			}*/
			
			$scope.update = function() {
				var SyllabusService = appEndpointSF.getSyllabusService();
				
				SyllabusService.updateSyllabus($scope.editRecord).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr updateSyllabus");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
					});
				$log.debug("Select Syllabus updated");
				
				$log.debug("updated value"+$scope.syllabus.standard);
				$scope.isShowTable = true;
				$scope.isShowRecord = false;
				
			}
				});
