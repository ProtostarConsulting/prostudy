package com.protostar.billingnstock.hr.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

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




@Api(name = "hrService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.hr.services", ownerName = "com.protostar.billingnstock.hr.services", packagePath = ""))
public class HrService
{
	
	@SuppressWarnings("unused")
	@ApiMethod(name="addemp")
	public void addemp(Employee emp)
	{
		  Key<Employee> now = ofy().save().entity(emp).now();
	
	}
	
	@ApiMethod(name="getAllemp") 
	public List<Employee> getAllemp() {
	  return ofy().load().type(Employee.class).list();
	 }
	
	@ApiMethod(name="getempByID") 
	 public Employee getempByID(@Named("empid") String selectedid) {
	
		Employee Emp = ofy().load().type(Employee.class).filter("empid", selectedid).first().now();

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
	 public List<SalStruct> getAllempsSalStruct() {
	  return ofy().load().type(SalStruct.class).list();
 }
 
	@ApiMethod(name="findsalstruct") 
	 public SalStruct findsalstruct(@Named("empid") String struct) {
	
		SalStruct structq = ofy().load().type(SalStruct.class).filter("empid", struct).first().now();

		return structq;
	 }
	@ApiMethod(name="viewfindsalstruct") 
	 public SalStruct viewfindsalstruct(@Named("empid") String struct) {
	
		SalStruct stru = ofy().load().type(SalStruct.class).filter("empid", struct).first().now();

		return stru;
	 }
	@ApiMethod(name="updatesalinfo")
	public SalStruct updatesalinfo(SalStruct struct)
	{
		  Key<SalStruct> now = ofy().save().entity(struct).now();
		return struct;
		  		
	}
	
	
	 @ApiMethod(name="countofrecord") 
	 public List<SalSlip> countofrecord() {
	  return ofy().load().type(SalSlip.class).list();
 }
	
	
	
	@ApiMethod(name="addgsalslip")
	public void addgsalslip(SalSlip salslip)
	{
		  @SuppressWarnings("unused")
		Key<SalSlip> now = ofy().save().entity(salslip).now();
	 
	}
	//not working
	@ApiMethod(name="displyOnlySelected") 
	 public SalSlip displyOnlySelected(@Named("month") String mon) {
	
		SalSlip month = ofy().load().type(SalSlip.class).filter("month", mon).first().now();

		return month;
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
	
	
 
}//end of InternetService
