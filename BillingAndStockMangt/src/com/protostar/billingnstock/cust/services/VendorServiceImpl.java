package com.protostar.billingnstock.cust.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import javax.persistence.Query;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.cust.entities.Vendor;
import com.protostar.billingnstock.cust.entities.VendorInfo;
import com.protostar.billingnstock.cust.entities.VendorInfoUtil;
import com.protostar.billingnstock.data.EMF;
import com.protostar.until.data.ServerMsg;

@Api(name = "vendorservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.cust.services", ownerName = "com.protostar.billingnstock.cust.services", packagePath = ""))
public class VendorServiceImpl {

	@ApiMethod(name = "saveVendor")
	public ServerMsg saveVendor(VendorInfo vendorInfo) {

		ServerMsg msgBean=new ServerMsg();
		
		EntityManager em = null;

		Vendor vendorEntity = VendorInfoUtil.toVendor(vendorInfo);

		/*if(vendorInfo.getId()==null)
		{
			myBean.setToken("R");
		}
		else
		{
			myBean.setToken("U");
		}*/
		try {
			em = EMF.get().createEntityManager();
			em.persist(vendorEntity);
			} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		finally
		{
		em.close();	
		}
		
		msgBean.setMsg("Vendor Saved Successfully" +vendorEntity.getId()+vendorEntity.getEmail());
		return msgBean;
	}

	@ApiMethod(name="getAllVendors")
	public List<VendorInfo> getAllVendors()
	{
		List<VendorInfo> resultList=new ArrayList<VendorInfo>();
		
		EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			Query query= em.createQuery("select v from Vendor v");
			List<Vendor> resultlist2 = query.getResultList();
			
			for(Vendor v : resultlist2)
				resultList.add(VendorInfoUtil.toVendorInfo(v));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return resultList;	
	}
}
