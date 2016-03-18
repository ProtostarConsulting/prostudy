package com.protostar.billingnstock.account.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.account.entities.AccountEntity;
import com.protostar.billingnstock.account.entities.PayableEntity;
import com.protostar.billingnstock.account.entities.ReceivableEntity;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;
import com.protostar.billingnstock.user.entities.UserEntity;

@Api(name = "accountService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.cust.services", ownerName = "com.protostar.billingnstock.stock.cust.services", packagePath = ""))
public class AccountService {
	
	@ApiMethod(name = "addAccount")
	public void addAccount(AccountEntity accountEntity) {
				
		ofy().save().entity(accountEntity).now();
	
	}

	@ApiMethod(name = "getAllAccountsByBusiness")
	public List<AccountEntity> getAllAccountsByBusiness(@Named("id") Long id) {
		
		List<AccountEntity> accountList=ofy().load().type(AccountEntity.class).list();
		List<AccountEntity> filteredAccounts = new ArrayList<AccountEntity>();
		
		
		for(int i=0;i<accountList.size();i++)
		{				
			 if(accountList.get(i).getLoggedInUser().getBusinessAccount().getId().equals(id))
			 {
				 System.out.println("Got the record:" + accountList.get(i) );
				 filteredAccounts.add(accountList.get(i));
			 }
			 System.out.println("Recored found:" + accountList.get(i).getLoggedInUser().getId());
		}
		
		return filteredAccounts;

	}

	@ApiMethod(name = "getCustomerByID")
	public Customer getCustomerByID(@Named("Id") Long Id) {

		Customer customerById = ofy().load().type(Customer.class).id(Id).now();

		System.out.println("Searched Recored is:"
				+ customerById.getCustomerName());

		return customerById;
	}

/*=============================================Account Payable Methods=================================================	*/

	@ApiMethod(name = "addPayable")
	public void addPayable(PayableEntity payableEntity) {
			
		Date date = new Date();
		  String DATE_FORMAT = "dd-MM-yyyy";
		  SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

		  payableEntity.setInvoiceDate(sdf.format(date));
		  payableEntity.setInvoiceDueDate(sdf.format(date));
		  payableEntity.setPayableDate(sdf.format(date));
		  payableEntity.setPurchaseOrderDate(sdf.format(date));
		
		ofy().save().entity(payableEntity).now();
	
	}

	@ApiMethod(name = "getAllPayablesByBusiness")
	public List<PayableEntity> getAllPayablesByBusiness(@Named("id") Long id) {
		
		List<PayableEntity> payableList=ofy().load().type(PayableEntity.class).list();
		List<PayableEntity> filteredPayables = new ArrayList<PayableEntity>();
		
		
		for(int i=0;i<payableList.size();i++)
		{				
			 if(payableList.get(i).getLoggedInUser().getBusinessAccount().getId().equals(id))
			 {
				 System.out.println("Got the record:" + payableList.get(i) );
				 filteredPayables.add(payableList.get(i));
			 }
			 System.out.println("Recored found:" + payableList.get(i).getLoggedInUser().getId());
		}
		
		return filteredPayables;

	}
	
	/*=============================================Account Receivable Methods=================================================	*/
	
	@ApiMethod(name = "addReceivable")
	public void addReceivable(ReceivableEntity receivableEntity) {
			
		Key<ReceivableEntity> payables = ofy().save().entity(receivableEntity).now();
	
	}

	@ApiMethod(name = "getAllReceivablesByBusiness", path = "Somepath_realted_to_your_service")
	public List<ReceivableEntity> getAllReceivablesByBusiness(@Named("id") Long id) {
		
		
		List<ReceivableEntity> receivableList=ofy().load().type(ReceivableEntity.class).list();
		List<ReceivableEntity> filteredReceivables = new ArrayList<ReceivableEntity>();
		
		
		for(int i=0;i<receivableList.size();i++)
		{				
			 if(receivableList.get(i).getLoggedInUser().getBusinessAccount().getId().equals(id) && receivableList.get(i).getStatus().equals("NotPaid"))
			 {
				 System.out.println("Got the record:" + receivableList.get(i) );
				 filteredReceivables.add(receivableList.get(i));
			 }
			 System.out.println("Recored found:" + receivableList.get(i).getLoggedInUser().getId());
		}
		
		return filteredReceivables;

	}
	
}// end of CustomerService
