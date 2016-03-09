package com.protostar.billingnstock.warehouse.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.account.entities.AccountEntity;
import com.protostar.billingnstock.stock.entities.StockItemEntity;
import com.protostar.billingnstock.warehouse.entities.WarehouseEntity;

@Api(name = "warehouseManagementService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.warehouse.entities", ownerName = "com.protostar.billingnstock.warehouse.services", packagePath = ""))
public class WarehouseService {

	@ApiMethod(name = "addWarehouse")
	public void addWarehouse(WarehouseEntity warehouseEntity) {

		ofy().save().entity(warehouseEntity).now();

	}

	@ApiMethod(name = "getAllWarehouseByBusiness")
	public List<WarehouseEntity> getAllWarehouseByBusiness(@Named("id") Long id) {

		List<WarehouseEntity> warehouseList = ofy().load()
				.type(WarehouseEntity.class).list();
		List<WarehouseEntity> filteredWarehouses = new ArrayList<WarehouseEntity>();

		for (int i = 0; i < warehouseList.size(); i++) {
			if (warehouseList.get(i).getLoggedInUser().getBusinessAccount()
					.getId().equals(id)) {
				System.out.println("Got the record:" + warehouseList.get(i));
				filteredWarehouses.add(warehouseList.get(i));
			}
		}

		return filteredWarehouses;
	}

	@ApiMethod(name = "updateWarehouse")
	public void updateWarehouse(WarehouseEntity warehouseEntity) {

		ofy().save().entity(warehouseEntity).now();
	}
}
