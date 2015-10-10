angular
		.module("prostudyApp")
		.controller(
				"instituteEditCtr",
						function($scope, $window, $mdToast, $timeout, $mdSidenav,
								$mdUtil, $log, $q, tableTestDataFactory) {
					
							
							
							$scope.loadInstituteList = function() 
							{
								console.log("inside loadInstituteList")
								$scope.institutes = [];
								$scope.selected = [];
							tableTestDataFactory.getInstituteList().then(
									function(data) {
										$scope.institutes = data;
										$log.debug("inside ctr then $scope.institutes"
												+ $scope.institutes);
										console.log("inside institute")
							});
							
							
							
							
							$scope.editingData = [];

							/*for (var i = 0, length = $scope.questions.length; i < length; i++) {
								$scope.editingData[$scope.questions[i].description] = false;
							}*/

							$scope.addInstitute = function(institute) {
								$scope.institutes.push(institute);
								$scope.institute = {};
							}// end of addQuestion

							$scope.modify = function(selectedInstitute) {
								$scope.editingData[selectedInstitute.name] = true;
								$scope.institute = selectedInstitute;
							};

							$scope.update = function(institutes) {
								$scope.editingData[institutes.name] = false;
							};// end of update

							$scope.removeInstitute = function(index) {
								$scope.institutes.splice(index, 1);
							}; // end of removeQuestion

							

							$scope.selected = [];

							$scope.query = {
								order : 'description',
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
							 
							$scope.modify1 = function(institute){

								$scope.modifyField = true;
								$scope.editingData[institute.name] = true;
							};


							$scope.update1 = function(institute){
								$scope.modifyField = false;
								$scope.editingData[institute.name] = false;
							};
						
							

						
							}//end of loadInstituteList load

							

						$scope.loadInstituteList();

						} );
