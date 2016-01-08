package com.protostar.billnstock.until.data;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.googlecode.objectify.ObjectifyService;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.cust.entities.Internet;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;
import com.protostar.billingnstock.purchase.entities.PurchaseOrderEntity;
import com.protostar.billingnstock.sales.entities.SalesOrderEntity;
import com.protostar.billingnstock.stock.entities.Car;
import com.protostar.billingnstock.stock.entities.StockItemEntity;
import com.protostar.billingnstock.tax.entities.TaxEntity;

public class AppServletContextListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// Notification that the servlet context is about to be shut down.
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		System.out.println("###Inside AppServletContextListener###");
		// register all your entities here
		ObjectifyService.register(Car.class);
		ObjectifyService.register(Internet.class);
		ObjectifyService.register(Customer.class);
		ObjectifyService.register(StockItemEntity.class);
		ObjectifyService.register(InvoiceEntity.class);
		ObjectifyService.register(TaxEntity.class);
		ObjectifyService.register(PurchaseOrderEntity.class);
		ObjectifyService.register(SalesOrderEntity.class);
	}

}