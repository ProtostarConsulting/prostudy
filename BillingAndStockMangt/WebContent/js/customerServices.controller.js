function init() {
	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular.module("mycustomer", []).controller(
		"customerController",
		[
				'$scope',
				'$window',
				function($scope, $window) {

					$scope.serMsg = "";

				//	alert("Inside Controller");
					$scope.items = {};
					$scope.addSubmit = {};
				  //$scope.addCustomDetails= {};
					$scope.customerList = {};
					
					$scope.addCustomer = {};
					$scope.addCustomer.id = "";
					$scope.addCustomer.name = "";
					$scope.addCustomer.address = "";
					$scope.addCustomer.mobile = "";
					$scope.addCustomer.email_Id = "";


					$scope.addSubmit.addCustomerServices = function()
					{
						//alert("Add Submit");
						$scope.addCustomer.id=document.getElementById("id").value;
						$scope.addCustomer.name=document.getElementById("name").value;
						$scope.addCustomer.address=document.getElementById("address").value;
						$scope.addCustomer.mobile=document.getElementById("mobile").value;
						$scope.addCustomer.email_Id=document.getElementById("email_Id").value;
						
					 gapi.client.customerServices.addCustomerServices
					 ($scope.addCustomer).execute(function(resp)
					  {
						//alert(resp.token);
						console.log(resp.token);
						//console.log($scope.addCustomer);
						if(resp.token=="R")
							{
							$("#actionMsgDivR").show();
							$("#actionMsgDivU").hide();
							}
						else
							{
							$("#actionMsgDivR").hide();
							$("#actionMsgDivU").show()
							}
						$("#customerTable").hide();
						$("#customer").hide();
						// $scope.$apply();
						//console.log($scope.items);
					  })
					};//end of addCustomerServices
					
					
					
					
					
					$scope.getCustomerServices= function()
					{
						
						$("#customerTable").show();
						$("#customer").hide();
						$("#actionMsgDivR").hide();
						$("#actionMsgDivU").hide();
						gapi.client.customerServices.getCustomerServices().execute(function(resp)
							{
 							   console.log(resp);
							  
							   var table = $('#customerDataTable').DataTable();
							   
							   $scope.customerList=resp.items;
							   $('#customerDataTable').dataTable().fnClearTable();
								for(var i=0;i<resp.items.length;i++)
									{
									
									 var Id = resp.items[i].id;
						    		  var name = "'"+resp.items[i].name+"'";
						    		  var address = "'"+resp.items[i].address+"'";
						    		  var mobile = "'"+resp.items[i].mobile+"'";
						    		  var email_Id = "'"+resp.items[i].email_Id+"'";
						    		  
						    		  var seq = +i + +1;
								table.row.add( ['<a href="#" onclick="updateCustomer('+Id+','+name+','+address+','+mobile+','+email_Id+')">'+resp.items[i].name+'</a>',
								                resp.items[i].address,resp.items[i].mobile,resp.items[i].email_Id] ).draw();
									}
								
							})
						
					};//end of getCustomerServices
					
					
					$scope.addNewCustomer=function()
					{
						$scope.addCustomer.name = "";
						$scope.addCustomer.address = "";
						$scope.addCustomer.mobile = "";
						$scope.addCustomer.email_Id = "";
						$("#customer").show();
						$("#customerTable").hide();
						$("#actionMsgDivR").hide();
					}
					
					
		
					
					$window.initGAPI = function()
					{
		
						$scope.$apply($scope.loadCustomServices);

					};

					$scope.loadCustomServices = function()
					{
						//alert("Inside window.loadCustomServices");
						var apiRoot = '//' + window.location.host + '/_ah/api';

						// Loads the OAuth and helloworld APIs
						// asynchronously, and
						// triggers login
						// when they have completed.
						var apisToLoad;

						apisToLoad = 1; // must match number of calls to
						// gapi.client.load()

						gapi.client.load('customerServices', 'v0.1', function() 
					    {
							$scope.is_backend_ready = true;
							$scope.getCustomerServices();

						}, apiRoot);

					};

				} ]);
