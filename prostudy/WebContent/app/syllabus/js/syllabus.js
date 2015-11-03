angular.module("prostudyApp").controller(
		"syllabusCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF, $filter,
				$log) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Syllabus Saved!')
						.position("top").hideDelay(3000));
			};
			/*
			 * $scope.addSyllabus = function() {
			 * $state.go("syllabus.addsyllabus", {}); }
			 */
			$scope.syllabus = "";

			$scope.tempSyllabus = {
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
							$scope.tempSyllabus = {
								board : "",
								standard : "",
								subject : "",
								chapterName : "",
								chapterContent : ""
							};
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
			//Function for getting Board depending on selection of board
			$scope.getBoard = function(board) {
				var bb = [];
				for (var i = 0; i < $scope.syllabus.length; i++) {
					if (board == $scope.syllabus[i].board)
						bb.push($scope.syllabus[i].standard);

				}
				$scope.stdsList = bb;
				$log.debug("stdsList Value:" + $scope.stdsList);
				// $log.debug(bb);

			};
			//Function for getting Standard depending on selection of board
			$scope.getStandard = function(board, standard) {

				console.log(board, standard);
				var bb = [];
				for (var i = 0; i < $scope.syllabus.length; i++) {
					if (board == $scope.syllabus[i].board
							&& standard == $scope.syllabus[i].standard)
						bb.push($scope.syllabus[i].subject);

				}
				$scope.subList = bb;
				$log.debug(" subList Value:" + $scope.subList);
				// $log.debug(bb);

			};
			//Function for getting Subject depending on selection of board, standard
			$scope.getSubject = function(board, standard, subject) {

				console.log(board, standard, subject);
				var bb = [];
				for (var i = 0; i < $scope.syllabus.length; i++) {
					if (board == $scope.syllabus[i].board
							&& standard == $scope.syllabus[i].standard
							&& subject == $scope.syllabus[i].subject)
						bb.push($scope.syllabus[i].chapterName);

				}
				$log.debug(bb);
				$scope.chapterList = bb;
				$log.debug("chapterList Value:" + $scope.chapterList);

			};
			
			//Function for getting chapter depending on selection of board, standard, subject
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
				$scope.chapterContentList = bb;
				$log.debug("ContentList Value:"+ $scope.chapterContentList);

			};

		});
