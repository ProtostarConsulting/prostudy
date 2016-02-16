package com.protostar.billingnstock.invoice.services;
import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;
import com.protostar.billingnstock.stock.entities.StockItemEntity;
import com.protostar.billingnstock.user.entities.UserEntity;

@Api(name = "invoiceService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class InvoiceService {

	@ApiMethod(name="addInvoice")
	public void addInvoice(InvoiceEntity invoiceEntity){
		Key<InvoiceEntity> now=ofy().save().entity(invoiceEntity).now();
		 
		System.out.println(invoiceEntity.getInvoiceLineItemList());
		
//		List<InvoiceLineItemEntity> invoiceStockItem = invoiceEntity.getInvoiceLineItemList();
//		List<StockItemEntity> stockItemEntity = new ArrayList<StockItemEntity>();

		List<StockItemEntity> stockItemEntity = ofy().load().type(StockItemEntity.class).list();
		
		for(int i=0;i < invoiceEntity.getInvoiceLineItemList().size();i++)
		{
			for(int j=0;j < stockItemEntity.size();j++)
			{
				if(invoiceEntity.getInvoiceLineItemList().get(i).getItemName().equals(stockItemEntity.get(j).getItemName()))
				{
					StockItemEntity a= stockItemEntity.get(j);

					a.setQty((stockItemEntity.get(j).getQty()) - (Integer.valueOf((invoiceEntity.getInvoiceLineItemList().get(i).getQty()))));
					ofy().save().entity(a).now();
				}
			}
		}
		
	}
	
/*	private int parseInt(String qty) {
		// TODO Auto-generated method stub
		return 0;
	}*/

	@ApiMethod(name="getAllInvoice")
	public List<InvoiceEntity> getAllInvoice(@Named("id") Long id){
		
		List<InvoiceEntity> invoiceList=ofy().load().type(InvoiceEntity.class).list();
		List<InvoiceEntity> filteredinvoice = new ArrayList<InvoiceEntity>();
		
		
		for(int i=0;i<invoiceList.size();i++)
		{				
			 if(invoiceList.get(i).getLoggedInUser().getBusinessAccount().getId().equals(id))
			 {
				 System.out.println("Got the record:" + invoiceList.get(i) );
				 filteredinvoice.add(invoiceList.get(i));
			 }
			 
//			 System.out.println("id:" + id);
		}
		System.out.println("filteredinvoice:" + filteredinvoice.size());
		return filteredinvoice;
		
	}
	

	@ApiMethod(name = "getinvoiceByID")
	public InvoiceEntity getinvoiceByID(@Named("id") Long id) {

		InvoiceEntity invoiceByID = ofy().load().type(InvoiceEntity.class).id(id).now();

		System.out.println("getinvoiceByID Recored is:"+ id);
		
		return invoiceByID;
	}
	
	
	@ApiMethod(name = "getAllInvoiceByCustId", path="Somepath_realted_to_your_service")
	public List<InvoiceEntity> getAllInvoiceByCustId(@Named("id") Long id) {
			//	long parseLong = Long.parseLong(id);
				
		List<InvoiceEntity> invoices = ofy().load().type(InvoiceEntity.class).list();	
		List<InvoiceEntity> filteredInvoices = new ArrayList<InvoiceEntity>();
		 
		for(int i=0;i<invoices.size();i++)
		{				
			 if(invoices.get(i).getCustomer().getId().equals(id))
			 {
				 System.out.println("Got the record:" + invoices.get(i) );
				 filteredInvoices.add(invoices.get(i));
			 }
			 
//			 System.out.println("id:" + id);
//			 System.out.println("No Recored found:" + invoices.get(i).getCustomer().getId());
		}
		return filteredInvoices;		
	}	
}
