package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import javax.inject.Named;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFBookStockEntity;
import com.protostar.prostudy.gf.entity.GFBookTransactionEntity;

@Api(name = "gfBookStockService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class GFBookStockService {

	@ApiMethod(name = "addGFBook", path = "addGFBook")
	public void addGFBook(GFBookEntity gfBookEntity) {

		ofy().save().entity(gfBookEntity).now();
	}

	@ApiMethod(name = "getGFBookByInstituteId", path = "getGFBookByInstituteId")
	public List<GFBookEntity> getGFBookByInstituteId(
			@Named("instituteID") long instituteID) {

		List<GFBookEntity> list = ofy().load().type(GFBookEntity.class).list();

		return list;

	}

	@ApiMethod(name = "getGFBookStockTransactionByInstituteId", path = "getGFBookStockTransactionByInstituteId")
	public List<GFBookTransactionEntity> getGFBookStockTransactionByInstituteId(
			@Named("instituteID") long instituteID) {

		List<GFBookTransactionEntity> list = ofy().load().type(GFBookTransactionEntity.class).list();

		return list;

	}
	
	@ApiMethod(name = "getGFBookById", path = "getGFBookById")
	public GFBookEntity getGFBookById(@Named("id") long studID) {

		GFBookEntity book = ofy().load().type(GFBookEntity.class).id(studID)
				.now();

		return book;

	}

	@ApiMethod(name = "addGFBookStock", path = "addGFBookStock")
	public void addGFBookStock(GFBookStockEntity gfBookStockEntity) {

		long instId = gfBookStockEntity.getInstituteID();

		List<GFBookStockEntity> bookList = ofy().load()
				.type(GFBookStockEntity.class).filter("instituteID", instId)
				.list();

		if (bookList.size() == 0) {
			ofy().save().entity(gfBookStockEntity).now();
		} else {
			for (int i = 0; i < bookList.size(); i++) {
				if (bookList.get(i).getBook().getId()
						.equals(gfBookStockEntity.getBook().getId())) {
				
					if (bookList.get(i).getMedium().equals(gfBookStockEntity
							.getMedium())) {
						
						GFBookStockEntity temp = bookList.get(i);
						temp.setBookQty(gfBookStockEntity.getBookQty() + temp.getBookQty());

						ofy().save().entity(temp);
					break;
					} else {
						
					}
					
				}else{
					ofy().save().entity(gfBookStockEntity).now();
				}
			}
		}

		// To Update the Book Transaction Entity
		GFBookTransactionEntity newTransaction = new GFBookTransactionEntity();
		newTransaction.setInstituteID(gfBookStockEntity.getInstituteID());
		newTransaction.setTransactionType("Cr");
		newTransaction.setBook(gfBookStockEntity.getBook());
		newTransaction.setTransactionDate(gfBookStockEntity.getFeedStockDate());
		newTransaction.setMedium(gfBookStockEntity.getMedium());
		newTransaction.setBookQty(gfBookStockEntity.getBookQty());
		ofy().save().entity(newTransaction).now();
	}

	@ApiMethod(name = "getGFBookStockByInstituteId", path = "getGFBookStockByInstituteId")
	public List<GFBookStockEntity> getGFBookStockByInstituteId(
			@Named("instituteID") long instituteID) {

		List<GFBookStockEntity> list = ofy().load()
				.type(GFBookStockEntity.class).list();

		return list;

	}

	@ApiMethod(name = "getGFBookStockById", path = "getGFBookStockById")
	public GFBookStockEntity getGFBookStockById(@Named("id") long bookID) {

		GFBookStockEntity book = ofy().load().type(GFBookStockEntity.class)
				.id(bookID).now();

		return book;

	}
}
