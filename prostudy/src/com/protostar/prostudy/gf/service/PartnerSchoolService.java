package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;

@Api(name = "partnerSchoolService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class PartnerSchoolService {

	@ApiMethod(name = "addPartnerSchool")
	public PartnerSchoolEntity addPartnerSchool(
			PartnerSchoolEntity partnerSchoolEntity) {
		System.out.println("Inside addPartnerSchool");
		ofy().save().entity(partnerSchoolEntity).now();
		return partnerSchoolEntity;
	}

	@ApiMethod(name = "getPSchoolByPSID", path = "getPSchoolByPSID")
	public PartnerSchoolEntity getPSchoolByPSID(@Named("id") Long id) {

		PartnerSchoolEntity pSchool = ofy().load()
				.type(PartnerSchoolEntity.class).id(id).now();
		return pSchool;

	}

	@ApiMethod(name = "getPartnerByInstitute")
	public List<PartnerSchoolEntity> getPartnerByInstitute(
			@Named("instituteID") Long id) {

		List<PartnerSchoolEntity> pSchool = ofy().load()
				.type(PartnerSchoolEntity.class).filter("instituteID", id)
				.list();

		return pSchool;

	}
}// end of ChapterService

