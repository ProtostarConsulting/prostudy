package com.protostar.billingnstock.invoice.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;
import com.protostar.billingnstock.stock.entities.StockItemEntity;

@Api(name = "invoiceService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class InvoiceService {

	@ApiMethod(name = "addInvoice")
	public void addInvoice(InvoiceEntity invoiceEntity) {
		ofy().save().entity(invoiceEntity).now();

		System.out.println(invoiceEntity.getInvoiceLineItemList());

		List<StockItemEntity> stockItemEntity = ofy().load()
				.type(StockItemEntity.class).list();

		/*For Reduce the Stock Quantity*/
		
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
	}

	@ApiMethod(name = "updateInvoice")
	public void updateInvoice(InvoiceEntity updateValues) {

		InvoiceEntity invoiceEntity = new InvoiceEntity();
		List<InvoiceEntity> invoiceList = ofy().load()
				.type(InvoiceEntity.class).list();
		try {
			for (int i = 0; i <= invoiceList.size(); i++) {
				if (invoiceList.get(i).getId().equals(updateValues.getId())) {
					invoiceEntity.setStatus(updateValues.getStatus());
					invoiceEntity.setId(invoiceList.get(i).getId());
					invoiceEntity.setAccount(invoiceList.get(i).getAccount());
					invoiceEntity.setCustomer(invoiceList.get(i).getCustomer());
					invoiceEntity.setFinalTotal(invoiceList.get(i)
							.getFinalTotal());
					invoiceEntity.setInvoiceDate(invoiceList.get(i)
							.getInvoiceDate());
					invoiceEntity.setInvoiceLineItemList(invoiceList.get(i)
							.getInvoiceLineItemList());
					invoiceEntity.setItemName(invoiceList.get(i).getItemName());
					invoiceEntity.setLoggedInUser(invoiceList.get(i)
							.getLoggedInUser());
					invoiceEntity.setNote(invoiceList.get(i).getNote());
					invoiceEntity.setSubTotal(invoiceList.get(i).getSubTotal());
					invoiceEntity.setTaxTotal(invoiceList.get(i).getTaxTotal());
					invoiceEntity.setSalesOrderId(invoiceList.get(i)
							.getSalesOrderId());
					invoiceEntity.setSelectedTaxItem(invoiceList.get(i)
							.getSelectedTaxItem());
					invoiceEntity.setQty(invoiceList.get(i).getQty());
					invoiceEntity.setRate(invoiceList.get(i).getRate());

					ofy().save().entity(invoiceEntity).now();
				} else {
					System.out.println("Record Not Found:");
				}
			}
		} catch (Exception e) {
			e.getStackTrace();
		}
	}
/*
	@ApiMethod(name = "getAllPayableInvoices")
	public List<InvoiceEntity> getAllPayableInvoices(@Named("id") Long id) {

		List<InvoiceEntity> invoiceList = ofy().load()
				.type(InvoiceEntity.class).list();
		List<InvoiceEntity> filteredPayableinvoice = new ArrayList<InvoiceEntity>();
		
		for (int i = 0; i < invoiceList.size(); i++) {
			if (invoiceList.get(i).getLoggedInUser().getBusinessAccount()
					.getId().equals(id)) {
				if(invoiceList.get(i).getStatus().equals("notPaid")){
					
					
				System.out.println("Got the record:" + invoiceList.get(i));
				filteredPayableinvoice.add(invoiceList.get(i));
				}
			}
		}
		return filteredPayableinvoice;
	}
*/
	@ApiMethod(name = "getAllInvoice")
	public List<InvoiceEntity> getAllInvoice(@Named("id") Long id) {

		List<InvoiceEntity> invoiceList = ofy().load()
				.type(InvoiceEntity.class).list();
		List<InvoiceEntity> filteredinvoice = new ArrayList<InvoiceEntity>();

		for (int i = 0; i < invoiceList.size(); i++) {
			if (invoiceList.get(i).getLoggedInUser().getBusinessAccount()
					.getId().equals(id)) {
				System.out.println("Got the record:" + invoiceList.get(i));
				filteredinvoice.add(invoiceList.get(i));
			}

			// System.out.println("id:" + id);
		}
		System.out.println("filteredinvoice:" + filteredinvoice.size());
		return filteredinvoice;

	}

	@ApiMethod(name = "getinvoiceByID")
	public InvoiceEntity getinvoiceByID(@Named("id") Long id) {

		InvoiceEntity invoiceByID = ofy().load().type(InvoiceEntity.class)
				.id(id).now();

		System.out.println("getinvoiceByID Recored is:" + id);

		return invoiceByID;
	}

	@ApiMethod(name = "getAllInvoiceByCustId", path = "Somepath_realted_to_your_service")
	public List<InvoiceEntity> getAllInvoiceByCustId(@Named("id") Long id) {
		// long parseLong = Long.parseLong(id);

		List<InvoiceEntity> invoices = ofy().load().type(InvoiceEntity.class)
				.list();
		List<InvoiceEntity> filteredInvoices = new ArrayList<InvoiceEntity>();

		for (int i = 0; i < invoices.size(); i++) {
			if (invoices.get(i).getCustomer().getId().equals(id)) {
				System.out.println("Got the record:" + invoices.get(i));
				filteredInvoices.add(invoices.get(i));
			}
		}
		return filteredInvoices;
	}	
}
