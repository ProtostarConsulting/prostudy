package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.ChapterEntity;

@Api(name = "chapterService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ChapterService 
{
	
	@SuppressWarnings("unused")
	@ApiMethod(name="addChapter")
	public void addChapter(ChapterEntity chapterEntity)
	{
		System.out.println("addChapter ");
		 Key<ChapterEntity> now = ofy().save().entity(chapterEntity).now();
	}//end of addChapter
	
	@ApiMethod(name="getAllChapters")
	public List<ChapterEntity>getAllChapters()
	{
		System.out.println("getAllChapters ");
		return ofy().load().type(ChapterEntity.class).list();
		
	}//end of getAllChapters
	
	 @ApiMethod(name="getChaptersByID") 
	 public ChapterEntity getChaptersByID(@Named("chapterId") String chapterId)
	 {
		 System.out.println("getChaptersByID ");
		 ChapterEntity chapterById= ofy().load().type(ChapterEntity.class).filter("chapterId", chapterId).first().now();
		 System.out.println("chapterById "+chapterById);
		 return chapterById;
	 }//end of getChaptersByID
	 



}// end of ChapterService











