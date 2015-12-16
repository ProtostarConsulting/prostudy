package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.entity.PracticeExamEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;

@Api(name = "practiceExamService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class PracticeExamService {

	@ApiMethod(name = "addPracticeExam")
	public ServerMsg addChapter(PracticeExamEntity practiceExamEntity) {
		System.out.println("practiceExamEntity:" + practiceExamEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			em.persist(practiceExamEntity);
			msgBean.setMsg("Practice Exam Records Added successfully" + " "
					+ practiceExamEntity.getExamtitle());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of addPracticeExam

	@SuppressWarnings("unchecked")
	@ApiMethod(name = "getAllPracticeExam")
	public List<PracticeExamEntity> getAllPracticeExam() {
		System.out.println("In side getAllPracticeExam ");
		List<PracticeExamEntity> practiceExamList = new ArrayList<PracticeExamEntity>();
		EntityManager em = null;
		try {

			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select c from PracticeExamEntity c");
			practiceExamList = q.getResultList();
			System.out.println("Got AllPracticeExam: " + practiceExamList.size());

		} catch (Exception e)

		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return practiceExamList;

	}// end of getAllChapter


	@ApiMethod(name = "updatePracticeExam")
	public ServerMsg updatePracticeExam(PracticeExamEntity practiceExamEntity)
	{
		
		System.out.println("In side updatePracticeExam ");
		System.out.println("practiceExamEntity:" + practiceExamEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			
			PracticeExamEntity practiceExamEntity2 = new PracticeExamEntity();
			
			practiceExamEntity2.setExamtitle(practiceExamEntity.getExamtitle());
			practiceExamEntity2.setSubject(practiceExamEntity.getSubject());
			practiceExamEntity2.setStandard(practiceExamEntity.getStandard());
			practiceExamEntity2.setBoard(practiceExamEntity.getBoard());
			practiceExamEntity2.setDate(practiceExamEntity.getDate());
			
			em = EMF.get().createEntityManager();
			em.persist(practiceExamEntity2);
			msgBean.setMsg("Practice Exam Records Updated successfully" + " "
					+ practiceExamEntity2.getExamtitle());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of updatePracticeExam

}// end of PracticeExamService
