/*function init() {
	console.log("###Inside init###");
	window.initGAPI(); // Calls the init function defined on the window

}*/

var app = angular.module("dropDownApp", ['ngMaterial']);

app.controller("dropDownCtr",['$scope',
                              
						function($scope) 
						{
							console.log("Inside dropDownCtr");


							$scope.states = [
							                   "Maharashtra",
							                   "Karnatak",
							                   "Gujaraat"
                                                ];
							   
							 $scope.city = [["kolhapur","Sangli","Pune"],
							                ["Banglore","Hedrabad","Nipani"],
							                ["Alahabad","Varanasi","Sabarmati"]];
                                                           
							            
							 $scope.selectedState="";
											 //   $scope.options1 =  $scope.states;
											    $scope.selectedCity = []; // we'll get these later
											    
											    $scope.getCityList = function(){
											    	 console.log("Selected State:"+  $scope.selectedState );
											    	 $scope.key = $scope.states.indexOf($scope.selectedState);
											    	 console.log("Key"+ $scope.key);
											    	// $scope.myNewOptions =  $scope.city[ $scope.key ];
											        $scope.selectedCity =  $scope.city[$scope.key];
											        console.log("Selected cities:"+  $scope.selectedCity );
											    };
							      }]);
