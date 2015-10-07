package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.dao.TestDAO;
import com.protostar.prostudy.entity.Car;
import com.protostar.prostudy.entity.QuestionEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;

@Api(name = "questionService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class QuestionService {

	@ApiMethod(name = "addQuestion")
	public ServerMsg addQuestion(QuestionEntity questionEntity) {
		System.out.println("questionEntity:" + questionEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			em.persist(questionEntity);
			msgBean.setMsg("Question Records Added successfully" + " "
					+ questionEntity.getDescription());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of addQuestion

	@ApiMethod(name = "updateQuestion")
	public ServerMsg updateQuestion(QuestionEntity questionEntity) {
		/*
		 * if (NamespaceManager.get() == null) {
		 * NamespaceManager.set(NamespaceManager.getGoogleAppsNamespace()); }
		 */
		System.out.println("In side updateQuestion ");
		System.out.println("questionEntity:" + questionEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			em.merge(questionEntity);
			em.persist(questionEntity);
			msgBean.setMsg("Question Records Updated successfully" + " "
					+ questionEntity.getDescription());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of updateQuestion

	@SuppressWarnings("unchecked")
	@ApiMethod(name = "getAllQuestion")
	public List<QuestionEntity> getAllQuestion() {
		System.out.println("In side getAllQuestion ");
		List<QuestionEntity> questionList = new ArrayList<QuestionEntity>();
		EntityManager em = null;
		try {

			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select c from QuestionEntity c");
			questionList = q.getResultList();
			System.out.println("Got AllQuestionList: " + questionList.size());

		} catch (Exception e)

		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return questionList;

	}// end of getAllQuestion

	@ApiMethod(name = "test1")
	public void test1() {
		System.out.println("In side test1 ");
		new TestDAO().testCar();

	}

	@ApiMethod(name = "getCars")
	public List<Car> getCars() {
		System.out.println("In side getCars ");
		return new TestDAO().getCars();

	}

}// end of QuestionService
