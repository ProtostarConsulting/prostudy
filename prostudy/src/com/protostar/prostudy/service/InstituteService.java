package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.AdminEntity;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.entity.StudentEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.until.data.ServerMsg;
import com.protostar.prostudy.until.data.StudentEntityWrapper;

@Api(name = "instituteService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class InstituteService {

	@ApiMethod(name = "addInstitute")
	public InstituteEntity addInstitute(InstituteEntity insti) {
		Key<InstituteEntity> now = ofy().save().entity(insti).now();
		InstituteEntity instituteEntity = ofy().load().type(InstituteEntity.class).id(now.getId()).now();
		return instituteEntity;
	}

	@ApiMethod(name = "getInstitutes")
	public List<InstituteEntity> getInstitutes() {
		return ofy().load().type(InstituteEntity.class).list();
	}

	@ApiMethod(name = "addInstituteTeachers")
	public void addInstituteTeachers(InstituteEntity teacher) {
		Key<InstituteEntity> now = ofy().save().entity(teacher).now();
		//create UserEntity for each teacher and save.
	}

	@ApiMethod(name = "addInstituteAdmins")
	public ServerMsg addInstituteAdmins(AdminEntity admin) {
		Key<AdminEntity> now = ofy().save().entity(admin).now();
		ServerMsg serverMsg = new ServerMsg();
		serverMsg.setMsg("Added successfully");
		return serverMsg;
	} // {msg:"Added successfully"}

	@ApiMethod(name = "addInstituteStudents") //{list: [{admin1}{admin2}]}
	public void addInstituteStudents(StudentEntityWrapper studentListWrapper) {
		
		List<StudentEntity> studentList = studentListWrapper.getList();
		
		for (StudentEntity studentEntity : studentList) {
			ofy().save().entity(studentEntity);
		}
		
		
		List<UserEntity> userList = new ArrayList<UserEntity>();
		//create UserEntity for each student in studentList and push to userList.
		
		//ofy().save().entity(userList);
	}

	@ApiMethod(name = "getInstituteById")
	public InstituteEntity getInstituteById(@Named("instituteId") String struct) {             

		InstituteEntity stru = ofy().load().type(InstituteEntity.class)
				.filter("instituteId", struct).first().now();

		return stru;
	}
	
	@ApiMethod(name = "editInstitute")
	public void editInstitute(InstituteEntity insti) {
		Key<InstituteEntity> now = ofy().save().entity(insti).now();
	}

}
