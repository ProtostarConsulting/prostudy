package com.protostar.billingnstock.proadmin.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.billingnstock.proadmin.entities.AccountType;
import com.protostar.billingnstock.user.entities.BusinessEntity;
import com.protostar.billingnstock.user.entities.UserEntity;

@Api(name = "proadminService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.proadmin.services", ownerName = "com.protostar.billingnstock.proadmin.services", packagePath = ""))
public class ProAdminService {
	@ApiMethod(name = "addAccountType")
	public void addAccountType(AccountType account) {
		ofy().save().entity(account).now();

	}

	@ApiMethod(name = "getallAccountType")
	public List<AccountType> getallAccountType() {
		return ofy().load().type(AccountType.class).list();
	}

	@ApiMethod(name = "getAccountTypeById")
	public AccountType getAccountTypeById(@Named("id") Long id) {
		return ofy().load().type(AccountType.class).id(id).now();
	}

	@ApiMethod(name = "initsetup")
	public void initsetup() {
		try{
		AccountType accounttype = new AccountType();
		accounttype.setAccountName("Free");
		accounttype.setDescription("Free for upto 2 users");
		accounttype.setMaxuser("2");
		accounttype.setPaymentDesc("Free no charges");
		ofy().save().entity(accounttype).now();
		AccountType accounttype1 = new AccountType();
		accounttype1.setAccountName("Silver");
		accounttype1.setDescription("Good for upto 20 users");
		accounttype1.setMaxuser("20");
		accounttype1.setPaymentDesc("Rs. 4000 PM + Tax");
		ofy().save().entity(accounttype1).now();
		AccountType accounttype2 = new AccountType();
		accounttype2.setAccountName("Gold");
		accounttype2.setDescription("20 to 50 users");
		accounttype2.setMaxuser("50");
		accounttype2.setPaymentDesc("Rs. 8000 PM + Tax");
		ofy().save().entity(accounttype2).now();
		AccountType accounttype3 = new AccountType();
		accounttype3.setAccountName("Platinum");
		accounttype3.setDescription("50 to 500 users");
		accounttype3.setMaxuser("500");
		accounttype3.setPaymentDesc("Rs. 25,000 PM + Tax");
		ofy().save().entity(accounttype3).now();
		
		Thread.sleep(30000);
		
		}
		catch(Exception e)
		{
			
		}
		////////////////////////// create 2 protostar user /////////////////////////
		
		
		Date date = new Date();
		String DATE_FORMAT = "dd/MM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

		List<AccountType> accountt = ofy().load().type(AccountType.class).list();
		AccountType filteredaccount=new AccountType();
		for (int i = 0; i < accountt.size(); i++) {
			if(accountt.get(i).getAccountName().equals("Platinum")){
				filteredaccount=accountt.get(i);
			}
		}
		
		BusinessEntity businessEntity = new BusinessEntity();
		businessEntity.setAdminFirstName("ganesh");
		businessEntity.setAdminGmailId("ganesh.lawande@protostar.co.in");
		businessEntity.setAdminLastName("Lawande");
		businessEntity.setBusinessName("Protostar");
		businessEntity.setAccounttype(filteredaccount);
		businessEntity.setRegisterDate(sdf.format(date));

		ofy().save().entity(businessEntity).now();

		UserEntity userEntity = new UserEntity();
		userEntity.setBusinessAccount(businessEntity);
		userEntity.setEmail_id("ganesh.lawande@protostar.co.in");
		userEntity.setFirstName("ganesh");
		userEntity.setLastName("Lawande");
		userEntity.setIsGoogleUser(true);
		userEntity.setAuthority(Arrays.asList("admin"));
		ofy().save().entity(userEntity).now();
			
		//------------------------------
			
		UserEntity userEntity1 = new UserEntity();
		userEntity1.setBusinessAccount(businessEntity);
		userEntity1.setEmail_id("pushpak.pimpale@protostarcs.com");
		userEntity1.setFirstName("pushpak");
		userEntity1.setLastName("pimpale");
		userEntity1.setIsGoogleUser(true);
		userEntity1.setAuthority(Arrays.asList("admin"));
		ofy().save().entity(userEntity1).now();
		
		
		/////////////////////
		
		

	}

	/*
	 * @ApiMethod(name="getfreeAccountTypeRecord") public List<AccountType>
	 * getfreeAccountTypeRecord(@Named("accountName") String type) { return
	 * ofy().load().type(AccountType.class).filter("accountName", type).list();
	 * }
	 */

}// end of InternetService
