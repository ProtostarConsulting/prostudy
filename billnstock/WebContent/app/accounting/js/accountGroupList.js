angular
.module("stockApp")
.controller('accountGrpListCtr',function($scope,$log,appEndpointSF,$mdToast,$timeout,ajsCache){
	

	$scope.accGrpList={"groupName":"","description":"","displayOrderNo":""};
	
	$scope.getList=function(refresh){
		
		var AccountGroupServiceCacheKey = "getAccountGroupByName";
	      // Note this key has to be unique across application
	      // else it will return unexpected result.
	      if (!angular.isUndefined(ajsCache.get(AccountGroupServiceCacheKey)) && !refresh)
	      {
	       $log.debug("Found List in Cache, return it.");
	       $scope.List = ajsCache.get(AccountGroupServiceCacheKey);
	       return;
	      }
		
		var listAccountGroupService=appEndpointSF.getAccountGroupService();
		listAccountGroupService.getAccountGroupList()
		.then(
				function(list) {			
					$log.debug("list:"+angular.toJson(list));
					$scope.List=list;
					
					ajsCache.put(AccountGroupServiceCacheKey,list);
				})
			
	};
	//$scope.getList();
	
	     $scope.query = {
		      order : 'name',
		      limit : 5,
		      page : 1
		     };
	
	    $scope.waitForServiceLoad = function() {
		   if (appEndpointSF.is_service_ready) {
			   $scope.getList();
		   } else {
		    $log.debug("Services Not Loaded, watiting...");
		    $timeout($scope.waitForServiceLoad, 1000);
		   }
		  }
		  $scope.waitForServiceLoad();
		  
		  $scope.deleteAccountGrp=function(id){
				
				var delAccountGroupService = appEndpointSF.getAccountGroupService();
				delAccountGroupService.deleteAccountGrp(id).then(function() {
					$scope.showDeleteToast();
					 $scope.getList();
				});
				};
				$scope.showDeleteToast = function() {
					$mdToast.show($mdToast.simple().content(
							'Account Group Deleted ...!').position("down").hideDelay(
							3000));
				};
})