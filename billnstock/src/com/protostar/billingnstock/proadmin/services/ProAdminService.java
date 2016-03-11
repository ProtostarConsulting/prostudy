package com.protostar.billingnstock.proadmin.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;
import com.protostar.billingnstock.proadmin.entities.AccountType;




@Api(name = "proadminService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.proadmin.services", ownerName = "com.protostar.billingnstock.proadmin.services", packagePath = ""))
public class ProAdminService
{
	@ApiMethod(name="addAccountType")
	public void addAccountType(AccountType account)
	{
	 ofy().save().entity(account).now();
	
	}
	
	
	@ApiMethod(name="getallAccountType")
	public List<AccountType> getallAccountType()
	{
	return ofy().load().type(AccountType.class).list();
	}
	
	@ApiMethod(name="getAccountTypeById")
	public AccountType getAccountTypeById(@Named("id") Long id)
	{
	return ofy().load().type(AccountType.class).id(id).now();
	}
	
}//end of InternetService
