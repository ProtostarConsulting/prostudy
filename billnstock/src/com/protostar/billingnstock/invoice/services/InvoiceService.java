package com.protostar.billingnstock.invoice.services;

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
import com.googlecode.objectify.Ref;
import com.googlecode.objectify.cmd.Query;
import com.protostar.billingnstock.account.entities.ReceivableEntity;
import com.protostar.billingnstock.account.services.AccountService;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;
import com.protostar.billingnstock.stock.entities.StockItemEntity;
import com.protostar.billingnstock.user.entities.BusinessEntity;

@Api(name = "invoiceService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class InvoiceService {

	@ApiMethod(name = "addInvoice")
	public void addInvoice(InvoiceEntity invoiceEntity) {

		if (invoiceEntity.getId() == null) {
			invoiceEntity.setCreatedDate(new Date());
		//	stockItemEntity.setModifiedDate(new Date());
		} else {
			invoiceEntity.setModifiedDate(new Date());
		}
		
		ofy().save().entity(invoiceEntity).now();

		System.out.println(invoiceEntity.getInvoiceLineItemList());

		List<StockItemEntity> stockItemEntity = ofy().load()
				.type(StockItemEntity.class).list();

		/* For Reduce the Stock Quantity */

		for (int i = 0; i < invoiceEntity.getInvoiceLineItemList().size(); i++) {
			for (int j = 0; j < stockItemEntity.size(); j++) {
				if (invoiceEntity.getInvoiceLineItemList().get(i).getItemName()
						.equals(stockItemEntity.get(j).getItemName())) {
					StockItemEntity a = stockItemEntity.get(j);

					a.setQty((stockItemEntity.get(j).getQty())
							- (Integer.valueOf((invoiceEntity
									.getInvoiceLineItemList().get(i).getQty()))));
					ofy().save().entity(a).now();
				}
			}
		}

		/* For Add in ReceivableEntity */

		ReceivableEntity receivableEntity = new ReceivableEntity();

		receivableEntity.setCustomer(invoiceEntity.getCustomer());
		receivableEntity.setFinalTotal(invoiceEntity.getFinalTotal());
		receivableEntity.setInvoiceDate(invoiceEntity.getInvoiceDate());
		receivableEntity.setInvoiceDueDate(invoiceEntity.getInvoiceDueDate());
		receivableEntity.setInvoiceId(invoiceEntity.getId());
		receivableEntity.setBusiness(invoiceEntity.getBusiness());
		receivableEntity.setCreatedDate(invoiceEntity.getCreatedDate());
		receivableEntity.setModifiedDate(invoiceEntity.getModifiedDate());
		receivableEntity.setModifiedBy(invoiceEntity.getModifiedBy());
		ofy().save().entity(receivableEntity).now();
	}

	@ApiMethod(name = "updateInvoiceStatus")
	public void updateInvoiceStatus(InvoiceEntity valueToUpdateStatus) {

		ofy().save().entity(valueToUpdateStatus).now();

		long invoiceId = valueToUpdateStatus.getId();

		ReceivableEntity fetchedReceivableEntity = ofy().load()
				.type(ReceivableEntity.class).filter("invoiceId = ", invoiceId)
				.first().now();

		if (fetchedReceivableEntity != null) {
			fetchedReceivableEntity.setStatus(valueToUpdateStatus.getStatus());
			ofy().save().entity(fetchedReceivableEntity).now();
		}
	}

	@ApiMethod(name = "getAllInvoice")
	public List<InvoiceEntity> getAllInvoice(@Named("id") Long id) {

		List<InvoiceEntity> filteredinvoice = ofy()
				.load()
				.type(InvoiceEntity.class)
				.filter("business",
						Ref.create(Key.create(BusinessEntity.class, id)))
				.list();

		System.out.println("filteredinvoice:" + filteredinvoice.size());
		return filteredinvoice;

	}

	@ApiMethod(name = "getinvoiceByID")
	public InvoiceEntity getinvoiceByID(@Named("id") Long invoiceId) {

		InvoiceEntity invoiceByID = ofy().load().type(InvoiceEntity.class)
				.id(invoiceId).now();

		System.out.println("getinvoiceByID Recored is:" + invoiceId);

		return invoiceByID;
	}

	@ApiMethod(name = "getInvoiceListByCustId", path = "getInvoiceListByCustId")
	public List<InvoiceEntity> getInvoiceListByCustId(@Named("id") Long custId) {
				
		List<InvoiceEntity> filteredinvoice = ofy()
				.load()
				.type(InvoiceEntity.class)
				.filter("customer",
						Ref.create(Key.create(Customer.class, custId)))
				.list();
		
		return filteredinvoice;
	}
}
