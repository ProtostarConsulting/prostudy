package com.protostar.billingnstock.crm.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.crm.entities.Opportunity;

@Api(name = "opportunityService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.crm.services", ownerName = "com.protostar.billingnstock.crm.services", packagePath = ""))
public class OpportunityService {

	@ApiMethod(name = "addopportunity")
	public void addopportunity(Opportunity opportunity) {
		Key<Opportunity> now = ofy().save().entity(opportunity).now();

	}

	@ApiMethod(name = "getAllopportunity")
	public List<Opportunity> getAllopportunity() {
		return ofy().load().type(Opportunity.class).list();
	}

	@ApiMethod(name = "getopportunityById")
	public Opportunity getopportunityById(@Named("oid") String selectedid) {
		Opportunity opportunity = ofy().load().type(Opportunity.class)
				.filter("oid", selectedid).first().now();
		return opportunity;
	}
	/*
	 * @ApiMethod(name="addupdatetask") public void addupdatetask(Lead lead) {
	 * Key<Lead> now = ofy().save().entity(lead).now();
	 * 
	 * }
	 */

}// end of InternetService
