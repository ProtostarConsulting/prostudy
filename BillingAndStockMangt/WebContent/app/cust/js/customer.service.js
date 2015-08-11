app = angular.module("customerApp");

app.service('customerservice', function(){
    
	newCustomer = function() {
		return {
			firstName : '',
			lastName : '',
			mobileNo : '',
			email : '',
			address : {
				line1 : '',
				line2 : '',
				city : '',
				state: '',
				pin : '',	
			}
		};
	}

});
