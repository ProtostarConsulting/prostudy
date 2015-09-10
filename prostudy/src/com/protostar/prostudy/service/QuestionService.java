package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.entity.QuestionEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;


@Api(name = "questionService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class QuestionService
{


	@ApiMethod(name="addQuestion")
	public ServerMsg  addQuestion(QuestionEntity questionEntity)
	{
		System.out.println("questionEntity:" + questionEntity);
		ServerMsg msgBean=new ServerMsg();
		
		
		
	EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			em.persist(questionEntity);
			msgBean.setMsg("Question Records Added successfully"+" "+questionEntity.getDescription());
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
		
	}//end of addQuestion
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getAllQuestion")
	public List<QuestionEntity> getAllQuestion()
	{
		System.out.println("In side getAllQuestion " );
		List<QuestionEntity> questionList= new ArrayList<QuestionEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select c from QuestionEntity c");
			questionList=q.getResultList();
			System.out.println("Got AllQuestionList: " + questionList.size() );
			
		} catch (Exception e) 
	
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return questionList;
		
	}//end of getAllQuestion

}//end of QuestionService
