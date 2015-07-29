function init() {
	console.log("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

app = angular.module("stockApp", ['ngMaterial', 'ngMessages']);



app.controller("stockCtr", [
		'$scope',
		'$window',
		function($scope, $window) {
			$scope.addStock = function() {
				return {
					id : '',
					sr_No : '',
					item_Name : '',
					categories : '',
					qty : '',
					price : '',
					notes : '',
					
					}
				};
			
				
				$scope.addStockServices = function() {
					console.log("in side addStockServices");
					gapi.client.stockServices.addStockServices($scope.addStock)
							.execute(function(resp) {
								console.log("Add Stock Response: " + resp.msg);
								

							})
				};// end of addStockServices

			$scope.loadGetStockList = function() {
				console.log("In loadGetStockList");
				gapi.client.stockServices.getAllStockServices().execute(
						function(resp) {
							console.log(resp);
						
							$scope.items=resp.items;
							$scope.$apply();
						});
				
				//$("#taxForm").hide();
				//$("#tableTax").show();
			};// end of GetStockList
			
			/*$scope.taxDetails = function()
			{
				console.log("Inside Tax details");
				
				$("#taxForm").hide();
				$("#tableTax").show();
		
				
				
			};//end of taxDetails
			
			$scope.addNewTax = function()
			{
				console.log("Inside addNewTax");
				$scope.addTax.code_Name = "";
				$scope.addTax.tax_Rate = "";
				
				$("#taxForm").show();
				$("#tableTax").hide();
				$("#actionMsgDivR").hide();
				$("#actionMsgDivU").hide();
				
				
			};//end of addNewTax
*/			
			

		
			$window.initGAPI = function() {
				console.log("Came to initGAPI");
				$scope.$apply($scope.loadCustomService);
			
			};

			$scope.loadCustomService = function() {
				console.log("Inside window.loadCustomServices");
				var apiRoot = '//' + window.location.host + '/_ah/api';

				// Loads the OAuth and helloworld APIs
				// asynchronously, and
				// triggers login
				// when they have completed.
				var apisToLoad;

				apisToLoad = 1; // must match number of calls to
				// gapi.client.load()

				gapi.client.load('stockServices', 'v0.1', function() {
					console.log("Inside gapi.client.load");
					$scope.is_backend_ready = true;
					$scope.loadGetStockList();

				}, apiRoot);

			};
} ]);





app.controller('AngularWayChangeDataCtrl', AngularWayChangeDataCtrl, [ "xeditable", "ui.bootstrap", "datatables"]);

function AngularWayChangeDataCtrl(DTOptionsBuilder, DTColumnDefBuilder) {
	
	app.run(function(editableOptions, editableThemes) {
		editableThemes.bs3.inputClass = 'input-sm';
		editableThemes.bs3.buttonsClass = 'btn-sm';
		editableOptions.theme = 'bs3';
	});
    var vm = this;
    //vm.persons = $resource('/demo/data1.json').query();
    
    vm.stocks =[{
        "id": 860,
        "sr_No": "11",
        "item_Name": "Superman",
        "categories": "Superman",
        "qty": "11",
        "price": "11",
        "notes": "Superman"
        
    }, {
        "id": 870,
        "sr_No": "12",
        "item_Name": "foo",
        "categories": "foo",
        "qty": "12",
        "price": "12",
        "notes": "foo"
    }, {
        "id": 590,
        "sr_No": "13",
        "item_Name": "too",
        "categories": "too",
        "qty": "13",
        "price": "13",
        "notes": "foo"
    }];
    
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];
    vm.stock2Add = _buildStock2Add(1);
    vm.addStocked = addStocked;
    vm.modifyStock = modifyStock;
    vm.removeStock = removeStock;

    function _buildStock2Add(id) {
        return {
            id: id,
            sr_No: '25' + id,
            item_Name: 'Bar' + id,
            categories: 'car' + id,
            qty: '50' + id,
            price: '100' + id,
            notes: 'ABC' + id
            
        };
    }
    function addStocked() {
        vm.stocks.push(angular.copy(vm.stock2Add));
        vm.stock2Add = _buildStock2Add(vm.stock2Add.id + 1);
    }
    function modifyStock(index) {
        vm.stocks.splice(index, 1, angular.copy(vm.stock2Add));
        vm.stock2Add = _buildStock2Add(vm.stock2Add.id + 1);
    }
    function removeStock(index) {
        vm.stocks.splice(index, 1);
    }
}

