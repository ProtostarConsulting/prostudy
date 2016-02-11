package com.protostar.billingnstock.purchase.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;
import com.protostar.billingnstock.purchase.entities.PurchaseOrderEntity;
import com.protostar.billingnstock.sales.entities.SalesOrderEntity;

@Api(name = "purchaseOrderService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.purchase.services", ownerName = "com.protostar.billingnstock.purchase.services", packagePath = ""))
public class PurchaseOrderService {

		@ApiMethod(name="addPurchaseOrder")
		public void addPurchaseOrder(PurchaseOrderEntity purchaseOrderEntity){
			Key<PurchaseOrderEntity> now=ofy().save().entity(purchaseOrderEntity).now();
		}
		
		@ApiMethod(name="getAllPurchaseOrder")
		public List<PurchaseOrderEntity> getAllPurchaseOrder(@Named("id") Long id){
			
			List<PurchaseOrderEntity> POList=ofy().load().type(PurchaseOrderEntity.class).list();
			List<PurchaseOrderEntity> filteredPO = new ArrayList<PurchaseOrderEntity>();
			
			
			for(int i=0;i<POList.size();i++)
			{				
				 if(POList.get(i).getLoggedInUser().getBusinessAccount().getId().equals(id))
				 {
					 System.out.println("Got the record:" + POList.get(i) );
					 filteredPO.add(POList.get(i));
				 }
				 
	//			 System.out.println("id:" + id);
			}
			System.out.println("filteredPO:" + filteredPO.size());
			return filteredPO;			
		}
		
		
		@ApiMethod(name = "getPOByID")
		public PurchaseOrderEntity getPOByID(@Named("id") Long id) {

			PurchaseOrderEntity POById = ofy().load().type(PurchaseOrderEntity.class).id(id).now();
			System.out.println("getPOByID Recored is:"+ POById);
			
			return POById;
		}
}
