package com.protostar.server.endpoint;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.crm.server.data.Customer;
import com.protostar.crm.server.data.CustomerInfo;
import com.protostar.crm.server.data.CustomerInfoUtil;
import com.protostar.crm.server.data.EMF;
import com.protostar.crm.server.data.MyBean;
import com.protostar.crm.server.data.Patient;
import com.protostar.crm.server.data.PatientInfo;
import com.protostar.crm.server.data.PatientInfoUtil;

@Api(name = "newcustomerservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))
public class New_CustomerServiceImpl {

	@ApiMethod(name = "saveCustomer")
	public MyBean saveCustomer(CustomerInfo customer) {
		
		MyBean myBean=new MyBean();
		EntityManager em=null;
		
		Customer custonerEntity=CustomerInfoUtil.toCustomer(customer);
		
		if(customer.getId()==0)
		{
			myBean.setToken("R");
		}
		else
		{
			myBean.setToken("U");
		}
		try {
			em = EMF.get().createEntityManager();
			em.persist(custonerEntity);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally{
			em.close();
		}
		

		myBean.setMyData("Customer Added Successfully" + custonerEntity.toString() +",ID:"+custonerEntity.getCust_id());
		return myBean;
	}
	
	
	@ApiMethod(name = "getAllCustomers")
	public List<CustomerInfo> getAllCustomers()  {

		List<CustomerInfo> resultList = new ArrayList<CustomerInfo>();
		EntityManager em = null;

		
		try {
			em = EMF.get().createEntityManager();
//			Query q = em.createQuery("select * from " + Patient.class.getName());
			Query q = em.createQuery("select c from Customer c");
			List<Customer> resultList2 = q.getResultList();
			for (Customer c: resultList2)
				resultList.add(CustomerInfoUtil.toCustomerInfo(c));

		} 
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally {
			em.close();
		}
		return resultList;
	}
	
	
	@ApiMethod(name = "getCustomerByID")
	public CustomerInfo getCustomerByID(@Named("id")Long id) {
		CustomerInfo customerInfo = null;
		EntityManager em = null;
		try {
			em = EMF.get().createEntityManager();
			Query q = em
					.createQuery("select c from Customer c where c.id ="
							+ id);
			List<Customer> resultList = q.getResultList();
			if (resultList.size() > 0) {
				Customer customer = resultList.get(0);
				customerInfo = CustomerInfoUtil.toCustomerInfo(customer);
			}

		} finally {
			em.close();
		}
		
		return customerInfo;
	}
}
