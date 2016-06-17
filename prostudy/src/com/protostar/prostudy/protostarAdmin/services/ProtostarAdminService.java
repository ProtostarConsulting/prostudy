package com.protostar.prostudy.protostarAdmin.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.protostarAdmin.entities.AccountType;

@Api(name = "protostarAdminService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.protostarAdmin.services", ownerName = "com.protostar.prostudy.protostarAdmin.services", packagePath = ""))
public class ProtostarAdminService {

	private static final Logger log = Logger.getLogger(ProtostarAdminService.class
			.getName());

	@ApiMethod(name = "addAccountType")
	public void addAccountType(AccountType account) {
		ofy().save().entity(account).now();

	}
	
	@ApiMethod(name = "getallAccountType")
	public List<AccountType> getallAccountType() {
		log.info("Inside getallAccountType.");
		try {
			return ofy().load().type(AccountType.class).list();
		} catch (Exception e) {
			log.info("Error Ocuured: " + e.getStackTrace());
		}
		return null;
	}

	@ApiMethod(name = "getAccountTypeById")
	public AccountType getAccountTypeById(@Named("id") Long id) {
		 AccountType type = ofy().load().type(AccountType.class).id(id).now();
		 return type;
	}

/*	@ApiMethod(name = "updateAccountType")
	public Key<InstituteEntity> updateAccountType(@Named("instituteID") long instituteID , InstituteEntity insti) {
		
		InstituteEntity selected = ofy().load().type(InstituteEntity.class).filter("instituteID" , instituteID).first().now();
		selected.setAccounttype(insti.getAccounttype());
		
		Key<InstituteEntity> now = ofy().save().entity(selected).now();
		return now;
	}
*/	
	@ApiMethod(name = "initsetupnext")
	public void initsetupnext() {
		try {
			Date date = new Date();
			String DATE_FORMAT = "dd/MM/yyyy";
			SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

			List<AccountType> accountt = ofy().load().type(AccountType.class)
					.list();
			AccountType filteredaccount = new AccountType();
			for (int i = 0; i < accountt.size(); i++) {
				if (accountt.get(i).getAccountName().equals("Platinum")) {
					filteredaccount = accountt.get(i);
				}
			}

			InstituteEntity instituteEntity = new InstituteEntity();
			
			instituteEntity.setName("Protostar");
			instituteEntity.setAccounttype(filteredaccount);
			instituteEntity.setRegisterDate(sdf.format(date));

			ofy().save().entity(instituteEntity).now();

			UserEntity userEntity1 = new UserEntity();
			userEntity1.setInstituteID(instituteEntity.getID());
			userEntity1.setEmail_id("ganesh.lawande@protostar.co.in");
			userEntity1.setFirstName("Ganesh");
			userEntity1.setLastName("Lawande");
			userEntity1.setIsGoogleUser(true);
			userEntity1.setAuthority(Arrays.asList("admin"));
			userEntity1.setRole("Admin");
			ofy().save().entity(userEntity1).now();

			// ------------------------------

			UserEntity userEntity2 = new UserEntity();
			userEntity2.setInstituteID(instituteEntity.getID());
			userEntity2.setEmail_id("pushpak.pimpale@protostarcs.com");
			userEntity2.setFirstName("Pushpak");
			userEntity2.setLastName("Pimpale");
			userEntity2.setIsGoogleUser(true);
			userEntity2.setAuthority(Arrays.asList("admin"));
			userEntity2.setRole("Admin");
			ofy().save().entity(userEntity2).now();
			
			// ------------------------------

			UserEntity userEntity4 = new UserEntity();
			userEntity4.setInstituteID(instituteEntity.getID());
			userEntity4.setEmail_id("aniket.bhalsing@protostar.co.in");
			userEntity4.setFirstName("Aniket");
			userEntity4.setLastName("Bhalsing");
			userEntity4.setIsGoogleUser(true);
			userEntity4.setAuthority(Arrays.asList("admin"));
			userEntity4.setRole("Admin");
			ofy().save().entity(userEntity4).now();
			
			// ------------------------------
			
			UserEntity userEntity3 = new UserEntity();
			userEntity3.setInstituteID(instituteEntity.getID());
			userEntity3.setEmail_id("ashvinigokale@gmail.com");
			userEntity3.setFirstName("Ashvini");
			userEntity3.setLastName("Gokale");
			userEntity3.setIsGoogleUser(true);
			userEntity3.setAuthority(Arrays.asList("admin"));
			userEntity3.setRole("Admin");
			ofy().save().entity(userEntity3).now();			
		} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@ApiMethod(name = "initsetup")
	public void initsetup() {
		try {
			AccountType accounttype = new AccountType();
			accounttype.setAccountName("Free");
			accounttype.setDescription("Free for upto 250 users");
			accounttype.setMaxuser("250");
			accounttype.setPaymentDesc("Free no charges");
			ofy().save().entity(accounttype).now();
			AccountType accounttype1 = new AccountType();
			accounttype1.setAccountName("Silver");
			accounttype1.setDescription("Good for upto 500 users");
			accounttype1.setMaxuser("500");
			accounttype1.setPaymentDesc("Rs. 4000 PM + Tax");
			ofy().save().entity(accounttype1).now();
			AccountType accounttype2 = new AccountType();
			accounttype2.setAccountName("Gold");
			accounttype2.setDescription("Good for 500 to 750 users");
			accounttype2.setMaxuser("750");
			accounttype2.setPaymentDesc("Rs. 8000 PM + Tax");
			ofy().save().entity(accounttype2).now();
			AccountType accounttype3 = new AccountType();
			accounttype3.setAccountName("Platinum");
			accounttype3.setDescription("Good for 750 to 1000 users");
			accounttype3.setMaxuser("1000");
			accounttype3.setPaymentDesc("Rs. 25,000 PM + Tax");
			ofy().save().entity(accounttype3).now();
		} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@ApiMethod(name = "getAllemp")
	public List<UserEntity> getAllemp() {
		return ofy().load().type(UserEntity.class).list();
	}

}// end of InternetService
