package com.protostar.billingnstock.tax.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.data.EMF;
import com.protostar.billingnstock.data.TaxEntity;
import com.protostar.until.data.ServerMsg;



@Api(name = "taxServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.tax.services", ownerName = "com.protostar.billingnstock.tax.services", packagePath = ""))
public class TaxServices
{
	@ApiMethod(name="addTaxServices")
	public ServerMsg addTaxServices(TaxEntity taxEntity)
	{
		//MyBean myBean = new MyBean();
		
		System.out.println("taxEntity:" + taxEntity);
		ServerMsg msgBean=new ServerMsg();
				
		EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			em.persist(taxEntity);
			msgBean.setMsg("Tax Records Added successfully"+" "+taxEntity.getCode_Name());
		} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
				
		return msgBean;
		
	}//end of addTaxServices
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getAllTaxServices")
	public List<TaxEntity> getAllTaxServices()
	{
		System.out.println("In side getAllTaxServices " );
		List<TaxEntity> taxList= new ArrayList<TaxEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select c from TaxEntity c");
			taxList=q.getResultList();
			System.out.println("Got AllTaxList: " + taxList.size() );
			
		} catch (Exception e) 
	
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return taxList;
		
	}//end of getAllTaxServices

}//end of TaxServices
