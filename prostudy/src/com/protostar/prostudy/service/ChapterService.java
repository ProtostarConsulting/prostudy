package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.BookEntity;
import com.protostar.prostudy.entity.ChapterEntity;
import com.protostar.prostudy.entity.QuestionEntity;

@Api(name = "chapterService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ChapterService 
{
	
	@SuppressWarnings("unused")
	@ApiMethod(name="addChapter")
	public void addChapter(ChapterEntity chapterEntity)
	{
		System.out.println("addChapter ");
		 Key<ChapterEntity> now = ofy().save().entity(chapterEntity).now();
	}
	
	@ApiMethod(name="getAllChapters")
	public List<ChapterEntity>getAllChapters()
	{
		System.out.println("getAllChapters ");
		return ofy().load().type(ChapterEntity.class).list();
		
	}
	
	 @ApiMethod(name="getChaptersByID") 
	 public ChapterEntity getChaptersByID(@Named("id") String id)
	 {
		 System.out.println("getChaptersByID ");
		 ChapterEntity chapterById = ofy().load().type(ChapterEntity.class).id(id).now();		 
		 return chapterById;
	 }
	 
	 @ApiMethod(name = "getChaptersByInstitute")
	 public List<ChapterEntity> getChaptersByInstitute(@Named("instituteID") Long instituteID) {
		System.out.println("inside getChaptersByInstitute");
	  List<ChapterEntity> chapterList = ofy().load().type(ChapterEntity.class).filter("instituteID", instituteID).list();
	  return chapterList;
	  
	 }
	 
	 @ApiMethod(name = "updateChapter")
		public ChapterEntity updateChapter(ChapterEntity chapter) {
		 ChapterEntity now = chapter;
		 ofy().save().entity(chapter).now();
		 return now;
	}

}// end of ChapterService











