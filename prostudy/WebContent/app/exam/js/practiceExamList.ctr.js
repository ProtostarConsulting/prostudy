angular.module("prostudyApp").controller(
		"practiceExamListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$filter) {

			$scope.count = 0;

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			
			
			$log.debug("$scope.curUser***** : "
					+ angular.toJson($scope.curUser));
			$log.debug("$scope.curUser.instituteID : "
					+ $scope.curUser.instituteID);
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
			$scope.getPracticeExamByInstitute();
			
			$scope.isContainsTest = function(practiceTest) { 
				if (typeof $scope.curUser.myExams === 'undefined'){
					$scope.curUser.myExams = [];}
				else{
				for (var i = 0; i < $scope.curUser.myExams.length; i++) {
				  if (angular.equals($scope.curUser.myExams[i],practiceTest)) { return true; } }
				}
				   return false; 
				   };
				
			
			
			$scope.addTestToMyList = function(selectedMyExamId) {

				var practiceTest = null;

				for (var i = 0; i < $scope.practiceTest.length; i++) {
					if ($scope.practiceTest[i].id == selectedMyExamId) {
						practiceTest = $scope.practiceTest[i];
						break;
					}
				}

				if (typeof $scope.curUser.myExams === 'undefined')
					$scope.curUser.myExams = [];

				$scope.curUser.myExams.push(practiceTest);

				$scope.updateUser();
			}

			$scope.updateUser = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.updateUser($scope.curUser).then(function(msgBean) {

					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSavedToast();

				});

			}
			/*
			 * $scope.like = function(selectedMyExamId) {
			 * $log.debug("selectedMyExamId" + selectedMyExamId); for (i = 0; i <
			 * $scope.practiceTest.length; i++) { if ($scope.practiceTest[i].id ==
			 * selectedMyExamId) { $scope.practiceTest[i].likes++;
			 * $log.debug("$scope.practiceTest[i].likes :" +
			 * $scope.practiceTest[i].likes); $scope.newExam =
			 * $scope.practiceTest[i]; break; } } $scope.updateLikeCount(); }
			 * 
			 * $scope.updateLikeCount = function() { var PracticeExamService =
			 * appEndpointSF .getPracticeExamService();
			 * PracticeExamService.likeCount($scope.newExam).then(
			 * function(msgBean) { $log.debug("msgBean.msg:" + msgBean.msg); }); }
			 * 
			 * $scope.dislike = function(selectedMyExamId) {
			 * 
			 * $log.debug("selectedMyExamId" + selectedMyExamId);
			 * 
			 * for (i = 0; i < $scope.practiceTest.length; i++) { if
			 * ($scope.practiceTest[i].id == selectedMyExamId) {
			 * $scope.practiceTest[i].dislikes++; $scope.newTest =
			 * $scope.practiceTest[i]; break; } } $scope.updateDislikeCount() }
			 * 
			 * $scope.updateDislikeCount = function() { var PracticeExamService =
			 * appEndpointSF .getPracticeExamService();
			 * PracticeExamService.likeCount($scope.newTest).then(
			 * function(msgBean) { $log.debug("msgBean.msg:" + msgBean.msg); }); }
			 * 
			 */
			$scope.like = function(selectedMyExamId) {

				for (i = 0; i < $scope.practiceExams.length; i++) {
					if ($scope.practiceExams[i].id == selectedMyExamId) {
						$scope.practiceExams[i].likes++;
						$scope.newTest = $scope.practiceExams[i];
						break;
					}
				}
				$scope.updateLikeCount()
			}

			$scope.updateLikeCount = function() {
				var PracticeExamService = appEndpointSF
						.getPracticeExamService();
				PracticeExamService.likeCount($scope.newTest).then(
						function(msgBean) {
							$log.debug("msgBean.msg:" + msgBean.msg);
						});
			}

			$scope.dislike = function(selectedMyExamId) {

				for (i = 0; i < $scope.practiceExams.length; i++) {
					if ($scope.practiceExams[i].id == selectedMyExamId) {

						$scope.practiceExams[i].dislikes++;
						$scope.newTest = $scope.practiceExams[i];
						break;
					}
				}
				$scope.updateDislikeCount()
			}

			$scope.updateDislikeCount = function() {
				var PracticeExamService = appEndpointSF
						.getPracticeExamService();
				PracticeExamService.dislikeCount($scope.newTest).then(
						function(msgBean) {
							$log.debug("msgBean.msg:" + msgBean.msg);

						});

			}

		});