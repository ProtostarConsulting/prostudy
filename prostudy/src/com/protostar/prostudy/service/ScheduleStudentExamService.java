package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.ScheduleStudentExamEntity;

@Api(name = "assignExamService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ScheduleStudentExamService {

	@ApiMethod(name = "assignExamToStudent")
	public void assignExamToStudent(ScheduleStudentExamEntity exam) {
		
		ofy().save().entity(exam).now();
		
	}	
	
	@ApiMethod(name = "getExamAssignedStudents")
	public List<ScheduleStudentExamEntity> getExamAssignedStudents(@Named("id") Long id) {
		
		List<ScheduleStudentExamEntity> list = (List<ScheduleStudentExamEntity>) ofy().load()
				.type(ScheduleStudentExamEntity.class).list();
		
		return list;
		
	}	

}
