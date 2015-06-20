package com.protostar.medical.records.server.endpoint;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.medical.records.server.data.EMF;
import com.protostar.medical.records.server.data.Employee;
import com.protostar.medical.records.server.data.EmployeeInfo;
import com.protostar.medical.records.server.data.EmployeeInfoUtil;
import com.protostar.medical.records.server.data.MyBean;
import com.protostar.medical.records.server.data.PatientInfo;


@Api(name = "employeeservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))
public class EmployeeServiceImpl {

	@ApiMethod(name = "saveEmployee")
	public MyBean saveEmployee(EmployeeInfo employee)
			throws IllegalArgumentException {
		// Store it in Google datastore
		MyBean myBean = new MyBean();
		EntityManager em = null;

		if (employee.getId() == null) {
			myBean.setToken("R");
		}
		else{
			myBean.setToken("U");
		}
		
		Employee employeeEntity = EmployeeInfoUtil.toEmployee(employee);
		try {
			em = EMF.get().createEntityManager();
			em.persist(employeeEntity);
		} finally {
			em.close();
		}

		myBean.setMyData("Employee Record Added Successfully. "
				+ employeeEntity.toString() + ", ID:" + employeeEntity.getId());
		return myBean;	
	}
	
	@ApiMethod(name="getAllEmployee")
	public List<EmployeeInfo> getAllEmployee(){
		List<EmployeeInfo> resultList= new ArrayList<EmployeeInfo>();
		
		MyBean myBean=new MyBean();
		EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			Query q=em.createQuery("select e from Employee e");
			List<Employee> resuList2=q.getResultList();
			
			for(Employee e: resuList2)
				resultList.add(EmployeeInfoUtil.toEmployeeInfo(e));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally{
			em.close();
		}
		
		return resultList;
		
	}
}
