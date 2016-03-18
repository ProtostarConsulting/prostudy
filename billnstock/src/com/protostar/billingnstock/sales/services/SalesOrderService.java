package com.protostar.billingnstock.sales.services;

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
import com.protostar.billingnstock.sales.entities.SalesOrderEntity;

@Api(name = "salesOrderService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.sales.services", ownerName = "com.protostar.billingnstock.sales.services", packagePath = ""))
public class SalesOrderService {

		@ApiMethod(name="addSalesOrder")
		public void addSalesOrder(SalesOrderEntity salesOrderEntity){
						  
			ofy().save().entity(salesOrderEntity).now();
		}
		
		@ApiMethod(name="getAllSalesOrder")
		public List<SalesOrderEntity> getAllSalesOrder(@Named("id") Long id){
			
			List<SalesOrderEntity> SOList=ofy().load().type(SalesOrderEntity.class).list();
			List<SalesOrderEntity> filteredSO = new ArrayList<SalesOrderEntity>();
			
			
			for(int i=0;i<SOList.size();i++)
			{				
				 if(SOList.get(i).getLoggedInUser().getBusinessAccount().getId().equals(id))
				 {
					 System.out.println("Got the record:" + SOList.get(i) );
					 filteredSO.add(SOList.get(i));
				 }
				 
				 System.out.println("id:" + id);
			}
			System.out.println("filteredSO:" + filteredSO.getClass());
			return filteredSO;
			
		//	return ofy().load().type(SalesOrderEntity.class).list();
			
		}

		
		@ApiMethod(name = "getSOByID")
		public SalesOrderEntity getSOByID(@Named("id") Long id) {
			SalesOrderEntity SalesOrderById = ofy().load().type(SalesOrderEntity.class).id(id).now();

			System.out.println("getSOByID Recored is:"+ SalesOrderById);
			return SalesOrderById;

		}
}
