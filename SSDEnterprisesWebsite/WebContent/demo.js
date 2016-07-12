var app = angular.module("demoWebsite", [ 'ngMaterial', 'ngMdIcons',
		 "ui.bootstrap" ]);

app.controller("demoCtr",['$mdDialog', function($scope,$mdDialog) {

	 $scope.showAdd = function(ev) {
		    $mdDialog.show({
		      controller: DialogController,
		      template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div><centre><h1><b>Contact Us Form</b></h1></centre><p>Enter your request details below and submit. We will get back to you within 3 business days.</p></div><div layout layout-sm="column"><md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container></div> <div layout layout-sm="column"><md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div><div layout layout-sm="column"> <md-input-container flex> <label>Contact no.</label> <input ng-model="user.contactno" placeholder="Placeholder text"> </md-input-container></div> <md-input-container flex> <label>Message</label> <textarea ng-model="user.message" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
		      targetEvent: ev,
		    })
		    .then(function(answer) {
		      $scope.alert = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.alert = 'You cancelled the dialog.';
		    });
		  };
		  
		  



}]);