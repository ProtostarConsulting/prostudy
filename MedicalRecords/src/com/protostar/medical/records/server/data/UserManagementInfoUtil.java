package com.protostar.medical.records.server.data;



public class UserManagementInfoUtil {


	

	public static UserManagementInfo toUserManagementInfo(UserManagement um) {

		UserManagementInfo userManagementInfo = new UserManagementInfo();
		userManagementInfo.setId(um.getId());
		userManagementInfo.setEmail(um.getEmail());
		userManagementInfo.setRole(um.getRole());

		return userManagementInfo;
	}

	//For Save value in Database
	
	public static UserManagement toUserManagement(UserManagementInfo umi) {
		UserManagement userManagement = new UserManagement();
		userManagement.setId(umi.getId());
		userManagement.setEmail(umi.getEmail());
		userManagement.setRole(umi.getRole());

		return userManagement;

	}

}
