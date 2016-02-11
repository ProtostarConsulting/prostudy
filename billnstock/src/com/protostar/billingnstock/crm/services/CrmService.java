package com.protostar.billingnstock.crm.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.crm.entities.Contact;
import com.protostar.billingnstock.crm.entities.Lead;
import com.protostar.billingnstock.hr.entities.SalStruct;




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
	
	 public List<Lead> getAllleads(@Named("id") Long id) {
	  
	  List<Lead> lead =ofy().load().type(Lead.class).list();
	  
		List<Lead> filteredlead= new ArrayList<Lead>();

		for (int i = 0; i < lead.size(); i++) {
			if (lead.get(i).getLoggedInUser().getBusinessAccount().getId().equals(id)){
				
				filteredlead.add(lead.get(i));
			} else {
				
				System.out.println("Recored No found:");
			}
		}
		return filteredlead;
	 
	 }
	
	@ApiMethod(name="getLeadById") 
	 public Lead getLeadById(@Named("id") String selectedid) {
	
		Lead lead = ofy().load().type(Lead.class).filter("id", selectedid).first().now();

		return lead;
	 }
	@ApiMethod(name="addupdatetask")
	public void addupdatetask(Lead lead)
	{
		  Key<Lead> now = ofy().save().entity(lead).now();
	
	}
	
	@ApiMethod(name="addcontact")
	public void addcontact(Contact contact)
	{
		  Key<Contact> now = ofy().save().entity(contact).now();
	
	}
	
 
	@ApiMethod(name="getAllcontact") 
	
	 public List<Contact> getAllcontact() {
	  return ofy().load().type(Contact.class).list();
	 }
	
	
	@ApiMethod(name="getContactById") 
	 public Contact getContactById(@Named("cid") String contactNo) {
	
		Contact contact = ofy().load().type(Contact.class).filter("cid", contactNo).first().now();

		return contact;
	 }
	
	
}//end of InternetService
