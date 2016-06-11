package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreInputStream;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFBookStockEntity;
import com.protostar.prostudy.gf.entity.GFBookTransactionEntity;

public class UploadBulkBookServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public UploadBulkBookServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hi i m in GF Book servlet");
		this.doGet(request, response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
		List<BlobKey> blobKeys = blobs.get("myFile");

		Long insId = null; 
//		Long selectedSchoolID = null; 
		
		System.out.println("blobKeys:" + blobKeys);
		blobKeys.get(0).getKeyString();
		String[] split2 = null;
		try {
			ServletFileUpload upload = new ServletFileUpload();
			// res.setContentType("text/plain");

			FileItemIterator iterator = upload.getItemIterator(request);
			while (iterator.hasNext()) {

				FileItemStream item = iterator.next();
				// InputStream stream = item.openStream();
				BlobstoreInputStream stream = new BlobstoreInputStream(
						new BlobKey(blobKeys.get(0).getKeyString()));
				if (item.isFormField()) {
					if (item.getFieldName().equals("insId")) {
						System.out.println("insId id=="+ request.getParameter(item.getFieldName()));
						if (!request.getParameter(item.getFieldName()).equals(
								""))
							insId = Long.parseLong(request.getParameter(item
									.getFieldName()));
					}
					
				} else {

					int len;
					byte[] fileContent = new byte[2000000]; // Can handle files
															// upto 20 MB

					int read = stream.read(fileContent);
					// System.out.println("No of bytes read:" + read);
					while ((len = stream.read(fileContent, 0,
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
					// Start with 1 not 0, zero holds column headings

				}

			}
			 
			try {
				
				for (int row = 1; row < split2.length; row++) {

					String[] split = split2[row].split(",");
					if (split == null || split.length < 5) {
						continue;
					}
					System.out.println(" Row: " + row);
					System.out.println(" bookName: " + split[0]);
					System.out.println(" bookAuther: " + split[1]);	
					System.out.println(" weight: " + split[2]);
					System.out.println(" bookPrice: " + split[3]);
					System.out.println(" bookPublication: "+ split[4] );
		
					
					Date todaysDate = new Date();
					// insert partner school	
										
					GFBookEntity gfBookEntity = new GFBookEntity();
					
					gfBookEntity.setBookName(split[0]);
					gfBookEntity.setBookAuther(split[1]);
					gfBookEntity.setWeight(Integer.parseInt(split[2]));
					gfBookEntity.setBookPrice(Integer.parseInt(split[3]));
					gfBookEntity.setBookPublication(split[4]);
					gfBookEntity.setBookMedium(split[5]);
					gfBookEntity.setBookQty(Integer.parseInt(split[6]));
					gfBookEntity.setBookFeedDate(todaysDate);
					gfBookEntity.setInstituteID(insId);
				
					ofy().save().entity(gfBookEntity).now();
					
					Key<GFBookEntity> gfbook = ofy().save().entity(gfBookEntity).now();
					long bkID = gfbook.getId();
					
					GFBookStockService gfBookStockService = new GFBookStockService();
					GFBookEntity gfEntity = gfBookStockService.getGFBookById(bkID);
					
/*					GFBookEntity book = ofy().load().type(GFBookEntity.class).id(bkID)
							.now();
					
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
				}
				  blobstoreService.delete(blobKeys.get(0));
				  
				response.sendRedirect("/#/gandhifoundation/bookModule/bookModule.list");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} catch (Exception e) {
			response.getOutputStream().print(
					"File Uploading Failed!" + e.getMessage());
		}

	}
}