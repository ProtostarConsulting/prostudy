package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.PartnerSchoolEntity;

@Api(name = "partnerSchoolService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class PartnerSchoolService {

	@SuppressWarnings("unused")
	@ApiMethod(name = "addPartnerSchool")
	public void addPartnerSchool(PartnerSchoolEntity partnerSchoolEntity) {
		System.out.println("Inside addPartnerSchool");
		ofy().save().entity(partnerSchoolEntity).now();
	}

	@ApiMethod(name = "getPartnerSchoolByInstitute", path = "getPartnerSchoolByInstitute")
	public List<PartnerSchoolEntity> getPartnerSchoolByInstitute(
			@Named("instituteID") Long instituteID) {

		List<PartnerSchoolEntity> pSchoolList = ofy().load()
				.type(PartnerSchoolEntity.class)
				.filter("instituteID", instituteID).list();
		return pSchoolList;

	}
	
	@ApiMethod(name = "getPSchoolByPSID", path = "getPSchoolByPSID")
	public PartnerSchoolEntity getPSchoolByPSID(@Named("id") Long id) {

		PartnerSchoolEntity pSchool = ofy().load()
				.type(PartnerSchoolEntity.class).id(id).now();
		return pSchool;

	}
}// end of ChapterService

