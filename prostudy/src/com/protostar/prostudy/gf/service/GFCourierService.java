package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import javax.inject.Named;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.gf.entity.GFBookStockEntity;
import com.protostar.prostudy.gf.entity.GFBookTransactionEntity;
import com.protostar.prostudy.gf.entity.GFCourierEntity;

@Api(name = "gfCourierService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class GFCourierService {

	@ApiMethod(name="addGFCourier")
	public void addGFCourier(GFCourierEntity gfCourierEntity){
			
		 ofy().save().entity(gfCourierEntity).now();
		 
		/* GFBookTransactionEntity gfBookTransactionEntity = new GFBookTransactionEntity();
				
		 if(gfCourierEntity.getBookLineItemList().size() < 1 ){
			 gfBookTransactionEntity.setTransactionType("Dr");
			 ofy().save().entity(gfBookTransactionEntity).now();
		 }else{
			 for( int i=0; i < gfCourierEntity.getBookLineItemList().size(); i++){
				 gfBookTransactionEntity.setBook(gfCourierEntity.getBookLineItemList().get(i));
				 gfBookTransactionEntity.setBookQty(gfCourierEntity.getBookQty());
				 gfBookTransactionEntity.setInstituteID(gfCourierEntity.getInstituteID());
				 gfBookTransactionEntity.setTransactionDate(gfCourierEntity.getCourierDispatchDate());
				 gfBookTransactionEntity.setMedium(gfBookTransactionEntity.getMedium());
				 gfBookTransactionEntity.setTransactionType("Dr");
				 
				 ofy().save().entity(gfBookTransactionEntity).now();
			 }
		 }*/
		 
		 
		 // For Deduct the book Stock
		 
		 List<GFBookStockEntity> list = ofy().load().type(GFBookStockEntity.class).list();

		 
			 for(int j=0; j < gfCourierEntity.getBookLineItemList().size(); j++){	 

				 for(int i=0; i < list.size(); i++){
					 double str = list.get(i).getBook().getWeight();
					 if(gfCourierEntity.getBookLineItemList().get(j).getInstituteID() == list.get(i).getInstituteID()
							 && gfCourierEntity.getBookLineItemList().get(j).getWeight() ==(str)){

						 list.get(i).setBookQty(gfCourierEntity.getBookQty());
						 
						 ofy().save().entity(list).now();
					 }

				 }
		 }

	}

	@ApiMethod(name = "getGFCourierByInstitute", path = "getGFCourierByInstitute")
	public List<GFCourierEntity> getGFCourierByInstitute(
			@Named("instituteID") long instituteID) {

		List<GFCourierEntity> list = ofy().load().type(GFCourierEntity.class)
				.list();

		return list;

	}

	@ApiMethod(name = "getGFCourierById", path = "getGFCourierById")
	public GFCourierEntity getGFCourierById(@Named("id") long studID) {

		GFCourierEntity stud = ofy().load().type(GFCourierEntity.class)
				.id(studID).now();

		return stud;

	}
}
