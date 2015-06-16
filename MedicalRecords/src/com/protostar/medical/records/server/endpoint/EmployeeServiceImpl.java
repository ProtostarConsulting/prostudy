package com.protostar.medical.records.server.endpoint;

import javax.persistence.EntityManager;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.medical.records.server.data.EMF;
import com.protostar.medical.records.server.data.Employee;
import com.protostar.medical.records.server.data.EmployeeInfo;
import com.protostar.medical.records.server.data.EmployeeInfoUtil;
import com.protostar.medical.records.server.data.MyBean;


@Api(name = "employeeservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))
public class EmployeeServiceImpl {

	@ApiMethod(name="saveEmployee")
	public MyBean saveEmployee(EmployeeInfo employee)
	{
		MyBean myBean = new MyBean();
		EntityManager em=null;
		
		Employee employeeEntity= EmployeeInfoUtil.toEmployee(employee);
		try 
		{	
			em=EMF.get().createEntityManager();
			em.persist(employeeEntity);
		} 
		catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		myBean.setData("Employee added successfully" + employeeEntity.toString() +"ID"+ employeeEntity.getId() + "Name" + employeeEntity.getFirstName());
		return myBean;
	}
}
