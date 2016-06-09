package com.protostar.prostudy.service;

import java.io.IOException;
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
import com.protostar.prostudy.entity.ScheduledQuestionEntity;

/**
 * Servlet implementation class UploadScheduledQuestionListServlet
 */
public class UploadScheduledQuestionListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UploadScheduledQuestionListServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		System.out.println("Hi i m in UploadScheduledQuestionListServlet");
		
		Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
		List<BlobKey> blobKeys = blobs.get("myFile");

		
		Long instituteID = null;
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
					if (item.getFieldName().equals("instituteID")) {
						System.out.println("instituteID id=="
								+ request.getParameter(item.getFieldName()));
						if (!request.getParameter(item.getFieldName()).equals(
								""))
							instituteID = Long.parseLong(request.getParameter(item
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
					// System.out.println("fileContent:" + fileAsString);
					// List<PatientInfo> patientInfoList = new
					// ArrayList<PatientInfo>();

					split2 = fileAsString.split("\n");
					// Start with 1 not 0, zero holds column headings

				}

			}

			try {
				// gte business entity

				for (int row = 1; row < split2.length; row++) {

					String[] split = split2[row].split(",");
					if (split == null || split.length < 8) {
						System.out.println(", inserted!!");
						continue;
					}
					
				

					// insert ScheduledQuestion
					ScheduledQuestionEntity sq = new ScheduledQuestionEntity();
					//sq.setDescription(split[0]);
					sq.setInstituteID(instituteID);
					sq.setDescription(split[1]);
					sq.setCategory(split[2]);
					sq.setOption1(split[3]);
					sq.setOption2(split[4]);
					sq.setOption3(split[5]);
					sq.setOption4(split[6]);
					sq.setCorrectAns(split[7]);

					ScheduledQuestionService sqs = new ScheduledQuestionService();
					sqs.addQuestion(sq);

				}
				blobstoreService.delete(blobKeys.get(0));

				response.sendRedirect("/#/scheduledExam.questionList");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} catch (Exception e) {
			response.getOutputStream().print(
					"File Uploading Failed!" + e.getMessage());
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("Inside UploadScheduledQuestionListServlet");
		this.doGet(request, response);
	}

}
