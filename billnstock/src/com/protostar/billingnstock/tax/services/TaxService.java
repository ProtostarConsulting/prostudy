package com.protostar.billingnstock.tax.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.sales.entities.SalesOrderEntity;
import com.protostar.billingnstock.tax.entities.TaxEntity;

@Api(name = "taxService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.tax.services", ownerName = "com.protostar.billingnstock.tax.services", packagePath = ""))
public class TaxService {
	@ApiMethod(name = "addTax")
	public void addTax(TaxEntity taxEntity) {

		Key<TaxEntity> now = ofy().save().entity(taxEntity).now();

	}
	
	@ApiMethod(name="getAllTaxes")
	public List<TaxEntity> getAllTaxes(@Named("id") Long id){
	
		List<TaxEntity> taxList=ofy().load().type(TaxEntity.class).list();
		List<TaxEntity> filteredTax = new ArrayList<TaxEntity>();
		
		
		for(int i=0;i<taxList.size();i++)
		{				
			 if(taxList.get(i).getLoggedInUser().getBusinessAccount().getId().equals(id))
			 {
				 System.out.println("Got the record:" + taxList.get(i) );
				 filteredTax.add(taxList.get(i));
			 }
			 
			 System.out.println("id:" + id);
		}
		System.out.println("filteredTax:" + filteredTax.getClass());
		return filteredTax;
		
	}
	
	@ApiMethod(name="updateTax")
	public void updateTax(TaxEntity taxEntity){
		Key<TaxEntity> now = ofy().save().entity(taxEntity).now();
	}
	/*
	 * @ApiMethod(name="addTax") public ServerMsg addTaxServices(TaxEntity
	 * taxEntity) { //MyBean myBean = new MyBean();
	 * 
	 * System.out.println("taxEntity:" + taxEntity); ServerMsg msgBean=new
	 * ServerMsg();
	 * 
	 * TaxEntity taxEntity2 = new TaxEntity();
	 * 
	 * if(taxEntity.getId()!=null) { taxEntity2.setId(taxEntity.getId()); }
	 * 
	 * taxEntity2.setTaxCodeName(taxEntity.getTaxCodeName());
	 * taxEntity2.setTaxPercenatge(taxEntity.getTaxPercenatge());
	 * 
	 * EntityManager em=null;
	 * 
	 * try { em=EMF.get().createEntityManager(); em.persist(taxEntity);
	 * msgBean.setMsg
	 * ("Tax Records Added successfully"+" "+taxEntity.getTaxCodeName
	 * ()+""+taxEntity.getTaxPercenatge()); } catch (Exception e) { // TODO
	 * Auto-generated catch block e.printStackTrace(); } finally { em.close(); }
	 * 
	 * return msgBean;
	 * 
	 * }//end of addTaxServices
	 * 
	 * @SuppressWarnings("unchecked")
	 * 
	 * @ApiMethod(name="getAllTaxes") public List<TaxEntity> getAllTaxes() {
	 * System.out.println("In side getAllTaxs " ); List<TaxEntity> taxList= new
	 * ArrayList<TaxEntity>(); EntityManager em= null; try {
	 * 
	 * em = EMF.get().createEntityManager();
	 * 
	 * Query q= em.createQuery("select t from TaxEntity t");
	 * taxList=q.getResultList(); System.out.println("Got AllTaxList: " +
	 * taxList.size() );
	 * 
	 * } catch (Exception e)
	 * 
	 * { // TODO Auto-generated catch block e.printStackTrace(); } finally {
	 * em.close(); }
	 * 
	 * return taxList;
	 * 
	 * }//end of getAllTaxServices
	 */
}// end of TaxServices
