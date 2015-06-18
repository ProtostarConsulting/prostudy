package com.protostar.medical.records.server.endpoint;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.medical.records.server.data.EMF;
import com.protostar.medical.records.server.data.MyBean;
import com.protostar.medical.records.server.data.Patient;
import com.protostar.medical.records.server.data.PatientInfo;
import com.protostar.medical.records.server.data.PatientInfoUtil;
import com.protostar.medical.records.server.data.RegisterUserEntity;
import com.protostar.medical.records.server.data.UserManagementInfo;
import com.protostar.medical.records.server.data.UserManagement;
import com.protostar.medical.records.server.data.UserManagementInfoUtil;

@Api(name = "usermanagementservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))
public class UserManagementServiceImpl {

	
	@ApiMethod(name = "saveUserRole")
	public MyBean saveUserRole(UserManagementInfo user)
			throws IllegalArgumentException {
		// Store it in Google datastore
		MyBean myBean = new MyBean();
		EntityManager em = null;

		if (user.getId() == null) {
			myBean.setToken("User Added Successfully");
		}

		else{
			myBean.setToken("User Updated Successfully");
		}
		
		UserManagement userEntity = UserManagementInfoUtil.toUserManagement(user);
		try {
			em = EMF.get().createEntityManager();
			em.persist(userEntity);
		} finally {
			em.close();
		}
		
		myBean.setMyData("User Record Added Successfully. " + userEntity.toString() + ", ID:" + userEntity.getId()+", Email ID"+ userEntity.getEmail()+", Role:"+ userEntity.getRole());
		return myBean;
	}
	
	@ApiMethod(name="getAllUserwithRole")
	public List<UserManagementInfo> getAllUserwithRole()
	{
		List<UserManagementInfo> resultList= new ArrayList<UserManagementInfo>();
		MyBean myBean=new MyBean();
		EntityManager em=null;
		
		try {
			em = EMF.get().createEntityManager();
			// Query q = em.createQuery("select * from " +
			// Patient.class.getName());
			Query q = em.createQuery("select u from UserManagement u");
			List<UserManagement> resultList2 = q.getResultList();
			for (UserManagement u : resultList2)
				resultList.add(UserManagementInfoUtil.toUserManagementInfo(u));
		} 

		catch (Exception e)
		{
			e.printStackTrace();
		}
		 return resultList;	
	}
		
	@ApiMethod(name = "getUserByID")
	public UserManagementInfo getUserByID(@Named("id") Long id) {
		
		UserManagementInfo userManagementInfo=null;
		
		MyBean mybean = new MyBean();
		EntityManager em = null;
		try {
			em = EMF.get().createEntityManager();
			Query q = em.createQuery("select u from UserManagement u where u.id ="
					+ id);
			List<UserManagement> resultList = q.getResultList();
			if (resultList.size() > 0) {
				UserManagement user = resultList.get(0);
			userManagementInfo=UserManagementInfoUtil.toUserManagementInfo(user);
			}

		} finally {
			em.close();
		}

		return userManagementInfo;
	}
}
