package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.prostudy.entity.StudSubEntity;
import com.protostar.prostudy.entity.SubjectEntity;
import com.protostar.prostudy.entity.UserEntity;

@Api(name = "studSubService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class StudSubService {
	
	
	@ApiMethod(name = "addStudSubject")
	public StudSubEntity addStudSubject(StudSubEntity data) {
		data.setActive(true);
		Key<StudSubEntity> now2 = ofy().save().entity(data).now();
		data.setId(now2.getId());
		return data;
	}

	@ApiMethod(name = "getSubByStudId", path="getSubByStudId")
	 public List<StudSubEntity> getSubByStudId(@Named("studID") Long studID) {	
	  List<StudSubEntity> subList = ofy().load().type(StudSubEntity.class).filter("studID", Ref.create(Key.create(UserEntity.class, studID))).filter("active", true).list();
	 	  return subList;	  
	 }	
	@ApiMethod(name = "getStudSubByStudIdAndSubId", path="getStudSubByStudIdAndSubId")
	 public StudSubEntity getStudSubByStudIdAndSubId(@Named("studID") Long studID,@Named("subID") Long subID) {	
	  List<StudSubEntity> subList = ofy().load().type(StudSubEntity.class).filter("studID", Ref.create(Key.create(UserEntity.class, studID))).filter("subID", Ref.create(Key.create(SubjectEntity.class, subID))).list();
	 	  return subList.get(0);	  
	 }	
	@ApiMethod(name = "removeStudSubject", path="removeStudSubject")
	public void removeStudSubject(StudSubEntity studsub) {
		Key<StudSubEntity> now = ofy().save().entity(studsub).now();
	}
	
	
	
}
