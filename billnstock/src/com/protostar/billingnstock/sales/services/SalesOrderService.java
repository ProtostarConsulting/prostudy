package com.protostar.billingnstock.sales.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.sales.entities.SalesOrderEntity;

@Api(name = "salesOrderService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.sales.services", ownerName = "com.protostar.billingnstock.sales.services", packagePath = ""))
public class SalesOrderService {

		@ApiMethod(name="addSalesOrder")
		public void addSalesOrder(SalesOrderEntity salesOrderEntity){
					
			if (salesOrderEntity.getId() == null) {
				salesOrderEntity.setCreatedDate(new Date());
			//	stockItemEntity.setModifiedDate(new Date());
			} else {
				salesOrderEntity.setModifiedDate(new Date());
			}
			ofy().save().entity(salesOrderEntity).now();
		}
		
		@ApiMethod(name="getAllSalesOrder", path = "getAllSalesOrder")
		public List<SalesOrderEntity> getAllSalesOrder(@Named("id") Long id){
			
			List<SalesOrderEntity> SOList=ofy().load().type(SalesOrderEntity.class).list();
			List<SalesOrderEntity> filteredSO = new ArrayList<SalesOrderEntity>();
			
			
			for(int i=0;i<SOList.size();i++)
			{				
				 if(SOList.get(i).getBusiness().getId().equals(id))
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

		
		@ApiMethod(name = "getSOByID", path = "getSOByID")
		public SalesOrderEntity getSOByID(@Named("id") Long busiId) {
			SalesOrderEntity SalesOrderById = ofy().load().type(SalesOrderEntity.class).id(busiId).now();

			System.out.println("getSOByID Recored is:"+ SalesOrderById);
			return SalesOrderById;
		}
		
		@ApiMethod(name = "getSOListByID", path = "getSOListByID")
		public List<SalesOrderEntity> getSOListByID(@Named("id") Long custId) {
						
			List<SalesOrderEntity> SOListById = ofy()
					.load()
					.type(SalesOrderEntity.class)
					.filter("customer",
							Ref.create(Key.create(Customer.class, custId)))
					.list();
			
			
			return SOListById;
		}
}
