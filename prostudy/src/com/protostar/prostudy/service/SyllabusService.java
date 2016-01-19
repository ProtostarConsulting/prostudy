package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.SyllabusEntity;

@Api(name = "syllabusService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class SyllabusService {
	
	
	 @ApiMethod(name="addSyllabus") 
	 public void addSyllabus(SyllabusEntity in) {
	  Key<SyllabusEntity> now = ofy().save().entity(in).now();
	 }
	 @ApiMethod(name="getSyllabus") 
	 public List<SyllabusEntity> getSyllabus() {
	  return ofy().load().type(SyllabusEntity.class).list();
	 }

		@ApiMethod(name = "getByBoard")
		public List<SyllabusEntity> getByBoard(@Named("board") String brdvalue) {
		return ofy().load().type(SyllabusEntity.class).filter("board", brdvalue).list();
		}
	
}
