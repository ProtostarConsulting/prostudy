package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.DivisionEntity;

@Api(name = "divisionService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class DivisionService {


	@ApiMethod(name = "addDivision")
	public DivisionEntity addDivision(DivisionEntity div) {
		DivisionEntity now = div;
		ofy().save().entity(div).now();
		return now;
	}

	@ApiMethod(name = "getDivision")
	public List<DivisionEntity> getStandard() {
		return ofy().load().type(DivisionEntity.class).list();
	}
	
	@ApiMethod(name = "getDivisionByStandard")
	 public List<DivisionEntity> getDivisionByStandard(@Named("standardID") Long standardID) {
		System.out.println("inside getDivisionByStandard");
	  List<DivisionEntity> divisionList = ofy().load().type(DivisionEntity.class).filter("standardID", standardID).list();
	  return divisionList;
	  
	 }
}