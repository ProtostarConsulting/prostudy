package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.RoleSecEntity;
import com.protostar.prostudy.entity.StudSubEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.protostarAdmin.entities.AccountType;
import com.protostar.prostudy.until.data.ServerMsg;
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
		
/*		if (list.get(0).getStatus() == "suspended" || list.get(0).getStatus() == "inactive") {
			return null;
		} else {
			return (list == null || list.size() == 0) ? null : list.get(0);
		}
*/	}

	@ApiMethod(name = "checkUserAlreadyExist")
	public ServerMsg checkUserAlreadyExist(@Named("email_id") String email_id) {
		ServerMsg serverMsg = new ServerMsg();
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("email_id", email_id).list();

		if (list == null || list.size() == 0) {
			serverMsg.setBool(false);
		} else {
			serverMsg.setBool(true);
		}

		return serverMsg;
	}

	@ApiMethod(name = "getUserByRole", path = "getUserByRole")
	public List<UserEntity> getUserByRole(@Named("role") String role,
			@Named("instituteID") Long instituteID) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("role", role).filter("instituteID", instituteID).list();
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

	@ApiMethod(name = "getStudentsByScheduledExamID", path = "getStudentsByScheduledExamID")
	public List<UserEntity> getStudentsByScheduledExamID(
			@Named("selectedExam") Long exam) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("selectedExam", exam).list();
		return list;
	}

	@ApiMethod(name = "addOrUpdateRoleSec", path = "addOrUpdateRoleSec")
	public void addOrUpdateRoleSec(RoleSecEntity roleSec) {
		Key<RoleSecEntity> now = ofy().save().entity(roleSec).now();
		System.out.println("roleSec :" + now);
	}

	@ApiMethod(name = "getRoleSecListByInstitute", path = "getRoleSecListByInstitute")
	public List<RoleSecEntity> getRoleSecListByInstitute(
			@Named("instituteID") Long instituteID) {
		List<RoleSecEntity> moduleList = ofy().load().type(RoleSecEntity.class)
				.filter("instituteID", instituteID).list();
		return moduleList;
	}

	@ApiMethod(name = "getCurrentUserRoleByInstitute", path = "getCurrentUserRoleByInstitute")
	public List<RoleSecEntity> getCurrentUserRoleByInstitute(
			@Named("instituteID") Long instituteID, @Named("role") String role) {
		List<RoleSecEntity> moduleList = ofy().load().type(RoleSecEntity.class)
				.filter("role", role).filter("instituteID", instituteID).list();

		return moduleList;
	}

	@ApiMethod(name = "getAuthorityByRole")
	public List<RoleSecEntity> getAuthorityByRole(@Named("role") String role,
			@Named("instituteID") Long instituteID) {

		List<RoleSecEntity> moduleList = ofy().load().type(RoleSecEntity.class)
				.filter("role", role).filter("instituteID", instituteID).list();
		return moduleList;

	}

	@ApiMethod(name = "getStudentsBySubjectID", path = "getStudentsBySubjectID")
	public List<UserEntity> getStudentsBySubjectID(@Named("subID") Long subID) {
		System.out.println("subID :" + subID);
		StudSubService studSubService = new StudSubService();

		List<StudSubEntity> studSubEntityList = studSubService
				.getstudBySubId(subID);

		System.out.println("studSubEntityList :" + studSubEntityList);
		List<Long> studIds = new ArrayList<Long>();
		for (StudSubEntity ss : studSubEntityList) {
			studIds.add(ss.getStudID().getId());
		}
		Map<Long, UserEntity> ids = ofy().load().type(UserEntity.class)
				.ids(studIds.toArray(new Long[studIds.size()]));

		Collection<UserEntity> values = ids.values();
		List<UserEntity> outPutList;
		if (values instanceof List)
			outPutList = (List) values;
		else
			outPutList = new ArrayList(values);

		return outPutList;

	}

	@ApiMethod(name = "updateUserStatus", path = "updateUserStatus")
	public void updateUserStatus(UserEntity userEntity) {

		ofy().save().entity(userEntity).now();

	}

	@ApiMethod(name = "getAllAccountTypes")
	public List<AccountType> getAllAccountTypes() {
		return ofy().load().type(AccountType.class).list();
	}

	@ApiMethod(name = "getLogUploadURL")
	public ServerMsg getLogUploadURL() {
		BlobstoreService blobstoreService = BlobstoreServiceFactory
				.getBlobstoreService();
		String createUploadUrl = blobstoreService
				.createUploadUrl("/UploadServlet");
		ServerMsg serverMsg = new ServerMsg();
		serverMsg.setMsg(createUploadUrl);
		return serverMsg;
	}

}