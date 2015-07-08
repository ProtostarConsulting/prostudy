function init() {
	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window
}

angular.module("myapp", []).controller(
		"MyController",
		[
				'$scope',
				'$window',
				function($scope, $window) {

					$scope.serMsg = "";
					$scope.items = {};
					$scope.addSubmit = {};
					$scope.addStock = {};
					$scope.addStock.id = "";
					$scope.addStock.sr_No = "";
					$scope.addStock.item_Name = "";
					$scope.addStock.categories = "";
					$scope.addStock.qty = "";
					$scope.addStock.price = "";
					$scope.addStock.notes = "";

					$scope.addSubmit.addStockServices = function() {
						
						$scope.addStock.id = document.getElementById("id").value;
						$scope.addStock.sr_No = document.getElementById("sr_No").value;
						$scope.addStock.item_Name = document.getElementById("item_Name").value;;
						$scope.addStock.categories = document.getElementById("categories").value;;
						$scope.addStock.qty =  document.getElementById("qty").value;;
						$scope.addStock.price =  document.getElementById("price").value;;
						$scope.addStock.notes =  document.getElementById("notes").value;;
						
						gapi.client.stockServices.addStockServices($scope.addStock).execute(function(resp) 
							{
							
							alert(resp.token);
							if(resp.token=="R")
								{
								$("#actionMsgDiv").show();
								$("#actionMsgDiv1").hide();
								}
							else
								{
								$("#actionMsgDiv").hide();
								$("#actionMsgDiv1").show();
								}
							$("#form1").hide();
							$("#table").hide();
							console.log(resp.myData);
							
						});
					};
					
					
					/*$scope.updateStockServices = function(item)
					{
						$("#form1").show();
						$("#table").hide();
						$scope.addStock=item;
						alert($scope.addStock.item_Name);
					}*/

					$scope.StockDetails = function()
					{
						$("#form1").hide();
						$("#table").show();
						
					}
					
					$scope.addNewUser = function()
					{
						$scope.addStock = "";
						$("#form1").show();
						$("#table").hide();
						$("#actionMsgDiv").hide();
						$("#actionMsgDiv1").hide();
					}

					$scope.getAllStockServices = function() {
						gapi.client.stockServices.getAllStockServices().execute(function(resp) 
						{
							var table = $('#example').DataTable();	
							$('#example').dataTable().fnClearTable();
							for(var i=0;i<resp.items.length;i++)
								{
								
								 var Id = resp.items[i].id;
					    		  var sr_No = "'"+resp.items[i].sr_No+"'";
					    		  var item_Name = "'"+resp.items[i].item_Name+"'";
					    		  var categories = "'"+resp.items[i].categories+"'";
					    		  var qty = "'"+resp.items[i].qty+"'";
					    		  var price = "'"+resp.items[i].price+"'";
					    		  var notes = "'"+resp.items[i].notes+"'";
					    		  var seq = +i + +1;
								
								
							table.row.add( [seq,'<a href="#" onclick="seletctUser('+Id+','+sr_No+','+item_Name+','+categories+','+qty+','+price+','+notes+')">'+resp.items[i].sr_No+'</a>',
							                resp.items[i].item_Name,resp.items[i].categories,resp.items[i].qty,resp.items[i].price,resp.items[i].notes] ).draw();
								}
							
							console.log(resp);
							$scope.items=resp.items;
							$("#form1").hide();
							$("#table").show();
							$("#actionMsgDiv").hide();
							$("#actionMsgDiv1").hide();
							$scope.$apply();
						});

					}// end of getAllStockServices
					
				

					$window.initGAPI = function() {
						$scope.$apply($scope.loadCustomServices);
					};

					$scope.loadCustomServices = function() {
						//alert("Inside window.loadCustomServices");
						var apiRoot = '//' + window.location.host + '/_ah/api';

						// Loads the OAuth and helloworld APIs
						// asynchronously, and
						// triggers login
						// when they have completed.
						var apisToLoad;

						apisToLoad = 1; // must match number of calls to
						// gapi.client.load()

						gapi.client.load('stockServices', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getAllStockServices();
						}, apiRoot);

					};

				} ]);
