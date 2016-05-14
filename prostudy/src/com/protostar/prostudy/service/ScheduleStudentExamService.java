package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.entity.PracticeExamEntity;
import com.protostar.prostudy.entity.ScheduleStudentExamEntity;

@Api(name = "scheduleStudentExamService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ScheduleStudentExamService {

	@ApiMethod(name = "addScheduleStudentExam")
	public void addScheduleStudentExam(ScheduleStudentExamEntity exam) {
		
		ofy().save().entity(exam).now();
		
	}	

}
