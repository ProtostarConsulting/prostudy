package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.googlecode.objectify.Key;
import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFBookStockEntity;
import com.protostar.prostudy.gf.entity.GFBookTransactionEntity;
import com.protostar.prostudy.until.data.UtilityService;

public class UploadBulkBookServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public UploadBulkBookServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("In suide UploadBulkBookServlet....");
		this.doGet(request, response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			if (request.getHeader("Content-Type") != null
					&& request.getHeader("Content-Type").startsWith(
							"multipart/form-data")) {
				ServletFileUpload upload = new ServletFileUpload();

				FileItemIterator iterator = upload.getItemIterator(request);
				String[] split2 = null;			
				Long insId = 0L;
				while (iterator.hasNext()) {
					FileItemStream item = iterator.next();
					System.out.println("item.getFieldName(): "
							+ item.getFieldName());

					if (item.getName() == null) {
						// It is form field not file.

						if ("instituteId".equalsIgnoreCase(item.getFieldName())) {
							insId = Long.parseLong(UtilityService.read(item
									.openStream()));

						}
						continue;
					}
					InputStream openStream = item.openStream();
					int len = 0;
					byte[] fileContent = new byte[2000000];
					// Can handle files upto 20 MB

					int read = openStream.read(fileContent);
					// System.out.println("No of bytes read:" + read);
					while ((len = openStream.read(fileContent, 0,
							fileContent.length)) != -1) {
						// res.getOutputStream().write(fileContent, 0, len);
					}
					System.out.println("File content is : "
							+ new String(fileContent));
					System.out.println("File Read is Done!!");
					// Write code here to parse sheet of patients and upload to
					// database

					String fileAsString = new String(fileContent);

					split2 = fileAsString.split("\n");

				}

				for (int row = 1; row < split2.length; row++) {

					String[] split = split2[row].split(",");
					if (split == null || split.length < 5) {
						continue;
					}
					System.out.println(" Row: " + row);
					System.out.println(" standard: " + split[0]);
					System.out.println(" bookName: " + split[1]);
					System.out.println(" bookAuther: " + split[2]);
					System.out.println(" weight: " + split[3]);
					System.out.println(" bookPrice: " + split[4]);
					System.out.println(" bookPublication: " + split[5]);

					Date todaysDate = new Date();

					GFBookEntity gfBookEntity = new GFBookEntity();

					gfBookEntity.setStandard(split[0].trim());
					gfBookEntity.setBookName(split[1].trim());
					gfBookEntity.setBookAuther(split[2].trim());
					gfBookEntity.setWeight(Integer.parseInt(split[3].trim()));
					gfBookEntity
							.setBookPrice(Integer.parseInt(split[4].trim()));
					gfBookEntity.setBookPublication(split[5].trim());
					gfBookEntity.setBookMedium(split[6]);
					gfBookEntity.setBookQty(Integer.parseInt(split[7].trim()));
					gfBookEntity.setBookFeedDate(todaysDate);
					gfBookEntity.setInstituteID(insId);

					ofy().save().entity(gfBookEntity).now();

					Key<GFBookEntity> gfbook = ofy().save()
							.entity(gfBookEntity).now();
					long bkID = gfbook.getId();

					GFBookStockService gfBookStockService = new GFBookStockService();
					GFBookEntity gfEntity = gfBookStockService
							.getGFBookById(bkID);

					/*
					 * GFBookEntity book =
					 * ofy().load().type(GFBookEntity.class).id(bkID) .now();
					 */
					GFBookTransactionEntity newTransaction = new GFBookTransactionEntity();
					newTransaction.setBook(gfEntity);
					newTransaction.setInstituteID(insId);
					newTransaction.setTransactionType("Cr");
					newTransaction.setTransactionDate(todaysDate);
					newTransaction.setBookQty(gfEntity.getBookQty());
					ofy().save().entity(newTransaction).now();

					GFBookStockEntity gfBookStockEntity = new GFBookStockEntity();
					gfBookStockEntity.setBook(gfEntity);
					gfBookStockEntity.setBookQty(gfEntity.getBookQty());
					gfBookStockEntity.setFeedStockDate(todaysDate);
					gfBookStockEntity.setInstituteID(insId);

					ofy().save().entity(gfBookStockEntity).now();
					System.out.println("Processed record: "
							+ gfEntity.getBookName());
					
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
