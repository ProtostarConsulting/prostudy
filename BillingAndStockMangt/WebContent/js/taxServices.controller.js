function init() {
	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular.module("myTax", []).controller("taxController",['$scope','$window',function($scope, $window)
                         
                         {
							$scope.fname = "Default Name"
							$scope.serMsg = "";

							//alert("Inside Controller");
							
							
							$scope.submitTax = {};
							$scope.items = {};
							
							$scope.addTax = {};
							$scope.taxList = {};
							
							$scope.addTax.id = "";
							$scope.addTax.code_Name = "";
							$scope.addTax.tax_Rate = "";
							
							

							$scope.submitTax.addTaxServices = function() 
							{
								//alert("Add Submit");
								$scope.addTax.id =document.getElementById("id").value;
								
								$scope.addTax.code_Name =document.getElementById("code_Name").value;
								$scope.addTax.tax_Rate =document.getElementById("tax_Rate").value;
								
								gapi.client.taxServices.addTaxServices($scope.addTax).execute(function (resp)
										
								{
								
									alert($scope.addTax.code_Name);
									//console.log(resp.myData);
									console.log($scope.addTax);
									
									alert(resp.token);
									if(resp.token=="R")
									{
										$("#actionMsgDivR").show();
										$("#actionMsgDivU").hide();
										
									}
									else
									{
										$scope.addTax.id =document.getElementById("id").value;
										
										$scope.addTax.code_Name =document.getElementById("code_Name").value;
										$scope.addTax.tax_Rate =document.getElementById("tax_Rate").value;
										
										$("#actionMsgDivR").hide();
										$("#actionMsgDivU").show();
										
										
										
									}
									$("#tableTax").hide();
									$("#taxForm").hide();
									
									
								
								});
							};//end of addTaxServices
							
							
							$scope.getAllTaxServices = function()
							{
								gapi.client.taxServices.getAllTaxServices().execute(function(resp)
										{
									         $scope.items=resp.items;
									          
									           alert(resp.items);
									        
									           console.log(resp);
									           
									            alert("Inside DATA Table"); 
											   var table = $('#taxDataTable').DataTable();
											   
											   $scope.taxList=resp.items;
											   $('#taxDataTable').dataTable().fnClearTable();
												for(var i=0;i<resp.items.length;i++)
													{
													
													 var Id = resp.items[i].id;
													 
										    		  var code_Name = "'"+resp.items[i].code_Name+"'";
										    		  var tax_Rate = "'"+resp.items[i].tax_Rate+"'";
										    		 
										    		  
										    		  var seq = +i + +1;
										    		  //alert("Inside onclick updateTax");
												table.row.add( [seq,'<a href="#" onclick="updateTax('+Id+','+code_Name+','+tax_Rate+')">'+resp.items[i].code_Name+'</a>',
												                resp.items[i].tax_Rate] ).draw();
													}
									           
									           $scope.$apply();
										});
								$("#taxForm").hide();
								$("#tableTax").show();
								$("#actionMsgDivU").hide();
								$("#actionMsgDivR").hide();
								
							};//end of getAllTaxServices
							
							$scope.taxDetails = function()
							{
								alert("Inside Tax details");
								
								$("#taxForm").hide();
								$("#tableTax").show();
						
								//$scope.getAllTaxServices();
								
							};//end of taxDetails
							
							$scope.addNewTax = function()
							{
								$scope.addTax.code_Name = "";
								$scope.addTax.tax_Rate = "";
								
								$("#taxForm").show();
								$("#tableTax").hide();
								$("#actionMsgDivR").hide();
								$("#actionMsgDivU").hide();
								
								
							};//end of addNewTax
							
						/*	$scope.updateAllTax = function(item)
							{
								
								$("#taxForm").show();
								$("#tableTax").hide();
							
								$scope.addTax =item;
								alert($scope.addTax.code_Name);
								
							};// end of updateAllTax
							*/
							
						 
												
							
						
										
							$window.initGAPI = function() {
								// $scope.$apply($scope.initgapi);
								$scope.$apply($scope.loadCustomServices);
							//	alert("Inside window.initGAPI");

							};

							$scope.loadCustomServices = function() {
								var apiRoot = '//' + window.location.host
										+ '/_ah/api';

								// Loads the OAuth and helloworld APIs
								// asynchronously, and
								// triggers login
								// when they have completed.
								var apisToLoad;

								apisToLoad = 1; // must match number of calls to
								// gapi.client.load()
								gapi.client.load('taxServices', 'v0.1',
										function() {
											$scope.is_backend_ready = true;
											$scope.getAllTaxServices();
											
										}, apiRoot);
								
						
								
							};

						} ]);
