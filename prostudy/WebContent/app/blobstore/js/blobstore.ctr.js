angular.module("prostudyApp").controller(
		"blobstoreCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF, $sce) {
			
			$scope.uploadFile = function()
			{
				alert("File Uploaded Successfully");
			}//end of uploadFile

		});// end of blobstoreCtr

