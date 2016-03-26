package com.protostar.billingnstock.hr.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.hr.entities.Employee;
import com.protostar.billingnstock.hr.entities.SalSlip;
import com.protostar.billingnstock.hr.entities.SalStruct;
import com.protostar.billingnstock.hr.entities.TimeSheet;
import com.protostar.billingnstock.user.entities.UserEntity;




@Api(name = "hrService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.hr.services", ownerName = "com.protostar.billingnstock.hr.services", packagePath = ""))
public class HrService
{
	
	@SuppressWarnings("unused")
	@ApiMethod(name="addemp")
	public void addemp(Employee emp)
	{
		  Key<Employee> now = ofy().save().entity(emp).now();
	
	}
	/*@ApiMethod(name="getAllemp") 
	public List<Employee> getAllemp(@Named("businessAccountID") Long businessAccountID) {
	  return ofy().load().type(Employee.class).list();
	 }*/
	
	@ApiMethod(name="getAllemp") 
	public List<UserEntity> getAllemp(@Named("id") Long id) {
	//  return ofy().load().type(Employee.class).list();
	
		
		List<UserEntity> emp = ofy().load().type(UserEntity.class).list();
		List<UserEntity> filteredemp = new ArrayList<UserEntity>();

		for (int i = 0; i < emp.size(); i++) {
			if (emp.get(i).getBusinessAccount().getId().equals(id)) {
				System.out.println("Got the record:"
						+ emp.get(i).getBusinessAccount().getId());
				filteredemp.add(emp.get(i));
			} else {
				System.out.println("id:" + id);
				System.out.println("Recored No found:"
						+ emp.get(i).getBusinessAccount().getId());
			}
		}
		return filteredemp;
	 }
	
	@ApiMethod(name="getempByID") 
	 public Employee getempByID(@Named("id") Long selectedid) {
		
	
		Employee Emp = ofy().load().type(Employee.class).id(selectedid).now();

		return Emp;
	 }
	@ApiMethod(name="updateemp")
	public Employee updateemp(Employee emp)
	{
		  Key<Employee> now1 = ofy().save().entity(emp).now();
		return emp;
	
	}
	
	@ApiMethod(name="addsalstruct")
	public void addsalstruct(SalStruct struct)
	{
		  Key<SalStruct> now = ofy().save().entity(struct).now();
		  		
	}
	              
 @ApiMethod(name="getAllempsSalStruct")    
 	 public List<SalStruct> getAllempsSalStruct(@Named("id") Long id) {
	 List<SalStruct> salstruct =ofy().load().type(SalStruct.class).list();
	  
		List<SalStruct> filteredsalstruct= new ArrayList<SalStruct>();

		for (int i = 0; i < salstruct.size(); i++) {
			if (salstruct.get(i).getEmpAccount().getBusinessAccount().getId().equals(id)){
				
				filteredsalstruct.add(salstruct.get(i));
			} else {
				
				System.out.println("Recored No found:");
			}
		}
		return filteredsalstruct;
	  
 }
 
	@ApiMethod(name="findsalstruct") 
	 public SalStruct findsalstruct(@Named("id") Long struct) {
		
		SalStruct salstruct = ofy().load().type(SalStruct.class).id(struct).now();

		return salstruct;
		
	 }
	@ApiMethod(name="findsalstructfromemp")
 public SalStruct findsalstructfromemp(@Named("id") Long id) {

		List<SalStruct> salstruct = ofy().load().type(SalStruct.class).list();
		SalStruct filteredsalstruct = new SalStruct();
		
		for (int i = 0; i < salstruct.size(); i++) {
			if (salstruct.get(i).getEmpAccount().getId().equals(id)){
				
				filteredsalstruct=(salstruct.get(i));
			} else {
				
				System.out.println("Recored No found:");
			}
		}
			
		return filteredsalstruct;
		
	 }
	
	
	@ApiMethod(name="updatesalinfo")
	public void updatesalinfo(SalStruct struct)
	{
		  Key<SalStruct> now = ofy().save().entity(struct).now();
	}
	
	
	 @ApiMethod(name="countofrecord") 
	 public List<SalSlip> countofrecord() {
	  return ofy().load().type(SalSlip.class).list();
 }
	
	
	
	@ApiMethod(name="addgsalslip")
	public SalSlip addgsalslip(SalSlip salslip)
	{
		SalSlip salslips = salslip;
	  @SuppressWarnings("unused")
		Key<SalSlip> now = ofy().save().entity(salslip).now();
	  
	return salslips;
	 
	}
	
	@ApiMethod(name="displyOnlySelected") 
	 public List<SalSlip> displyOnlySelected(@Named("month") String mon,@Named("id") Long id) {
	
		List<SalSlip> month = ofy().load().type(SalSlip.class).filter("month", mon).list();

		
		List<SalSlip> filteredmonth = new ArrayList<SalSlip>();

		for (int i = 0; i < month.size(); i++) {
			if (month.get(i).getSalarystruct().getEmpAccount().getBusinessAccount().getId().equals(id)){
				
				filteredmonth.add(month.get(i));
			} else {
				
				System.out.println("Recored No found:");
			}
		}
		return filteredmonth;
		
	 }
	
	
	@ApiMethod(name="printslip") 
	 public SalSlip printslip(@Named("id") Long salslipid) {
	
		SalSlip sals =  ofy().load().type(SalSlip.class).id(salslipid).now();

		return sals;
	 }
		
	
	
	@ApiMethod(name="addtimesheet") 
	public void addtimesheet(TimeSheet timesheet)
	{
		  Key<TimeSheet> now = ofy().save().entity(timesheet).now();
	
	}
	@ApiMethod(name="getAlltimesheet") 
	
	 public List<TimeSheet> getAlltimesheet() {
	  return ofy().load().type(TimeSheet.class).list();
	 }
	
	@ApiMethod(name="getcurweekdata") 
	 public TimeSheet getcurweekdata(@Named("week") String weekNumber) {
	
		TimeSheet weekdata = ofy().load().type(TimeSheet.class).filter("week", weekNumber).first().now();

		return weekdata;
	 }
	@ApiMethod(name="getallsalslip") 
	 public List<SalSlip> getallsalslip(@Named("year") String curryear,@Named("id") Long id) {
	
		List<SalSlip> salslipdata = ofy().load().type(SalSlip.class).filter("year",curryear).list();
		
		//List<SalSlip> salslipdata = ofy().load().type(SalSlip.class).filter("salarystruct.empAccount.id", "6333186975989760").list();
		List<SalSlip> filteredsalslipdata = new ArrayList<SalSlip>();

		for (int i = 0; i < salslipdata.size(); i++) {
			if (salslipdata.get(i).getSalarystruct().getEmpAccount().getBusinessAccount().getId().equals(id)){
				
				filteredsalslipdata.add(salslipdata.get(i));
			} else {
				
				System.out.println("Recored No found:");
			}
		}
		return filteredsalslipdata;
		
		
		
		
		
		
	 }
	
	
	
	
 
}//end of InternetService
