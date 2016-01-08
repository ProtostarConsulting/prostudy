package com.protostar.billingnstock.purchase.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

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
		public List<PurchaseOrderEntity> getAllPurchaseOrder(){
			
		return ofy().load().type(PurchaseOrderEntity.class).list();
			
		}
		
		@ApiMethod(name="getPOByID")
		public PurchaseOrderEntity getPOByID(@Named("purchaseOrderId") String purchaseOrderId){
			
			PurchaseOrderEntity POById=ofy().load().type(PurchaseOrderEntity.class).filter("purchaseOrderId", purchaseOrderId).first().now();
			System.out.println("Searched Recored is:"
					+ POById.getCustomerName());
			return POById;
			
		}
}
