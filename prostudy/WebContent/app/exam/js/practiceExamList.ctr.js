angular.module("prostudyApp").controller(
		"practiceExamListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$filter, standardList) {

			$scope.count = 0;
			$scope.newSelectedExam;
			$scope.newSelectedId;
			$scope.newCount;

			$scope.count = 0;

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$log.debug("$scope.curUser.instituteID : " + $scope.curUser.instituteID);
			$scope.query = {
				order : 'description',
				limit : 5,
				page : 1
			};

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Added Exam to MyExams!').position("top").hideDelay(
						3000));
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

			
			$scope.getPracticeExamByInstitute = function() {

				var PracticeExamService = appEndpointSF
						.getPracticeExamService();
				PracticeExamService.getPracticeExamByInstitute(
						$scope.curUser.instituteID).then(
						function(practiceExamList) {
							$scope.practiceExams = practiceExamList;
							
						});
			}

			$scope.addTestToMyList = function(selectedMyExamId) {

				var practiceTest = null;
				for (var i = 0; i < $scope.practiceTest.length; i++) {
					if ($scope.practiceTest[i].examId == selectedMyExamId) {
						practiceTest = $scope.practiceTest[i];
						break;
					}
				}

				$scope.curUser.myExams.push(practiceTest);

				$scope.updateUser();

				$scope.curuser.myExams.push(practiceTest);

				$scope.updateUser();

			}

			$scope.updateUser = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.updateUser($scope.curuser).then(function(msgBean) {

					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSavedToast();
					$scope.tempUser = {};
				});

			}

			$scope.like = function(selectedMyExamId) {

				$log.debug("selectedMyExamId" + selectedMyExamId);

				for (i = 0; i < $scope.practiceTest.length; i++) {
					if ($scope.practiceTest[i].id == selectedMyExamId) {

						$scope.practiceTest[i].likes++;
						$log.debug("$scope.practiceTest[i].likes :"
								+ $scope.practiceTest[i].likes);
						$scope.newCount = $scope.practiceTest[i].likes;
						$scope.newSelectedExam = $scope.practiceTest[i];
						
						break;
					}

				}

				$scope.updateLikeCount()
			}

			$scope.updateLikeCount = function() {
				var PracticeExamService = appEndpointSF
						.getPracticeExamService();
				PracticeExamService.likeCount($scope.newSelectedExam).then(
						function(msgBean) {
							$log.debug("$scope.newSelectedExam :"
									+ angular.toJson($scope.newSelectedExam));

							$log.debug("msgBean.msg:" + msgBean.msg);

						});

			}

			$scope.dislike = function(selectedMyExamId) {

				$log.debug("selectedMyExamId" + selectedMyExamId);

				for (i = 0; i < $scope.practiceTest.length; i++) {
					if ($scope.practiceTest[i].id == selectedMyExamId) {

						$scope.practiceTest[i].dislikes++;
						$log.debug("$scope.practiceTest[i].dislikes :"
								+ $scope.practiceTest[i].dislikes);

						$scope.newSelectedId = $scope.practiceTest[i];
						break;
					}

				}

				$scope.updateDislikeCount()
			}

			$scope.updateDislikeCount = function() {
				var PracticeExamService = appEndpointSF
						.getPracticeExamService();
				PracticeExamService.likeCount($scope.newSelectedId).then(
						function(msgBean) {
							$log.debug("$scope.newSelectedId :"
									+ angular.toJson($scope.newSelectedId));

							$log.debug("msgBean.msg:" + msgBean.msg);

						});

			}

			$scope.getPracticeExamByInstitute();
			

		});