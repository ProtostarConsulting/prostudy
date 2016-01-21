package com.protostar.billingnstock.invoice.services;
import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;

@Api(name = "invoiceService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class InvoiceService {

	@ApiMethod(name="addInvoice")
	public void addInvoice(InvoiceEntity invoiceEntity){
		Key<InvoiceEntity> now=ofy().save().entity(invoiceEntity).now();
	}
	
	@ApiMethod(name="getAllInvoice")
	public List<InvoiceEntity> getAllInvoice(){
		
		return ofy().load().type(InvoiceEntity.class).list();
		
	}
	

	@ApiMethod(name = "getinvoiceByID")
	public InvoiceEntity getinvoiceByID(@Named("invoiceId") Long invoiceId) {

		InvoiceEntity invoiceByID = ofy().load().type(InvoiceEntity.class).filter("invoiceId", invoiceId).first().now();

		System.out.println("getinvoiceByID Recored is:"+ invoiceId);
		
		return invoiceByID;
	}
	
	@ApiMethod(name = "getAllInvoiceByCustId")
	public List<InvoiceEntity> getAllInvoiceByCustId(@Named("customerId") String customerId) {

		List<InvoiceEntity> invoiceByCustID = ofy().load().type(InvoiceEntity.class).filter("customerId", customerId).list();

		System.out.println("getAllInvoiceByCustId Recored is:"+ invoiceByCustID);
		
		return invoiceByCustID;
	}
	
/*	@ApiMethod(name = "saveBill")
	public ServerMsg saveBill(InvoiceEntity invoiceEntity) {
		System.out.println("invoiceEntity:" + invoiceEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			em.persist(invoiceEntity);
			msgBean.setMsg("Bill Saved successfully" + " "
					+ invoiceEntity.getCustomerName());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of addTaxServices

	@SuppressWarnings("unchecked")
	@ApiMethod(name = "getAllBills")
	public List<InvoiceEntity> getAllBills() {
		System.out.println("In side getAllBills ");
		List<InvoiceEntity> billList = new ArrayList<InvoiceEntity>();
		EntityManager em = null;
		try {

			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select e from  InvoiceEntity e");
			billList = q.getResultList();
			System.out.println("Got AllBill: " + billList.size());

		} catch (Exception e)

		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return billList;

	}// end of getAllStockServices

	@ApiMethod(name = "getinvoiceByID")
	public InvoiceEntity getCustomerByID(@Named("invoiceId")Long invoiceId) {
		InvoiceEntity invoiceEntity = null;
		EntityManager em = null;
		try {
			em = EMF.get().createEntityManager();
			Query q = em
					.createQuery("select e from InvoiceEntity e where e.invoiceId ="
							+ invoiceId);
			List<InvoiceEntity> resultList = q.getResultList();
			if (resultList.size() > 0) {
				InvoiceEntity customer = resultList.get(0);
		//		invoiceEntity = InvoiceEntityUtil.toInvoiceEntity(customer);
			}

		} finally {
			em.close();
		}
		
		return invoiceEntity;
	}*/
}// end of StockServices
