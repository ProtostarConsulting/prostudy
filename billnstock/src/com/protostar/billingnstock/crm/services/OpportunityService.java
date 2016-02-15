package com.protostar.billingnstock.crm.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.crm.entities.Lead;
import com.protostar.billingnstock.crm.entities.Opportunity;

@Api(name = "opportunityService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.crm.services", ownerName = "com.protostar.billingnstock.crm.services", packagePath = ""))
public class OpportunityService {

	@ApiMethod(name = "addopportunity")
	public void addopportunity(Opportunity opportunity) {
		Key<Opportunity> now = ofy().save().entity(opportunity).now();

	}

	@ApiMethod(name = "getAllopportunity")
	public List<Opportunity> getAllopportunity(@Named("id") Long id) {
	
		List<Opportunity> opportunity =ofy().load().type(Opportunity.class).list();
		  
			List<Opportunity> filteredopportunity= new ArrayList<Opportunity>();

			for (int i = 0; i < opportunity.size(); i++) {
				if (opportunity.get(i).getLoggedInUser().getBusinessAccount().getId().equals(id)){
					
					filteredopportunity.add(opportunity.get(i));
				} else {
					
					System.out.println("Recored No found:");
				}
			}
			return filteredopportunity;
		 
		
		
	}

	@ApiMethod(name = "getopportunityById")
	public Opportunity getopportunityById(@Named("id") Long selectedid) {
		Opportunity opportunity = ofy().load().type(Opportunity.class).id(selectedid).now();
		return opportunity;
	}
	/*
	 * @ApiMethod(name="addupdatetask") public void addupdatetask(Lead lead) {
	 * Key<Lead> now = ofy().save().entity(lead).now();
	 * 
	 * }
	 */

}// end of InternetService
