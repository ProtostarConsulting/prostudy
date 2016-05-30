package com.protostar.prostudy.gf.service;
import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import javax.inject.Named;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFBookStockEntity;

@Api(name = "gfBookStockService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class GFBookStockService {

	@ApiMethod(name="addGFBook",path="addGFBook")
	public void addGFBook(GFBookEntity gfBookEntity){
			
		 ofy().save().entity(gfBookEntity).now(); 
	}
	
	@ApiMethod(name="getGFBookByInstituteId", path="getGFBookByInstituteId")
	public List<GFBookEntity> getGFBookByInstituteId (@ Named("instituteID") long instituteID){
		
		List<GFBookEntity> list = ofy().load().type(GFBookEntity.class).list();
		
		return list;
		
	}
	
	@ApiMethod(name="getGFBookById", path="getGFBookById")
	public GFBookEntity getGFBookById (@Named("id") long studID){
		
		GFBookEntity book = ofy().load().type(GFBookEntity.class).id(studID).now();
		
		return book;
		
	}
	
	@ApiMethod(name="addGFBookStock",path="addGFBookStock")
	public void addGFBookStock(GFBookStockEntity gfBookStockEntity){
			
		 ofy().save().entity(gfBookStockEntity).now();
		 
	}
	
	@ApiMethod(name="getGFBookStockByInstituteId", path="getGFBookStockByInstituteId")
	public List<GFBookStockEntity> getGFBookStockByInstituteId (@ Named("instituteID") long instituteID){
		
		List<GFBookStockEntity> list = ofy().load().type(GFBookStockEntity.class).list();
		
		return list;
		
	}
	
	@ApiMethod(name="getGFBookStockById", path="getGFBookStockById")
	public GFBookStockEntity getGFBookStockById (@Named("id") long bookID){
		
		GFBookStockEntity book = ofy().load().type(GFBookStockEntity.class).id(bookID).now();
		
		return book;
		
	}
}
