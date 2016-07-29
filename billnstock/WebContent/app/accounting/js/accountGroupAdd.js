angular
.module("stockApp")
.controller("accountGroupCtr",function($scope, $log,$mdToast, appEndpointSF,$state) 
		{
			$log.debug("hello");
			$scope.tempAccountGrp={"groupName":"","description":"","displayOrderNo":""};
			
			$scope.addAccountGroup=function(){
				
				$log.debug("hellOOOOOOOOOOOo");
				var addAccountGroupService=appEndpointSF.getAccountGroupService();
				addAccountGroupService.addAccountGroup($scope.tempAccountGrp)
				.then(function(msgbean) {
					$scope.showSavedToast();
					$scope.addAccountGroup={};
					
					}
			
				)};
				$scope.showSavedToast = function() {
					$mdToast.show($mdToast.simple().content(
					'Account Group Saved ...!').position("top").hideDelay(
					3000));
		};
				
				$scope.cancelBtn=function(){
					$state.go("accounting", {  });
					
				}
		})
