function init() {
	 alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

var app = angular.module("myapp", [ "xeditable", "ui.bootstrap", "datatables"]);

app.service('shareDataService', function() {
	  var myList = [];

	  var addList = function(newObj) {
	      myList.push(newObj);
	  }

	  var getList = function(){
	      return myList;
	  }

	  return {
	    addList: addList,
	    getList: getList
	  };
})
	
app.controller("editableController", [ '$scope', '$window','shareDataService',
		function($scope, $window, shareDataService)

		{
    //console.log(dataService);
				$scope.loadCustomerList = function() {
					//console.log(dataService);
					//console.log("loadCustomerList");
					gapi.client.customerservice.getAllCustomers().execute(
							function(resp) {
								
							
								$scope.someData=[{
							        "id": 860,
							        "firstName": "Superman",
							        "lastName": "Yoda"
							    }, {
							        "id": 870,
							        "firstName": "Foo",
							        "lastName": "Whateveryournameis"
							    }, {
							        "id": 590,
							        "firstName": "Toto",
							        "lastName": "Titi"
							    }];
								shareDataService.addList($scope.someData);
							//	console.log(resp);
							    //console.log("1");
								//console.log(dataService.dataObj);
							});}

					$scope.msg = "Default Msg";
					$scope.testFn = function() {
				alert("Hi, dear!");

			};
			
			

			$window.initGAPI = function() {
				// $scope.$apply($scope.initgapi);
				$scope.$apply($scope.loadCustomServices);
				// alert("Inside window.initGAPI");

			};

			$scope.loadCustomServices = function() {
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

			$scope.customerList = {};
		} ]);



app.controller('AngularWayChangeDataCtrl', AngularWayChangeDataCtrl);

function AngularWayChangeDataCtrl(DTOptionsBuilder, DTColumnDefBuilder, shareDataService) {
    var vm = this;
    //vm.persons = $resource('/demo/data1.json').query();
  
    //shareDataService.addList();
    console.log("2"+shareDataService.getList());
  
    vm.persons = shareDataService.getList();
    
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];
    vm.person2Add = _buildPerson2Add(1);
    vm.addPerson = addPerson;
    vm.modifyPerson = modifyPerson;
    vm.removePerson = removePerson;

    function _buildPerson2Add(id) {
        return {
            id: id,
            firstName: 'Foo' + id,
            lastName: 'Bar' + id
        };
    }
    function addPerson() {
        vm.persons.push(angular.copy(vm.person2Add));
        vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
    }
    function modifyPerson(index) {
        vm.persons.splice(index, 1, angular.copy(vm.person2Add));
        vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
    }
    function removePerson(index) {
        vm.persons.splice(index, 1);
    }
}
