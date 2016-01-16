package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.AdminEntity;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.entity.PracticeExamEntity;
import com.protostar.prostudy.entity.StudentEntity;
import com.protostar.prostudy.entity.TeacherEntity;

@Api(name = "instituteService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class InstituteService {

	@ApiMethod(name = "addInstitute")
	public void addInstitute(InstituteEntity insti) {
		Key<InstituteEntity> now = ofy().save().entity(insti).now();
	}

	@ApiMethod(name = "getInstitutes")
	public List<InstituteEntity> getInstitutes() {
		return ofy().load().type(InstituteEntity.class).list();
	}

	@ApiMethod(name = "addInstituteTeachers")
	public void addInstituteTeachers(InstituteEntity teacher) {
		Key<InstituteEntity> now = ofy().save().entity(teacher).now();
	}

	@ApiMethod(name = "addInstituteAdmins")
	public void addInstituteAdmins(AdminEntity admin) {
		Key<AdminEntity> now = ofy().save().entity(admin).now();
	}

	@ApiMethod(name = "addInstituteStudents")
	public void addInstituteStudents(StudentEntity stud) {
		Key<StudentEntity> now = ofy().save().entity(stud).now();
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
