
package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;


@Api(name = "instituteServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.institute.services", ownerName = "com.protostar.billingnstock.institute.services", packagePath = ""))
public class InstituteServices
{


	@ApiMethod(name="addInstituteServices")
	public ServerMsg  addInstituteServices(InstituteEntity instituteEntity)
	{
		System.out.println("instituteEntity:" + instituteEntity);
		ServerMsg msgBean=new ServerMsg();
		
		
		
	EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			em.persist(instituteEntity);
			msgBean.setMsg("Institute Records Added successfully"+" "+instituteEntity.getName());
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
		
	}//end of addInstituteServices
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getAllInstituteServices")
	public List<InstituteEntity> getAllQuestionServices()
	{
		System.out.println("In side getAllInstituteServices " );
		List<InstituteEntity> instituteList= new ArrayList<InstituteEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select c from InstituteEntity c");
			instituteList=q.getResultList();
			System.out.println("Got AllInstituteList: " + instituteList.size() );
			
		} catch (Exception e) 
	
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return instituteList;
		
	}//end of getAllQuestionServices

}//end of QuestionServices
