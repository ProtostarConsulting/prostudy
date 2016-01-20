package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.PracticeExamEntity;

@Api(name = "practiceExamService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class PracticeExamService {

	@ApiMethod(name = "addPracticeExam")
	public void addPracticeExam(PracticeExamEntity exam) {
		Key<PracticeExamEntity> now = ofy().save().entity(exam).now();
	}

	@ApiMethod(name = "getPracticeExams")
	public List<PracticeExamEntity> getPracticeExams() {
		return ofy().load().type(PracticeExamEntity.class).list();
	}

	/*
	 * @ApiMethod(name = "getPracticeExamById") public List<PracticeExamEntity>
	 * getPracticeExamById(@Named("examId") String idvalue) { return
	 * ofy().load().type(PracticeExamEntity.class) .filter("examId",
	 * idvalue).list();
	 * 
	 * }
	 */

	@ApiMethod(name = "getPracticeExamById")
	public PracticeExamEntity getPracticeExamById(@Named("examId") String struct) {

		PracticeExamEntity stru = ofy().load().type(PracticeExamEntity.class)
				.filter("examId", struct).first().now();

		return stru;
	}

	@ApiMethod(name = "updatePracticeExam")
	public void updatePracticeExam(PracticeExamEntity exam) {
		Key<PracticeExamEntity> now = ofy().save().entity(exam).now();
	}

	@ApiMethod(name = "likeCount")
	public PracticeExamEntity likeCount(@Named("examId") String struct) {
		PracticeExamEntity like = ofy().load().type(PracticeExamEntity.class)
				.filter("examId", struct).first().now();

		return like;

	}

	@ApiMethod(name = "dislikeCount")
	public PracticeExamEntity dislikeCount(@Named("examId") String struct) {
		PracticeExamEntity dislike = ofy().load()
				.type(PracticeExamEntity.class).filter("examId", struct)
				.first().now();

		return dislike;
	}

}
