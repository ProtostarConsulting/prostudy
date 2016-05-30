package com.protostar.prostudy.gf.service;
import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import javax.inject.Named;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.gf.entity.GFCourierEntity;

@Api(name = "gfCourierService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class GFCourierService {

	@ApiMethod(name="addGFCourier",path="addGFCourier")
	public void addGFCourier(GFCourierEntity gfCourierEntity){
			
		 ofy().save().entity(gfCourierEntity).now();
		 
	}
	
	@ApiMethod(name="getGFCourierByInstitute", path="getGFCourierByInstitute")
	public List<GFCourierEntity> getGFCourierByInstitute (@ Named("instituteID") long instituteID){
		
		List<GFCourierEntity> list = ofy().load().type(GFCourierEntity.class).list();
		
		return list;
		
	}
	
	@ApiMethod(name="getGFCourierById", path="getGFCourierById")
	public GFCourierEntity getGFCourierById (@Named("id") long studID){
		
		GFCourierEntity stud = ofy().load().type(GFCourierEntity.class).id(studID).now();
		
		return stud;
		
	}
}
