package com.protostar.billingnstock.hr.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.billingnstock.account.entities.AccountEntity;
import com.protostar.billingnstock.hr.entities.Employee;
import com.protostar.billingnstock.hr.entities.SalSlip;
import com.protostar.billingnstock.hr.entities.SalStruct;
import com.protostar.billingnstock.hr.entities.TimeSheet;
import com.protostar.billingnstock.user.entities.BusinessEntity;
import com.protostar.billingnstock.user.entities.UserEntity;

@Api(name = "hrService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.hr.services", ownerName = "com.protostar.billingnstock.hr.services", packagePath = ""))
public class HrService {

	@SuppressWarnings("unused")
	@ApiMethod(name = "addemp")
	public void addemp(Employee emp) {
		Key<Employee> now = ofy().save().entity(emp).now();

	}
	
	@ApiMethod(name = "getAllemp")
	public List<UserEntity> getAllemp(@Named("id") Long busId) {

		List<UserEntity> filteredemp = ofy()
				.load()
				.type(UserEntity.class)
				.filter("businessAccount",
						Ref.create(Key.create(BusinessEntity.class, busId)))
				.list();
		return filteredemp;

	}

	@ApiMethod(name = "getempByID")
	public Employee getempByID(@Named("id") Long selectedid) {

		Employee Emp = ofy().load().type(Employee.class).id(selectedid).now();

		return Emp;
	}

	@ApiMethod(name = "updateemp")
	public Employee updateemp(Employee emp) {
		Key<Employee> now1 = ofy().save().entity(emp).now();
		return emp;

	}

	@ApiMethod(name = "addsalstruct")
	public void addsalstruct(SalStruct struct) {
		Key<SalStruct> now = ofy().save().entity(struct).now();

	}

	@ApiMethod(name = "getAllempsSalStruct")
	public List<SalStruct> getAllempsSalStruct(@Named("id") Long id) {

		List<SalStruct> filtersalslips = ofy().load().type(SalStruct.class).filter("business",
						Ref.create(Key.create(BusinessEntity.class, id))).list();
		return filtersalslips;

	}

	@ApiMethod(name = "findsalstruct")
	public SalStruct findsalstruct(@Named("id") Long struct) {

		SalStruct salstruct = ofy().load().type(SalStruct.class).id(struct).now();

		return salstruct;

	}

	@ApiMethod(name = "findsalstructfromemp")
	public SalStruct findsalstructfromemp(@Named("id") Long id) {
		
SalStruct filteredsalstruct = ofy().load().type(SalStruct.class).filter("empAccount",Ref.create(Key.create(UserEntity.class, id))).first().now();
		return filteredsalstruct;
	
	}

	@ApiMethod(name = "updatesalinfo")
	public void updatesalinfo(SalStruct struct) {
		Key<SalStruct> now = ofy().save().entity(struct).now();
	}

	@ApiMethod(name = "countofrecord")
	public List<SalSlip> countofrecord(@Named("id") Long id) {
		//return ofy().load().type(SalSlip.class).list();
	return  ofy().load().type(SalSlip.class).filter("business",Ref.create(Key.create(BusinessEntity.class, id))).list();
	}

	@ApiMethod(name = "addgsalslip")
	public SalSlip addgsalslip(SalSlip salslip) {
		SalSlip salslips = salslip;
		@SuppressWarnings("unused")
		Key<SalSlip> now = ofy().save().entity(salslip).now();

		return salslips;

	}

	@ApiMethod(name = "displyOnlySelected")
	public List<SalSlip> displyOnlySelected(@Named("month") String mon,@Named("id") Long id) {

		return ofy().load().type(SalSlip.class).filter("business",Ref.create(Key.create(BusinessEntity.class,id))).filter("month",mon).list();
		
	}

	@ApiMethod(name = "printslip")
	public SalSlip printslip(@Named("id") Long salslipid) {

		SalSlip sals = ofy().load().type(SalSlip.class).id(salslipid).now();

		return sals;
	}

	@ApiMethod(name = "addtimesheet")
	public void addtimesheet(TimeSheet timesheet) {
		Key<TimeSheet> now = ofy().save().entity(timesheet).now();

	}

	@ApiMethod(name = "getAlltimesheet")
	public List<TimeSheet> getAlltimesheet() {
		return ofy().load().type(TimeSheet.class).list();
	}

	@ApiMethod(name = "getcurweekdata")
	public TimeSheet getcurweekdata(@Named("week") String weekNumber) {

		TimeSheet weekdata = ofy().load().type(TimeSheet.class)
				.filter("week", weekNumber).first().now();

		return weekdata;
	}

	@ApiMethod(name = "getallsalslip")
	public List<SalSlip> getallsalslip(@Named("year") String curryear,
			@Named("id") Long id) {

		List<SalSlip> salslipdata = ofy().load().type(SalSlip.class)
				.filter("year", curryear).list();

		// List<SalSlip> salslipdata =
		// ofy().load().type(SalSlip.class).filter("salarystruct.empAccount.id",
		// "6333186975989760").list();
		List<SalSlip> filteredsalslipdata = new ArrayList<SalSlip>();

		for (int i = 0; i < salslipdata.size(); i++) {
			if (salslipdata.get(i).getSalarystruct().getEmpAccount()
					.getBusiness().getId().equals(id)) {

				filteredsalslipdata.add(salslipdata.get(i));
			} else {

				System.out.println("Recored No found:");
			}
		}
		return filteredsalslipdata;

	}

}// end of InternetService
