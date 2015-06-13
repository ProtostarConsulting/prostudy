package com.protostar.medical.records.server.endpoint;

import javax.persistence.EntityManager;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.medical.records.server.data.EMF;
import com.protostar.medical.records.server.data.MyBean;
import com.protostar.medical.records.server.data.Patient;
import com.protostar.medical.records.server.data.PatientInfo;
import com.protostar.medical.records.server.data.PatientInfoUtil;
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

		UserManagement userEntity = UserManagementInfoUtil.toUserManagement(user);
		try {
			em = EMF.get().createEntityManager();
			em.persist(userEntity);
		} finally {
			em.close();
		}
		
		myBean.setData("User Record Added Successfully. " + userEntity.toString() + ", ID:" + userEntity.getId()+", Email ID"+ userEntity.getEmail()+", Role:"+ userEntity.getRole());
		return myBean;
	}
}
