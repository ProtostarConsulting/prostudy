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
import com.protostar.medical.records.server.data.RegisterUserEntityInfo;

@Api(name = "registrationservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))
public class RegistrationService {
	
	@ApiMethod(name = "saveRegiUser")
	public MyBean saveRegiUser(RegisterUserEntityInfo regiUser)
	 {
		MyBean mybean = new MyBean();
		System.out.println("Came to Server side :" + regiUser.getFirstName());
		EntityManager en=null;
		RegisterUserEntity registerUserEntity = new RegisterUserEntity();
		
		if(regiUser.getId() == 0)
		{
			registerUserEntity.setFirstName(regiUser.getFirstName());
			registerUserEntity.setLastName(regiUser.getLastName());
			registerUserEntity.setMobileNumber(regiUser.getMobileNumber());
			registerUserEntity.setEmailID(regiUser.getEmailID());
			mybean.setToken("R");
		}
		else
		{
		registerUserEntity.setId(regiUser.getId());
		registerUserEntity.setFirstName(regiUser.getFirstName());
		registerUserEntity.setLastName(regiUser.getLastName());
		registerUserEntity.setMobileNumber(regiUser.getMobileNumber());
		registerUserEntity.setEmailID(regiUser.getEmailID());
		mybean.setToken("U");
		}
		try 
		{
			en=EMF.get().createEntityManager();
			en.persist(registerUserEntity);
			mybean.setMyData("Registration is done successfully");
		}
		finally 
		{
			en.close();
		}
		
		
		return mybean;
	}
	
	
	@ApiMethod(name = "getAllRegisteredUsers")
	public List<RegisterUserEntity> getAllRegisteredUsers()  {

		List<RegisterUserEntity> resultList = new ArrayList<RegisterUserEntity>();
		EntityManager em = null;

		
		try {
			em = EMF.get().createEntityManager();
			Query q =em.createQuery("SELECT c FROM RegisterUserEntity c", RegisterUserEntity.class); 
	
			resultList = q.getResultList();

		} finally {
			em.close();
		}
		return resultList;
	}
	

	@ApiMethod(name = "getUserById")
	public RegisterUserEntity getUserById(@Named("userId") Long userId)  {

		RegisterUserEntity registerUserEntity = new RegisterUserEntity();
		EntityManager em = null;
		
		try {
			em = EMF.get().createEntityManager();
			Query q =em.createQuery("SELECT c FROM RegisterUserEntity c where c.id = "+userId, RegisterUserEntity.class); 
			registerUserEntity = (RegisterUserEntity) q.getSingleResult();
			
		} finally {
			em.close();
		}
		return registerUserEntity;
	}	
}
