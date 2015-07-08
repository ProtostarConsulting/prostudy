package com.protostar.billingnstock.data.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.data.EMF;
import com.protostar.billingnstock.data.MyBean;
import com.protostar.billingnstock.data.TaxEntity;



@Api(name = "taxServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.data.service", ownerName = "com.protostar.billingnstock.data.service", packagePath = ""))
public class TaxServices
{
	@ApiMethod(name="addTaxServices")
	public MyBean addTaxServices(TaxEntity taxEntity)
	{
		MyBean myBean = new MyBean();
		EntityManager em = null ;
		
		TaxEntity taxEntity2 = new TaxEntity();
		
		if(taxEntity.getId()==null)
		{
			taxEntity2.setCode_Name(taxEntity.getCode_Name());
			taxEntity2.setTax_Rate(taxEntity.getTax_Rate());
		    myBean.setToken("R");
		}
		else
		{
			taxEntity2.setId(taxEntity.getId());

			taxEntity2.setCode_Name(taxEntity.getCode_Name());
			taxEntity2.setTax_Rate(taxEntity.getTax_Rate());
		    myBean.setToken("U");
		}
		try {
			em=EMF.get().createEntityManager();
			em.persist(taxEntity2);
		}
		
		catch (Exception e)
		{
	
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
		finally
		{
			em.close();
		}
		myBean.setMyData("Tax Record Added Successfully. " + taxEntity.toString() + ", Code Name:" + taxEntity.getCode_Name());
		
		return myBean;
		
	}//end of addTaxServices
	
	
	@ApiMethod(name="getAllTaxServices")
	public List<TaxEntity> getAllTaxServices()
	{
		List<TaxEntity> taxEntity = new ArrayList<TaxEntity>();
		EntityManager em = null;
		
		try {
			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select p from TaxEntity p");
			taxEntity=q.getResultList();
			
		} catch (Exception e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return taxEntity;
		
	}//end of getAllTaxServices
	
	

}//end of TaxServices
