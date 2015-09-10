package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.entity.ExamEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;


@Api(name = "examService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ExamService
{


	@ApiMethod(name="addExam")
	public ServerMsg  addExam(ExamEntity examEntity)
	{
		System.out.println("examEntity:" + examEntity);
		ServerMsg msgBean=new ServerMsg();
		
		

	EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			em.persist(examEntity);
			msgBean.setMsg("Exam Records Added successfully" + examEntity.getName());
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
				
		return msgBean;
		
	}//end of addExam
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getAllExam")
	public List<ExamEntity> getAllExam()
	{
		System.out.println("In side getAllExam " );
		List<ExamEntity> examList= new ArrayList<ExamEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select c from ExamEntity c" );
			examList=q.getResultList();
			System.out.println("Got examList : " + examList.size() );
			
		} catch (Exception e) 
	
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return examList;
		
	}//end of getAllExam

}//end of ExamService
