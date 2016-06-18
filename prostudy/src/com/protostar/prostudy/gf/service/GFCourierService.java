package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFBookStockEntity;
import com.protostar.prostudy.gf.entity.GFBookTransactionEntity;
import com.protostar.prostudy.gf.entity.GFCourierEntity;

@Api(name = "gfCourierService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class GFCourierService {

	@ApiMethod(name = "addGFCourier")
	public void addGFCourier(GFCourierEntity gfCourierEntity) {

		ofy().save().entity(gfCourierEntity).now();

		GFBookTransactionEntity gfBookTransactionEntity = new GFBookTransactionEntity();

		if (gfCourierEntity.getBookLineItemList().size() < 1) {
			gfBookTransactionEntity.setTransactionType("Dr");
			ofy().save().entity(gfBookTransactionEntity).now();
		} else {
			for (int i = 0; i < gfCourierEntity.getBookLineItemList().size(); i++) {

				GFBookEntity book = gfCourierEntity.getBookLineItemList()
						.get(i);
				gfBookTransactionEntity.setBook(book);
				gfBookTransactionEntity.setBookQty(gfCourierEntity.getBookLineItemList().get(i).getBookQty());
				gfBookTransactionEntity.setInstituteID(gfCourierEntity.getInstituteID());
				gfBookTransactionEntity.setTransactionDate(gfCourierEntity.getCourierDispatchDate());
				gfBookTransactionEntity.setTransactionType("Dr");

				ofy().save().entity(gfBookTransactionEntity).now();
			}
		}

		// For Deduct the book Stock

		for (int i = 0; i < gfCourierEntity.getBookLineItemList().size(); i++) {

			long bID = gfCourierEntity.getBookLineItemList().get(i).getId();
			String bookmedium = gfCourierEntity.getBookLineItemList().get(i)
					.getBookMedium();

			GFBookEntity getBook = ofy().load().type(GFBookEntity.class).id(bID).now();

			int bkQty = getBook.getBookQty() - gfCourierEntity.getBookLineItemList().get(i).getBookQty();
			getBook.setBookQty(bkQty);
			ofy().save().entity(getBook).now();
			
			GFBookStockEntity filteredbook = ofy().load()
					.type(GFBookStockEntity.class)
					.filter("book", Ref.create(Key.create(GFBookEntity.class, bID)))
					.first().now();
			
			int bkQty1 = filteredbook.getBookQty() - gfCourierEntity.getBookLineItemList().get(i).getBookQty();
			filteredbook.setBookQty(bkQty1);
			ofy().save().entity(filteredbook).now();
			

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
