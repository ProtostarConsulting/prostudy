package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.ChapterEntity;
import com.protostar.prostudy.entity.RoleSecEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.until.data.UtilityService;

@Api(name = "userService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class UserService {

	@ApiMethod(name = "addUser")
	public UserEntity addUser(UserEntity usr) {
		String nextPRN = UtilityService.getNextPRN(usr.getRole());
		usr.setPRN(nextPRN);

		UserEntity now = usr;
		ofy().save().entity(usr).now();
		System.out.println("now_user :" + now);
		return now;

	}

	@ApiMethod(name = "updateUser")
	public void updateUser(UserEntity usr) {
		Key<UserEntity> now = ofy().save().entity(usr).now();
	}

	@ApiMethod(name = "getUserList")
	public List<UserEntity> getUserList() {
		return ofy().load().type(UserEntity.class).list();
	}

	@ApiMethod(name = "getUserByEmailID")
	public UserEntity getUserByEmailID(@Named("email_id") String email) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("email_id", email).list();
		return (list == null || list.size() == 0) ? null : list.get(0);
	}
	
	@ApiMethod(name = "getUserByRole",path="getUserByRole")
	public List<UserEntity> getUserByRole(@Named("role") String role, @Named("instituteID") Long instituteID) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("role", role).filter("instituteID",instituteID).list();
		return list;
	}
	
	@ApiMethod(name = "getUserByInstitute")
	public List<UserEntity> getUserByInstitute(
			@Named("instituteID") Long instituteID) {
	
		List<UserEntity> userList = ofy().load().type(UserEntity.class)
				.filter("instituteID", instituteID).list();
		return userList;
	}

	@ApiMethod(name = "login")
	public UserEntity login(@Named("email_id") String email,
			@Named("password") String pass) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("email_id", email).list();

		UserEntity foundUser = (list == null || list.size() == 0) ? null : list
				.get(0);
		if (foundUser != null) {
			System.out.println("foundUser:" + foundUser);
			if (foundUser.getPassword().equals(pass)) {
				System.out.println("Pass matched:");
				return foundUser;
			} else {
				System.out.println("Pass NOT matched:");
				return null;
			}
		} else {
			System.out.println("foundUser:" + foundUser);
			return null;

		}

	}

	@ApiMethod(name = "getUserByClass", path = "getUserByClass")
	public List<UserEntity> getUserByClass(@Named("standard") String standard,
			@Named("division") String division, @Named("subject") String subject) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("standard", standard).filter("division", division)
				.filter("subject", subject).list();

		return list;
	}

	@ApiMethod(name = "addOrUpdateRoleSec", path="addOrUpdateRoleSec")
	public void addOrUpdateRoleSec(RoleSecEntity roleSec) {	
		Key<RoleSecEntity> now = ofy().save().entity(roleSec).now();
		System.out.println("roleSec :"+now);				
	}
	
	@ApiMethod(name = "getRoleSecList", path="getRoleSecList")
	public List<RoleSecEntity> getRoleSecList() {
		return ofy().load().type(RoleSecEntity.class).list();
	}
 

	@ApiMethod(name = "getAuthorityByRole")
	public List<RoleSecEntity> getAuthorityByRole(@Named("role") String role) {
	
		List<RoleSecEntity> moduleList = ofy().load().type(RoleSecEntity.class).filter("role", role).list();
		return moduleList;

	}
}