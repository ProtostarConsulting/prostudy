package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.ChapterEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;

@Api(name = "chapterService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ChapterService 
{
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
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getChapterById")
	public ChapterEntity  getChapterById(@Named("Id") String Id)
	{
		System.out.println("In side getChapterById ");
		@SuppressWarnings("unused")
		ServerMsg msgBean=new ServerMsg();
		List<ChapterEntity> chapterList = new ArrayList<ChapterEntity>();
		EntityManager em=null;
		
		try 
		{
			em = EMF.get().createEntityManager();
			Query q = em.createQuery("select c from ChapterEntity c where c.id =" + Id);
			chapterList = q.getResultList();
			System.out.println("Got AllChapterList: " + chapterList.size());		
			
		} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		if(chapterList.size() > 0)		
		  return chapterList.get(0);
		else
			return null;	
		
	}//end of getChapterById
	
	
/*	@ApiMethod(name="updateChapter")
	 public ServerMsg updateChapter(ChapterEntity chapterEntity,@Named String chapter_name,@Named String chapter_content,@Named String board,@Named String student_class,@Named String subject)
	{
		 
		   System.out.println("Inside updateChapter");
			EntityManager em = null;
			ServerMsg msgBean = new ServerMsg();
			//ChapterEntity chapterEntity =new ChapterEntity();

			try {
				em = EMF.get().createEntityManager();
				System.out.println("Inside createEntityManager");
				
				ChapterEntity chapter = new ChapterEntity();

				if (chapterEntity.getId() != null)
				{		
					chapter=em.merge(chapterEntity);
					 
					chapter.setChapter_name(chapter_name);
					chapter.setChapter_content(chapter_content);
					chapter.setBoard(board);
					chapter.setStudent_class(student_class );
					chapter.setSubject(subject);
					em.persist(chapter);
					
				
					System.out.println("chapterEntity :-"+chapter.getChapter_name());
					msgBean.setMsg("Chapter Records Updated successfully" + " "
							+ chapter);
				}


				
				
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}
		return null;

	}// end of updateChapter
*/	
	
/*	@ApiMethod(name="update")
	 public ChapterEntity update(ChapterEntity chapterEntity)
	{
		 
		   System.out.println("Inside update");
			EntityManager em = null;
			
			try {
				em = EMF.get().createEntityManager();
				System.out.println("Inside createEntityManager");
				ChapterEntity chapter = em.find(ChapterEntity.class, chapterEntity.getId());


				if (chapter == null) {
					chapter = new ChapterEntity();
					chapter.setId(chapterEntity.getId());
					chapter.setChapter_name(chapterEntity.getChapter_name());
					chapter.setChapter_content(chapterEntity.getChapter_content());
					chapter.setBoard(chapterEntity.getBoard());
					chapter.setStudent_class(chapterEntity.getStudent_class());
					chapter.setSubject(chapterEntity.getSubject());
                    em.persist(chapter);
                    System.out.println("chapterEntity :-"+chapter.getChapter_name());
				}
				

			

				
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}
		return null;

	}// end of updateChapter
*/	
	
	
	

	
/*	
	@SuppressWarnings({ "unchecked" })
	@ApiMethod(name="update")
	public ChapterEntity update(@Named String id)
	{
		System.out.println("In side updateChapter ");
		  EntityManager em=null;
		  ChapterEntity chapterEntity =new ChapterEntity();
		  
	    try
	    {
	    
	    	em = EMF.get().createEntityManager();
	   
	    	List<ChapterEntity> chapterList = new ArrayList<ChapterEntity>();
			
		
				
				Query q = em.createQuery("select c from ChapterEntity c where c.id =" + chapterEntity.getId());
				chapterList = q.getResultList();
				
				if(chapterList.get(0).getId()!=null)
				{
				System.out.println("chapterList "+chapterList);
				
				chapterList.set(0, chapterEntity.getChapter_name());
			   }
			
		
			
			em.persist(chapterEntity);
			 System.out.println("chapterEntity.getChapter_name"+""+chapterEntity.getChapter_name());
			  System.out.println("Chapter Updated Successfully: "+""+ chapterEntity);	
		    
	  
	    }
	    
	    catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
	   
				return null;
	    
	}//end of updateChapter
*/	

}// end of ChapterService
