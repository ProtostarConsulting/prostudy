package com.protostar.billingnstock.crm.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.crm.entities.Lead;




@Api(name = "crmService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.crm.services", ownerName = "com.protostar.billingnstock.crm.services", packagePath = ""))
public class CrmService
{
	
	@SuppressWarnings("unused")
	@ApiMethod(name="addlead")
	public void addlead(Lead lead)
	{
		  Key<Lead> now = ofy().save().entity(lead).now();
	
	}
	
	@ApiMethod(name="getAllleads") 
	
	 public List<Lead> getAllleads() {
	  return ofy().load().type(Lead.class).list();
	 }
	
	@ApiMethod(name="getLeadById") 
	 public Lead getLeadById(@Named("id") String selectedid) {
	
		Lead lead = ofy().load().type(Lead.class).filter("id", selectedid).first().now();

		return lead;
	 }
	
	
 
}//end of InternetService
