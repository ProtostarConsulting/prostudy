package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

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
	public void addGFCourier(GFCourierEntity gfCourierEntity) throws MessagingException, IOException {

		ofy().save().entity(gfCourierEntity).now();

		GFBookTransactionEntity gfBookTransactionEntity = new GFBookTransactionEntity();

		int sum = 0;
		for (int i = 0; i < gfCourierEntity.getBookLineItemList().size(); i++) {

			sum = sum + gfCourierEntity.getBookLineItemList().get(i).getBookQty();
		}
		
		if (gfCourierEntity.getBookLineItemList().size() < 1) {
			gfBookTransactionEntity.setTransactionType("Dr");
			ofy().save().entity(gfBookTransactionEntity).now();
		} else {
			for (int i = 0; i < gfCourierEntity.getBookLineItemList().size(); i++) {

				GFBookEntity book = gfCourierEntity.getBookLineItemList()
						.get(i);
				gfBookTransactionEntity.setBook(book);
				gfBookTransactionEntity.setBookQty(sum);
				gfBookTransactionEntity.setInstituteID(gfCourierEntity.getInstituteID());
				gfBookTransactionEntity.setTransactionDate(gfCourierEntity.getCourierDispatchDate());
				gfBookTransactionEntity.setTotalFees(gfCourierEntity.getTotalFees());
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
		
		String emailID = "aniketbhalsing1@gmail.com";
		Properties props = new Properties();
		
		Session session = Session.getDefaultInstance(props, null);
		String messageBody = "Your Courier Has been Dispatched ";
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("ganesh.lawande@protostar.co.in","ProERP"));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(emailID));
			message.setSubject("Courier Dispatch From Gandhi Foundation " );
			message.setText(messageBody);
			Transport.send(message);
		} catch (AddressException e) {
			// An email address was invalid.
			// ...
			e.printStackTrace();
		} catch (MessagingException e) {
			// There was an error contacting the Mail service.
			// ...
			e.printStackTrace();
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
