function init() {
	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular.module("amclinapp", []).controller(
		"MyController",
		[
				'$scope',
				'$window',
				function($scope, $window) {
					$scope.items = {};
					$scope.clickDiv = {};
					$scope.serMsg={};
					$scope.medicine={};
					
					$scope.medicine.id="";
					$scope.medicine.medicineName="";
					$scope.medicine.quantity="";
					$scope.medicine.baseRate="";
					$scope.medicine.rate="";				
					
					$scope.clickDiv.saveMedicine = function() {
						gapi.client.medicinestockservice.saveMedicineStock($scope.medicine
							/*{"medicineName" : $scope.mname,
							"quantity" : $scope.qty,
							"baseRate" : $scope.baserate,
							"rate" : $scope.rate}*/
						).execute(function(resp) {
							alert(resp.data);
							$scope.serMsg = resp.data;
							$("#formDiv").addClass('hidden');
							$("#actionMsgDiv").removeClass('hidden');
						});
					}					
					
					$scope.getAllMedicine = function() {
						gapi.client.medicinestockservice.getAllMedicine()
								.execute(function(resp) {
								//	 alert(resp.items[0].medicineName);
									console.log(resp.items);
									// $scope.serMsg = resp.items;
									$scope.items = resp.items;
									$scope.$apply();// This
													// is
													// required
													// for
													// data
													// changed
													// in
													// behind
													// in
													// controller
													// to be
													// applied
													// to UI
								});
					}

					$scope.seletctUser = function(i) {
						alert("Hi" + i.medicineName);
						$scope.medicine = i;
					}
					
					$scope.clickDiv.addMedicine = function() {
						$scope.medicine.medicineName = "";
						$scope.medicine.quantity = "";
						$scope.medicine.baseRate = "";
						$scope.medicine.rate = "";
						
						$("#formDiv").removeClass('hidden');
						$("#actionMsgDiv").addClass('hidden');
						
						$scope.getAllMedicine();
					}

					$scope.clickDiv.cancelBtn = function() {
						document.location = '/index.html';
					}
				
					// New code in ctler

					$window.initGAPI = function() {
						// $scope.$apply($scope.initgapi);
						$scope.$apply($scope.loadCustomServices);
					//	alert("Inside window.initGAPI");

					};

					$scope.loadCustomServices = function() {
					//	alert("Inside loadCustomServices");

						var apiRoot = '//' + window.location.host + '/_ah/api';
						// Loads the OAuth and helloworld APIs
						// asynchronously, and
						// triggers login
						// when they have completed.
						var apisToLoad;

						apisToLoad = 1; // must match number of calls to

						gapi.client.load('medicinestockservice', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getAllMedicine();
						}, apiRoot);

					};

				} ]);
