package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.entity.ChapterEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;

@Api(name = "chapterService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ChapterService {

	@ApiMethod(name = "addChapter")
	public ServerMsg addChapter(ChapterEntity chapterEntity) {
		System.out.println("chapterEntity:" + chapterEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			em.persist(chapterEntity);
			msgBean.setMsg("Chapter Records Added successfully" + " "
					+ chapterEntity.getChapter_name());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of addChapter

	@SuppressWarnings("unchecked")
	@ApiMethod(name = "getAllChapter")
	public List<ChapterEntity> getAllChapter() {
		System.out.println("In side getAllChapter ");
		List<ChapterEntity> chapterList = new ArrayList<ChapterEntity>();
		EntityManager em = null;
		try {

			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select c from ChapterEntity c");
			chapterList = q.getResultList();
			System.out.println("Got AllChapterList: " + chapterList.size());

		} catch (Exception e)

		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return chapterList;

	}// end of getAllChapter
	
	

	@ApiMethod(name = "updateChapter")
	public ServerMsg updateChapter(ChapterEntity chapterEntity)
	{
		
		System.out.println("In side updateChapter ");
		System.out.println("chapterEntity:" + chapterEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			
			ChapterEntity chapterEntity2 = new ChapterEntity();
			
			chapterEntity2.setChapter_name(chapterEntity.getChapter_name());
			chapterEntity2.setChapter_content(chapterEntity.getChapter_content());
            chapterEntity2.setBoard(chapterEntity.getBoard());
            chapterEntity2.setStudent_class(chapterEntity.getStudent_class());
            chapterEntity2.setSubject(chapterEntity.getStudent_class());
			
			em = EMF.get().createEntityManager();
			em.persist(chapterEntity2);
			msgBean.setMsg("Chapter Records Updated successfully" + " "
					+ chapterEntity2.getChapter_name());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of updateChapter
	
/*	@ApiMethod(name="getByChapterId")
	public ServerMsg  getByChapterId(ChapterEntity chapterEntity)
	{
		System.out.println("In side getByChapterId ");
		System.out.println("chapterEntity:" + chapterEntity);
		ServerMsg msgBean=new ServerMsg();
		
		EntityManager em=null;
		
		try 
		{
			ChapterEntity chapterEntity2 = new ChapterEntity();
			
			if(chapterEntity.getId()!=null)
			{
				chapterEntity2.setId(chapterEntity.getId());
			}
			
			chapterEntity2.setChapter_name(chapterEntity.getChapter_name());
			chapterEntity2.setChapter_content(chapterEntity.getChapter_content());
            chapterEntity2.setBoard(chapterEntity.getBoard());
            chapterEntity2.setStudent_class(chapterEntity.getStudent_class());
            chapterEntity2.setSubject(chapterEntity.getStudent_class());
			
			em=EMF.get().createEntityManager();
			em.persist(chapterEntity2);
			msgBean.setMsg("Got ByChapterId successfully"+" "+chapterEntity2.getChapter_name());
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
		
	}//end of getByChapterId
*/	



}// end of ChapterService
