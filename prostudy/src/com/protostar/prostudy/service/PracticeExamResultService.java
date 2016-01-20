package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;

import com.protostar.prostudy.entity.PracticeExamResultEntity;

@Api(name = "practiceExamResultService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class PracticeExamResultService {

	@ApiMethod(name = "addPracticeExamResult")
	public void addPracticeExamResult(PracticeExamResultEntity res) {
		Key<PracticeExamResultEntity> now = ofy().save().entity(res).now();
	}

	@ApiMethod(name = "getPracticeExamResult")
	public List<PracticeExamResultEntity> getPracticeExamResult() {
		return ofy().load().type(PracticeExamResultEntity.class).list();
	}

	@ApiMethod(name = "getPracticeExamResultbyID")
	public List<PracticeExamResultEntity> getPracticeExamResultbyID(
			@Named("userId") String struct) {

		return ofy().load()
				.type(PracticeExamResultEntity.class)
				.filter("userId", struct).list();

	}

}
