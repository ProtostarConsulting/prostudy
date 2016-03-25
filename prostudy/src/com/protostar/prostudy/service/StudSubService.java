package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;

import com.protostar.prostudy.entity.StudSubEntity;

@Api(name = "studSubService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class StudSubService {
	
	
	@ApiMethod(name = "addStudSubject")
	public StudSubEntity addStudSubject(StudSubEntity sub) {
		StudSubEntity now = sub;
		ofy().save().entity(sub).now();
		return now;
	}
	
	@ApiMethod(name = "getStudSubjects")
	public List<StudSubEntity> getSubjects() {
		return ofy().load().type(StudSubEntity.class).list();
	}

}
