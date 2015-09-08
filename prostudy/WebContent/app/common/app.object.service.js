angular.module("prostudyApp").factory('objectFactory', objectFactoryFn);

function objectFactoryFn($log) {

	var objectFactory = {};

	objectFactory.newCustomer = function() {
		return {
			firstName : '',
			lastName : '',
			mobileNo : '',
			email : '',
			address : {
				line1 : '',
				line2 : '',
				city : '',
				state : '',
				pin : '',
			}
		}
	};

	objectFactory.newStudent = function() {
		return {
			firstName : '',
			lastName : '',
			mobileNo : '',
			email : '',
			address : {
				line1 : '',
				line2 : '',
				city : '',
				state : '',
				pin : '',
			}
		}
	};

	return objectFactory;
}
