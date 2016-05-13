package com.protostar.billingnstock.purchase.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.Date;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.billingnstock.purchase.entities.PurchaseOrderEntity;
import com.protostar.billingnstock.purchase.entities.SupplierEntity;
import com.protostar.billingnstock.sales.entities.SalesOrderEntity;
import com.protostar.billingnstock.user.entities.BusinessEntity;

@Api(name = "supplierService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.purchase.services", ownerName = "com.protostar.billingnstock.purchase.services", packagePath = ""))
public class SupplierService {

	@ApiMethod(name = "addSupplier")
	public SupplierEntity addSupplier(SupplierEntity supplierEntity) {

		if (supplierEntity.getId() == null) {
			supplierEntity.setCreatedDate(new Date());
		//	stockItemEntity.setModifiedDate(new Date());
		} else {
			supplierEntity.setModifiedDate(new Date());
		}
		ofy().save().entity(supplierEntity).now();
		return supplierEntity;
	}

	@ApiMethod(name = "getAllSuppliersByBusiness")
	public List<SupplierEntity> getAllSuppliersByBusiness(@Named("id") Long busId) {

		List<SupplierEntity> filteredSuppliers = ofy()
				.load()
				.type(SupplierEntity.class)
				.filter("business",
						Ref.create(Key.create(BusinessEntity.class, busId)))
				.list();

		return filteredSuppliers;
	}

	@ApiMethod(name = "getSupplierByID")
	public SupplierEntity getPOByID(@Named("id") Long id) {

		SupplierEntity supplierByID = ofy().load()
				.type(SupplierEntity.class).id(id).now();
		System.out.println("getPOByID Recored is:" + supplierByID);

		return supplierByID;
	}
}
