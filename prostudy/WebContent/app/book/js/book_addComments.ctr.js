angular.module("prostudyApp").controller(
		"bookCommentAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF,$stateParams,	$state) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Comment Saved!')
						.position("top").hideDelay(3000));
			};
			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();
		
			
			$scope.tempComment={
					userId:	$scope.curUser.userId,
					desc:""
			}
				$scope.addComment = function() {
				$log.debug("No1");
				var BookService = appEndpointSF.getBookService();
				
				BookService.addComment($scope.selectedBookId,$scope.tempComment).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr bookCommentAddCtr");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempComments={
									userId:"",
									desc:""
							};
						});
				$state.go("book.chapterList");
				$log.debug("No4");
			}


		});
