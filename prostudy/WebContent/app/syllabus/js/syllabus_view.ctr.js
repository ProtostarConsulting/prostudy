angular.module("prostudyApp").controller(
		"syllabusViewCtr",function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,	$log, $q, tableTestDataFactory, $state, appEndpointSF, $filter,
				$log) {
	
			$scope.syllabus = [];
			$scope.syllabus1 = {};
			$scope.syllabus2 = {};
			$scope.syllabus3 = {};
			
			
			$scope.getSyllabus = function() {
				var SyllabusService = appEndpointSF.getSyllabusService();

				SyllabusService.getSyllabus().then(function(syllabusList) {
					$log.debug("Inside Ctr getSyllabus");
					$scope.syllabus = syllabusList;
				});
			}
			if(appEndpointSF.is_service_ready){
			       $scope.getSyllabus();
			      }
			      else{       
			       $timeout(function() {
			        $scope.getSyllabus();
			       }, 4000);
			      }
			
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

	
				});
