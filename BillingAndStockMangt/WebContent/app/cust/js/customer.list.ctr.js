angular.module("customerApp").controller(
		"customerListCtr",
		function($scope, $window, DTOptionsBuilder, DTColumnDefBuilder) {

			console.log("Inside customerListCtr");
			var vm = this;
			// vm.persons =
			// $resource('/demo/data1.json').query();
			vm.custList = {};
			vm.persons = [ {
				"mobileNo" : 860,
				"firstName" : "Superman2",
				"lastName" : "Yoda"
			}, {
				"mobileNo" : 870,
				"firstName" : "Foo",
				"lastName" : "Whateveryournameis"
			}, {
				"mobileNo" : 590,
				"firstName" : "Toto",
				"lastName" : "Titi"
			} ];

			vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
					'full_numbers');
			vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
					DTColumnDefBuilder.newColumnDef(1),
					DTColumnDefBuilder.newColumnDef(2),
					DTColumnDefBuilder.newColumnDef(3).notSortable() ];
			vm.person2Add = _buildPerson2Add();
			vm.modifyPerson = modifyPerson;
			vm.addPerson = addPerson;
			vm.removePerson = removePerson;
			vm.isModify = false;

			function _buildPerson2Add() {
				return {
					mobileNo : '',
					firstName : '',
					lastName : ''
				};
			}

			function addPerson() {
				vm.persons.push(angular.copy(vm.person2Add));
				vm.person2Add = _buildPerson2Add();
				vm.isModify = false;

			}

			function modifyPerson(index) {
				vm.person2Add = vm.persons.splice(index, 1)[0];
				console.log(vm.person2Add);
				vm.isModify = true;
			}

			/*
			 * function saveModifyPerson(index) {
			 * vm.persons[index] = vm.person2Add; vm.person2Add =
			 * _buildPerson2Add(); vm.isModify =false; }
			 */
			function removePerson(index) {
				vm.persons.splice(index, 1);
			}

			$scope.loadCustomerList = function() {
				console.log("Inside loadCustomerList");
				gapi.client.customerservice.getAllCustomers().execute(
						function(resp) {
							console.log(resp);
							vm.persons = resp.items;
							//											$scope.$apply();
						});
			};

			// This will load customer list
			$scope.$apply($scope.loadCustomerList());

		});
