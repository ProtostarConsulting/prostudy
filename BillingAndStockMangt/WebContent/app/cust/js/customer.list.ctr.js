function init() {
	console.log("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

var app = angular.module("myapp", [ "xeditable", "ui.bootstrap", "datatables"]);

app.run(function(editableOptions, editableThemes) {
	editableThemes.bs3.inputClass = 'input-sm';
	editableThemes.bs3.buttonsClass = 'btn-sm';
	editableOptions.theme = 'bs3';
});


app
.service('customerservice', function() {
	
	$scope.loadCustomerList = function() {
		console.log("Inside loadCustomerList");
		gapi.client.customerservice.getAllCustomers().execute(
				function(resp) {
					console.log(resp);
				});
	};
  
});

app.controller("editableController", [ '$scope', '$window',
		function($scope, $window)

		{
	
			console.log("Inside editableController");
			$scope.msg = "Default Msg"

			$scope.testFn = function() {
				alert("Hi, dear!");

			};

		} ]);


app.controller('AngularWayChangeDataCtrl', [ '$scope', '$window', 'DTOptionsBuilder','DTColumnDefBuilder', AngularWayChangeDataCtrl]);

function AngularWayChangeDataCtrl($scope, $window, DTOptionsBuilder, DTColumnDefBuilder) {
	
	console.log("Inside AngularWayChangeDataCtrl");
    var vm = this;
    //vm.persons = $resource('/demo/data1.json').query();
    vm.custList = {};
    vm.persons =[{
        "mobileNo": 860,
        "firstName": "Superman2",
        "lastName": "Yoda"
    }, {
        "mobileNo": 870,
        "firstName": "Foo",
        "lastName": "Whateveryournameis"
    }, {
        "mobileNo": 590,
        "firstName": "Toto",
        "lastName": "Titi"
    }];
    
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];
    vm.person2Add = _buildPerson2Add();
    vm.modifyPerson = modifyPerson;
    vm.addPerson = addPerson;        
    vm.removePerson = removePerson;
    vm.isModify = false;

    function _buildPerson2Add() {
        return {
        	mobileNo:'',
            firstName: '',
            lastName: ''
        };
    }
     
    
    function addPerson() {
        vm.persons.push(angular.copy(vm.person2Add));
        vm.person2Add = _buildPerson2Add();
        vm.isModify =false;
        
    }
    function modifyPerson(index) {      
    	vm.person2Add = vm.persons.splice(index, 1)[0];
    	console.log(vm.person2Add);
        vm.isModify =true;       
    }
   /* function saveModifyPerson(index) {      
    	 vm.persons[index] = vm.person2Add;
    	 vm.person2Add = _buildPerson2Add();
    	 vm.isModify =false;
    }*/
    function removePerson(index) {
        vm.persons.splice(index, 1);
    }
    
    
    $scope.loadCustomerList = function() {
		console.log("Inside loadCustomerList");
		gapi.client.customerservice.getAllCustomers().execute(
				function(resp) {
					console.log(resp);
					vm.persons =resp.items;
					$scope.$apply();
				});
	};
	
	$scope.loadCustomServices = function() {
		console.log("Inside  loadCustomServices");
		var apiRoot = '//' + window.location.host + '/_ah/api';

		// Loads the OAuth and helloworld APIs
		// asynchronously, and
		// triggers login
		// when they have completed.
		var apisToLoad;

		apisToLoad = 1; // must match number of calls to
		// gapi.client.load()

		gapi.client.load('customerservice', 'v0.1', function() {
			$scope.is_backend_ready = true;
			$scope.loadCustomerList();

		}, apiRoot);

	};
	
	$window.initGAPI = function() {
		console.log("Inside initGAPI");
		// $scope.$apply($scope.initgapi);
		$scope.$apply($scope.loadCustomServices());
		// alert("Inside window.initGAPI");

	};
}
