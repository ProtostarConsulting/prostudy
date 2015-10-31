angular.module("prostudyApp").controller(
		"chapterAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q,tableTestDataFactory,$state,appEndpointSF) 
		{

			console.log("Inside chapterAddCtr");
					  
			$scope.tempChapter = {id: "", chapter_content: "", board:"", student_class:"",subject:"",chapter_no:""};
			$scope.chapters = []; 
			
			$scope.addChapter = function()
			{
				$log.debug("No1");	
				var ChapterService = appEndpointSF.getChapterService();
										
				ChapterService.addChapter($scope.tempChapter)
				.then(function(msgBean) {
							$log.debug("No6");	
							$log.debug("Inside Ctr addChapter");
							$log.debug("msgBean.msg:" + msgBean.msg);
							
							$scope.tempChapter = {id: "", chapter_content: "", board:"", student_class:"",subject:"",chapter_no:""};
							$log.debug("addChapter"+ $scope.tempChapter);
						});
				$log.debug("No4");	
			}//end of addChapter
			
			
			$scope.cancelButton = function()
			{
				//$log.debug("inside cancelButton");
				$state.go('^', {});
			};//end of cancelButton
			
			

		});// end of chapterAddCtr 

