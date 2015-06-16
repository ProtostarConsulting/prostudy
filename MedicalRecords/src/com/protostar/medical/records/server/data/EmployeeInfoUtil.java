package com.protostar.medical.records.server.data;

public class EmployeeInfoUtil {


	public static EmployeeInfo toEmployeeInfo(Employee e)
	{
		EmployeeInfo employeeInfo= new EmployeeInfo();
		employeeInfo.setId(e.getId());
		employeeInfo.setFirstName(e.getFirstName());
		employeeInfo.setLastName(e.getLastName());
		employeeInfo.setAddressLine1(e.getAddressLine1());
		employeeInfo.setAddressLine2(e.getAddressLine2());
		employeeInfo.setCity(e.getCity());
		employeeInfo.setPin(e.getPin());
		employeeInfo.setMoboileNo(e.getMoboileNo());

		return employeeInfo;
	}
	
	public static Employee toEmployee(EmployeeInfo ei)
	{
		Employee employee=new Employee();
		employee.setId(ei.getId());
		employee.setFirstName(ei.getFirstName());
		employee.setLastName(ei.getLastName());
		employee.setAddressLine1(ei.getAddressLine1());
		employee.setAddressLine2(ei.getAddressLine2());
		employee.setCity(ei.getCity());
		employee.setPin(ei.getPin());
		employee.setMoboileNo(ei.getMoboileNo());

		return employee;
	}

}
