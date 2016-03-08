package com.protostar.billingnstock.warehouse.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.warehouse.entities.WarehouseEntity;

@Api(name = "warehouseManagementService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.warehouse.entities", ownerName = "com.protostar.billingnstock.warehouse.services", packagePath = ""))
public class WarehouseService {

	@ApiMethod(name = "addWarehouse")
	public void addWarehouse(WarehouseEntity warehouseEntity) {
				
	ofy().save().entity(warehouseEntity).now();
	
	}
	
}
