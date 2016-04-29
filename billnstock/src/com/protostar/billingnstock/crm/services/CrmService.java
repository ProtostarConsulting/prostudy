package com.protostar.billingnstock.crm.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.Date;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.billingnstock.crm.entities.Contact;
import com.protostar.billingnstock.crm.entities.Lead;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.user.entities.BusinessEntity;

@Api(name = "crmService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.crm.services", ownerName = "com.protostar.billingnstock.crm.services", packagePath = ""))
public class CrmService {

	@SuppressWarnings("unused")
	@ApiMethod(name = "addlead")
	public void addlead(Lead lead) {
		lead.setCreatedDate(new Date());		
		Key<Lead> now = ofy().save().entity(lead).now();

	}

	@ApiMethod(name = "getAllleads")
	public List<Lead> getAllleads(@Named("id") Long id) {
		List<Lead> filteredlead = ofy()
				.load()
				.type(Lead.class)
				.filter("business",
						Ref.create(Key.create(BusinessEntity.class, id)))
				.list();
		return filteredlead;

	}

	@ApiMethod(name = "getLeadById")
	public Lead getLeadById(@Named("id") Long selectedid) {

		Lead lead = ofy().load().type(Lead.class).id(selectedid).now();

		return lead;
	}

	@ApiMethod(name = "addupdatetask")
	public void addupdatetask(Lead lead) {
		//lead.setModifiedBy(lead.getLoggedInUser().getEmail_id());
		lead.setModifiedDate(new Date());
		ofy().save().entity(lead).now();

	}

	@ApiMethod(name = "addcontact")
	public void addcontact(Contact contact) {
		contact.setCreatedDate(new Date());
		ofy().save().entity(contact).now();

	}
	@ApiMethod(name = "updatecontact")
	public void updatecontact(Contact contact) {
		contact.setModifiedDate(new Date());
		ofy().save().entity(contact).now();

	}
	

	@ApiMethod(name = "getAllcontact")
	public List<Contact> getAllcontact(@Named("id") Long id) {

		List<Contact> filteredContact = ofy()
				.load()
				.type(Contact.class)
				.filter("business",
						Ref.create(Key.create(BusinessEntity.class, id)))
				.list();
		return filteredContact;

	}

	@ApiMethod(name = "getContactById")
	public Contact getContactById(@Named("id") Long contactNo) {
		Contact contact = ofy().load().type(Contact.class).id(contactNo).now();
		return contact;
	}

	@ApiMethod(name = "getContactByCustomerId", path = "getContactByCustomerId")
	public List<Contact> getContactByCustomerId(@Named("id") Long CustId) {
		List<Contact> contact = ofy()
				.load()
				.type(Contact.class)
				.filter("customer",
						Ref.create(Key.create(Customer.class, CustId)))
				.list();

		return contact;
	}

}// end of InternetService
