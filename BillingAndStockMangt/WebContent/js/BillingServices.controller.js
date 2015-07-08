function init() {
	//alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window
}

angular.module("bill", []).controller(
		"billController",
		[
				'$scope',
				'$window',
				function($scope, $window) {
					
					$scope.main={};
					$scope.main.allCustomer={};
					$scope.main.allItems={};
					//$scope.main.selectedItems="";
					$scope.main.selectedCustomer="";
					
					
					$scope.bill={};
					$scope.bill.rate="";
					$scope.bill.rate1=[];
					$scope.bill.qty="";
					$scope.bill.qty1=[];
					$scope.bill.total="";
					$scope.bill.grandtotal="0.00";
					$scope.items=[];
					$scope.i= 1;
					
					$scope.getallfetchbills = function()
					{
						 gapi.client.billingServices.getallfetchbills().execute(function(resp) 
									{
							 console.log(resp);
					})
					}
					
					
					$scope.getCustomerServices = function () {
						
						 gapi.client.customerServices.getCustomerServices().execute(function(resp) 
									{
							 
							 console.log(resp.items);
							 
							 
							 
							 var substringMatcher = function(strs) {
									return function findMatches(q, cb) {
										var matches, substringRegex;
										matches = [];
										substrRegex = new RegExp(q, 'i');
										$.each(strs, function(i, str) {
											if (substrRegex.test(str)) {
												matches.push(str);
											}
										});

										cb(matches);
									};
								};
								var states = [];
								for(var i=0;i<resp.items.length;i++)
									{
										
												states.push(resp.items[i].name);
									}

								$('#the-basics .typeahead').typeahead({
									hint : true,
									highlight : true,
									minLength : 1
								}, {
									name : 'states',
									source : substringMatcher(states)
								});

								var states = new Bloodhound({
									datumTokenizer : Bloodhound.tokenizers.whitespace,
									queryTokenizer : Bloodhound.tokenizers.whitespace,
									local : states
								});

								$('#bloodhound .typeahead').typeahead({
									hint : true,
									highlight : true,
									minLength : 1
								}, {
									name : 'states',
									source : states
								});
							 
							 
					})
						
					};
					
					

					$scope.selecteditem = function() {
						
						//$scope.main.selectedCustomer=document.getElementById("name").value;
						/*for(var i=0;i<$scope.main.allCustomer.items.length;i++)
							{
							 if(($scope.main.allCustomer.items[i].name)==(document.getElementById("name").value))
								 {
								 	
								 }
							}
						 console.log($scope.main.allCustomer);*/
						$scope.items.push(document.getElementById("itemname").value);
						$scope.getAllStockServices();
					}
					
					$scope.bill.subtotal=[];
					
					
					$scope.onBlur1 = function($event) {
						
					//	$scope.bill.total=($scope.bill.rate*$scope.bill.qty).toFixed(2);

						$scope.bill.qty1.push($scope.bill.qty);

						console.log("qty="+$scope.bill.qty1);
					
						//$scope.bill.grandtotal=$scope.bill.grandtotal2+$scope.bill.total;
						//$scope.bill.grandtotal2=$scope.bill.grandtotal;
						
						//alert(document.getElementById("name").value);
						//$scope.selectedCustomer();
					  //  return $event;
					}
					
					
		
					
					$scope.onBlur = function($event) {
						
						$scope.bill.total=($scope.bill.rate*$scope.bill.qty).toFixed(2);
						$scope.bill.rate1.push($scope.bill.rate);
						 console.log("rate="+$scope.bill.rate1);
						 
							$scope.bill.subtotal.push(($scope.bill.rate*$scope.bill.qty).toFixed(2))
							console.log("subtotal="+$scope.bill.subtotal);
						 var g=0;
							for(var i=0;i<$scope.bill.rate1.length;i++)
							{
								
								//$scope.bill.subtotal.push(($scope.bill.rate1[i]*$scope.bill.qty1[i]).toFixed(2))
								alert($scope.bill.grandtotal);
								//alert($scope.bill.subtotal[i]);
								console.log("subtotal="+parseFloat($scope.bill.rate1[i])*parseFloat($scope.bill.qty1[i]));	
								$scope.bill.grandtotal=(parseFloat($scope.bill.grandtotal)+(parseFloat($scope.bill.rate1[i])*parseFloat($scope.bill.qty1[i]))).toFixed(2);
							}
						//$scope.bill.grandtotal=$scope.bill.grandtota2;
						//$scope.bill.grandtotal=$scope.bill.grandtotal2+$scope.bill.total;
						//$scope.bill.grandtotal2=$scope.bill.grandtotal;
						
						//alert(document.getElementById("name").value);
						//$scope.selectedCustomer();
					  //  return $event;
					}
					
					
					
					$scope.deleteRow = function(i) {
						alert("yes");
					    	 if(i>1){
							 $("#addr"+(i-1)).html('');
							 }
					}
					
					
					$scope.addDiv = function () {
						
						
						
						
						
										$('#addr' + $scope.i).html("<div class='col-sm-2 column'><div id='Delete"+$scope.i+"' class='navbar-brand' href='/' ng-click='deleteRow("+$scope.i+")'>Delete</div></div>"
															+ "<div class='col-sm-4 column'><div class='navbar-brand' href='/'><div class='form-group'><div id='bloodhound"+$scope.i+"'><input type='text'  class='form-control typeahead' id='itemname"+$scope.i+"'  placeholder='Customer Name'></div></div></div></div>"
															+ "<div class='col-sm-2 column'><div class='navbar-brand' href='/'><div class='form-group'><input type='text' class='form-control' ng-model='bill.qty'  id='qty"+$scope.i+"'></div></div></div>"
															+ "<div class='col-sm-2 column'><div class='navbar-brand' href='/'><div class='form-group'><input type='text' class='form-control' ng-model='bill.rate'   id='rate"+$scope.i+"'></div></div></div>"
															+ "<div class='col-sm-2 column'><div class='navbar-brand' href='/'><div class='form-group'><input type='text' class='form-control' ng-model='bill.total'  id='total"+$scope.i+"' disabled></div></div></div>");
										
										
									
										
										$('#items').append("<div class='row clearfix' style='background-color: white;' id='addr"+ ($scope.i+1)+ "'></div>");
										$scope.getAllStockServices("addr"+$scope.i);
										
										$scope.i++;
						
					}
					
					
					
					
					$scope.getAllStockServices = function (id1) {
						 gapi.client.stockServices.getAllStockServices().execute(function(resp) 
									{
							 $scope.main.allItems=resp;							 
							 
							 var substringMatcher = function(strs) {
									return function findMatches(q, cb) {
										var matches, substringRegex;
										matches = [];
										substrRegex = new RegExp(q, 'i');
										$.each(strs, function(i, str) {
											if (substrRegex.test(str)) {
												matches.push(str);
											}
										});

										cb(matches);
									};
								};
								var states = [];
								for(var i=0;i<resp.items.length;i++)
									{
									
									/*if($scope.items.length==0)
									{*/
									states.push(resp.items[i].item_Name);
									/*}
								else
									{
								for(var j=0;j<$scope.items.length;j++)
									{
										if($scope.items[j].name!=resp.items[i].name)
										{
									states.push(resp.items[i].item_Name);
										}
									}
									}*/
									}
								$('#the-basics .typeahead').typeahead({
									hint : true,
									highlight : true,
									minLength : 1
								}, {
									name : 'states',
									source : substringMatcher(states)
								});

								var states = new Bloodhound({
									datumTokenizer : Bloodhound.tokenizers.whitespace,
									queryTokenizer : Bloodhound.tokenizers.whitespace,
									local : states
								});

								$('#'+id1+' .typeahead').typeahead({
									hint : true,
									highlight : true,
									minLength : 1
								}, {
									name : 'states',
									source : states
								});
							 
							 
					})
						
					};
					
					
					
					
					
					
					
				

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

						gapi.client.load('billingServices', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getallfetchbills();
						}, apiRoot);
						
						gapi.client.load('stockServices', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getAllStockServices("addr0");
						}, apiRoot);
						
						gapi.client.load('customerServices', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getCustomerServices();
						}, apiRoot);
						

					};

				} ]);
