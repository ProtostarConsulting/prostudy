package com.protostar.prostudy.service;
import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.googlecode.objectify.Key;

import com.protostar.prostudy.entity.QuestionEntity;



@Api(name = "questionService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class QuestionService {

	@ApiMethod(name = "addQuestion")
	public void addQuestion(QuestionEntity ques) {
		Key<QuestionEntity> now = ofy().save().entity(ques).now();
	}
	
	@ApiMethod(name = "getQuestion")
	public List<QuestionEntity> getQuestion() {
		return ofy().load().type(QuestionEntity.class).list();
	}
	
	@ApiMethod(name = "updateQuestion")
	public void updateQuestion(QuestionEntity ques) {
		Key<QuestionEntity> now = ofy().save().entity(ques).now();
	}
}
