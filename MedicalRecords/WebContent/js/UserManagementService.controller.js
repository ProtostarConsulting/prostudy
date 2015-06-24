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

					// Initialize
					$scope.serMsg = {};
					$scope.items = {};
					$scope.clickDiv = {};
					$scope.user = {id:"",email:"",role:""};
					
					$scope.userList={};

					$scope.clickDiv.saveUserRole = function() {
						alert(document.getElementById("email").value);
						$scope.user.id=document.getElementById("id").value;
						$scope.user.email=document.getElementById("email").value;
//						$scope.user.role=document.getElementById("role").value;
	
						/*var role=document.getElementByName("role");
						var role_value;

						alert(role.length);
						
						for(var i=0;i<role.length;i++)
							{
								if(role[i].checked)
								{
									role_value=role[i].value;
								}
							}
						$scope.user.role=role_value;*/
						

						gapi.client.usermanagementservice.saveUserRole(
								$scope.user).execute(function(resp) {
							alert(resp.token);
							// console.log(resp.data);
							// $scope.serMsg = resp.data;

							if (resp.token == "U") {
								
								$("#formDiv").addClass('hidden');
								$("#actionMsgDivU").removeClass('hidden');
								$("#main").removeClass('hidden');
							} 
							else {
								$("#formDiv").addClass('hidden');
								$("#actionMsgDivR").removeClass('hidden');
								$("#main").removeClass('hidden');
							}
							
						//	$("#formDiv").hide();
						//	$("#actionMsgDiv").show();
						});
					}

					$scope.getAllUsers = function() {
						alert("Comes in getAllUsers");
						gapi.client.usermanagementservice.getAllUserwithRole().execute(function(resp) {
				//			alert(resp.token);
				//			$scope.items = resp.items;
					
							console.log(resp);
							var table=$("#userDataTable").DataTable();
							alert(resp.items.length);
							
							$scope.userList=resp.items;
							$('#userDataTable').dataTable().fnClearTable();
							for(var i=0;i<resp.items.length;i++)
							{
							
							 var Id = resp.items[i].id;
				    		  var email = "'"+resp.items[i].email+"'";
				    		  var role = "'"+resp.items[i].role+"'";

				    		  var seq = +i + +1;
							
						table.row.add( ['<a href="#" onclick="seletctUser('+Id+','+email+','+role+')">'+resp.items[i].email+'</a>',
						                resp.items[i].role] ).draw();
							}

							$scope.$apply();

						});

					}
					$scope.clickDiv.addUser = function() {
						

						document.location = '/UserManagement.html';
						
						$("#formDiv").removeClass('hidden');
						$("#actionMsgDivR").addClass('hidden');
						$("#actionMsgDivU").addClass('hidden');
						$("#main").addClass('hidden');
						/*
						 * $("#formDiv").hide(); $("#actionMsgDiv").show();
						 */
						
						$scope.getAllUsers();
					}

					$scope.clickDiv.clearall = function() {
						$scope.user.email = "";
						$scope.user.role = "";
					}

					$scope.seletctUser = function(i) {
						alert("Hi" + i.email);
						$scope.user = i;
					}

					$scope.clickDiv.cancelBtn = function() {
						document.location = '/index.html';
					}

					// New code in ctler

					$window.initGAPI = function() {
						// $scope.$apply($scope.initgapi);
						$scope.$apply($scope.loadCustomServices);
						// alert("Inside window.initGAPI");

					};

					$scope.loadCustomServices = function() {
						alert("Inside loadCustomServices");

						var apiRoot = '//' + window.location.host + '/_ah/api';

						// Loads the OAuth and helloworld APIs
						// asynchronously, and
						// triggers login
						// when they have completed.
						var apisToLoad;

						apisToLoad = 1; // must match number of calls to

						gapi.client.load('usermanagementservice', 'v0.1',
								function() {
									$scope.is_backend_ready = true;
									$scope.getAllUsers();
								}, apiRoot);

					};

				} ]);
