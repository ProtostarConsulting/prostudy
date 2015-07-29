
var app = angular.module("bill", [ "xeditable", "ui.bootstrap", "datatables" ]);

app.run(function(editableOptions, editableThemes) {
	editableThemes.bs3.inputClass = 'input-sm';
	editableThemes.bs3.buttonsClass = 'btn-sm';
	editableOptions.theme = 'bs3';
});


app.controller('AngularWayChangeDataCtrl', AngularWayChangeDataCtrl)

function AngularWayChangeDataCtrl(DTOptionsBuilder, DTColumnDefBuilder) {
    var vm = this;
    
    vm.persons =[{
        "id": 860,
        "firstName": "Superman",
        "lastName": "Yoda",
        	"number":"8888425725"
    }, {
        "id": 870,
        "firstName": "Foo",
        "lastName": "Whateveryournameis",
        	"number":"8888425725"
    }, {
        "id": 590,
        "firstName": "Toto",
        "lastName": "Titi",
        "number":"8888425725"	
    }];
    
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];
    vm.person2Add = _buildPerson2Add(1);
    vm.addPerson = addPerson;
    vm.modifyPerson = modifyPerson;
    vm.removePerson = removePerson;

    function _buildPerson2Add(id) {
        return {
            id: id,
            firstName: 'Foo' + id,
            lastName: 'Bar' + id,
            number: 'Bar' + id
        };
    }
    function addPerson() {
        vm.persons.push(angular.copy(vm.person2Add));
        vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
    }
    function modifyPerson(index) {
        vm.persons.splice(index, 1, angular.copy(vm.person2Add));
        vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
    }
    function removePerson(index) {
        vm.persons.splice(index, 1);
    }
		};

