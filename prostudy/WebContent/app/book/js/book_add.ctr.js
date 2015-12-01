angular.module("prostudyApp").controller(
		"bookAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q,tableTestDataFactory,$state,appEndpointSF,$sce) 
		{

			console.log("Inside bookAddCtr");
					  
			$scope.tempBook = {  bookid: "",book_name : "",author: "", board: "", 
					             standard:"",chapters:[] 
			                  };//end of tempBook object
			
			
			$scope.showSavedToast = function() 
			{
				$mdToast.show($mdToast.simple().content('Book Saved!')
						.position("top").hideDelay(3000));
			};//end of showSavedToast
			
			$scope.addBook = function()
			{
				$log.debug("No1");	
				var BookService = appEndpointSF.getBookService();
										
				BookService.addBook($scope.tempBook)
				.then(function(msgBean) {
							$log.debug("No6");	
							$log.debug("Inside Ctr addBook");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
						
							$log.debug("addBook"+ $scope.tempBook);
						});
				$log.debug("No4");	
			}//end of addBook
			
	
	//Here we calling getChapters service because $scope.tempBook object contain chapters[] object
		
			$scope.chapters=[];
			$scope.getChapters = function() 
			{
				

				var ChapterService = appEndpointSF.getChapterService();

				ChapterService.getChapters().then(
						function(chapterList) {
							$log.debug("Inside Ctr getChapters");

							$scope.chapters = chapterList;
							
							$log.debug("getChapters :"+$scope.chapters);
							
							
							$scope.chapters.chapter_content = $sce.trustAsHtml($scope.chapters.chapter_content);
							$log.debug("$scope.chapters.chapter_content: " + $scope.chapters.chapter_content);
							
					
						/*	$scope.availableChapters = $scope.chapters;*/
							
							
							/*$scope.tempBook.chapters.push($scope.chapters);*/
							$log.debug("$scope.getChapters.chapters: " + $scope.chapters);
							
							
						});
				
				
			}// end of getChapters
			
			
		  
			$scope.selectedChapters = []; 
			

			$scope.tempBook.chapters.push($scope.selectedChapters);
				
			
 		      
			 $scope.moveItem = function(item, from, to) 
				  {

				        console.log('Move item   Item: '+item+' From:: '+from+' To:: '+to);
				        //Here from is returned as blank and to as undefined

				        var idx=from.indexOf(item);
				        if (idx != -1) {
				            from.splice(idx, 1);
				            to.push(item);      
				        }
				    };//end of moveItem
				    
			$scope.moveAll = function(from, to) 
				    {

				        console.log('Move all  From:: '+from+' To:: '+to);
				        //Here from is returned as blank and to as undefined

				        angular.forEach(from, function(item) {
				            to.push(item);
				        });
				        from.length = 0;
				    };//end of moveAll                

				   
	
			
			$scope.cancelButton = function()
			{
				//$log.debug("inside cancelButton");
				$state.go('^', {});
			};//end of cancelButton
			
			
			$scope.getChapters();
			

		});// end of bookAddCtr 

