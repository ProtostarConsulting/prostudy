package com.protostar.prostudy.service;

import java.io.IOException;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.prostudy.entity.BookEntity;

/**
 * Servlet implementation class UploadBookPDFServlet
 */
public class UploadBookPDFServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UploadBookPDFServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();


	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		
		System.out.println("Hi UploadBookPDFServlet ");
		request.setCharacterEncoding("UTF-8");
		
		Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
		List<BlobKey> blobKeys = blobs.get("myFile");
		System.out.println("blobKeys:" + blobKeys);
		
		
		
		
		Enumeration en=request.getParameterNames();
		 
		while(en.hasMoreElements())
		{
			Object objOri=en.nextElement();
			String param=(String)objOri;
			String value=request.getParameter(param);
			System.out.println("Parameter Name is '"+param+"' and Parameter Value is '"+value+"'");
		
		}		

		Long instituteID = null;
		
		
		if (blobKeys == null || blobKeys.isEmpty()) {
			response.sendRedirect("/");
		} else {

			BookService bookservice = new BookService();
			BookEntity bookEntity = new BookEntity();

			// This is required as there is bug in md-select which preponds the dot operator
			// Checkbox issue   isPDF=request.getParameter("isPDF")!=false;
			
			Boolean isPDF= Boolean.parseBoolean(request.getParameter("isPDF"));
			
			instituteID=Long.parseLong(request.getParameter("instituteID"));
		
			System.out.println("isPDF1--"+request.getParameter("isPDF"));	
			System.out.println("isPDF2--"+isPDF);	
			
			String standard = request.getParameter("standard");
			if (standard == null) {
				standard = request.getParameter(".standard");
			}
			String board = request.getParameter("board");
			if (board == null) {
				board = request.getParameter(".board");
			}
			String division = request.getParameter("division");
			if (division == null) {
				division = request.getParameter(".division");
			}
			String subject = request.getParameter("subject");
			if (subject == null) {
				subject = request.getParameter(".subject");
			}
		

			bookEntity.setBook_name(request.getParameter("book_name"));
			bookEntity.setAuthor(request.getParameter("author"));
			bookEntity.setStandard(board);
			bookEntity.setStandard(standard);
			bookEntity.setDivision(division);
			bookEntity.setSubject(subject);
			bookEntity.setInstituteID(instituteID);
			// bookEntity.setLikes(request.getParameter("likes"));
			// bookEntity.setDislikes(request.getParameter("dislikes"));
			bookEntity.setIsPDF(isPDF);		
			
			bookEntity.setBlobKey(blobKeys.get(0).getKeyString());
			bookservice.addBook(bookEntity);
		}

		// Save this into DB

		response.sendRedirect("/#/book/list");

	}

}
