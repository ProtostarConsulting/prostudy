package com.protostar.billingnstock.purchase.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.billingnstock.purchase.entities.PurchaseOrderEntity;
import com.protostar.billingnstock.user.entities.BusinessEntity;

@Api(name = "purchaseOrderService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.purchase.services", ownerName = "com.protostar.billingnstock.purchase.services", packagePath = ""))
public class PurchaseOrderService {

	@ApiMethod(name = "addPurchaseOrder")
	public void addPurchaseOrder(PurchaseOrderEntity purchaseOrderEntity) {

		/*
		 * Date date = new Date(); String DATE_FORMAT = "dd-MM-yyyy";
		 * SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		 * 
		 * purchaseOrderEntity.setPoDate(sdf.format(date));
		 */
		Key<PurchaseOrderEntity> now = ofy().save().entity(purchaseOrderEntity)
				.now();
	}

	@ApiMethod(name = "getAllPurchaseOrder")
	public List<PurchaseOrderEntity> getAllPurchaseOrder(@Named("id") Long busId) {

		List<PurchaseOrderEntity> filteredPO = ofy()
				.load()
				.type(PurchaseOrderEntity.class)
				.filter("business",
						Ref.create(Key.create(BusinessEntity.class, busId)))
				.list();

		return filteredPO;
	}

	@ApiMethod(name = "getPOByID")
	public PurchaseOrderEntity getPOByID(@Named("id") Long id) {

		PurchaseOrderEntity POById = ofy().load()
				.type(PurchaseOrderEntity.class).id(id).now();
		System.out.println("getPOByID Recored is:" + POById);

		return POById;
	}
}
