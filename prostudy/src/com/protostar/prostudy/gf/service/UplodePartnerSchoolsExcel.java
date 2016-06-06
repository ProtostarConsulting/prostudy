package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.tools.ant.taskdefs.Concat;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreInputStream;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.prostudy.entity.Address;
import com.protostar.prostudy.gf.entity.BookSummary;
import com.protostar.prostudy.gf.entity.ContactDetail;
import com.protostar.prostudy.gf.entity.ExamDetail;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;

/**
 * Servlet implementation class UplodePartnerSchoolsExcel
 */
public class UplodePartnerSchoolsExcel extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UplodePartnerSchoolsExcel() {
        super();
        // TODO Auto-generated constructor stub
    }

    private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hi i m in school partner servlet");
		this.doGet(request, response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
		List<BlobKey> blobKeys = blobs.get("myFile");

		Long WareHouseID = null;
		Long insId = null;
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
						System.out.println("insId id=="
								+ request.getParameter(item.getFieldName()));
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
					if (split == null || split.length < 27) {
						continue;
					}
					System.out.println(" Row: " + row);
					System.out.println(" schoolName: " + split[0]);
					System.out.println(" desc: " + split[1]);
					System.out.println(" formNumber: " + split[2]);
					System.out.println(" category: " + split[3]);
					System.out.println(" primaryContact: " + split[4]);
					System.out.println(" line1: " + split[5]);
					System.out.println(" line2: " + split[6]);
					System.out.println(" city: " + split[7]);
					System.out.println(" state: " + split[8]);
					System.out.println(" country: " + split[9]);
					System.out.println(" pin: " + split[10]);
					System.out.println(" totalStudent: " + split[11]);
					System.out.println(" male: " + split[12]);
					System.out.println(" female: " + split[13]);
					System.out.println(" total: " + split[14]);
					System.out.println(" examMedium1: " + split[15]);
					System.out.println(" examMedium2: " + split[16]);
					System.out.println(" examMedium3: " + split[17]);
					System.out.println(" yearOfExam: " + split[18]);
					System.out.println(" bookRequired: " + split[19]);
					System.out.println(" modeOfExam: " + split[20]);
					System.out.println(" headMasterName: " + split[21]);
					System.out.println(" headMasterMobile: " + split[22]);
					System.out.println(" headMasterEmailId: " + split[23]);
					System.out.println(" coordinatorName: " + split[24]);
					System.out.println(" coordinatorPhoneNum: " + split[25]);
					System.out.println(" coordinatorEmailId: " + split[26]);
					System.out.println(" Col28: " + split[27]);
					
					
					// insert partner school	
					PartnerSchoolEntity patschool=new PartnerSchoolEntity();
					patschool.setSchoolName(split[0]);
					patschool.setDesc(split[1]);
					patschool.setFormNumber(split[2]);
					patschool.setCategory(split[3]);
					patschool.setPrimaryContact(split[4]);
					patschool.setInstituteID(insId);
					//address
					Address add=new Address();
					add.setLine1(split[5]);
					add.setLine2(split[6]);
					add.setPin(split[10]);
					add.setCity(split[7]);
					add.setState(split[8]);
					add.setCountry(split[9]);
					patschool.setAddress(add);
					//ExamDetail					
					ExamDetail eDtail=new ExamDetail();
					eDtail.setBookRequired(split[19]);
					eDtail.setExamMedium(Arrays.asList(split[15],split[16],split[17]));
					eDtail.setFemale(split[13]);
					eDtail.setMale(split[12]);
					eDtail.setModeOfExam(split[20]);
					eDtail.setTotal(split[14]);
					eDtail.setTotalStudent(split[11]);
					eDtail.setYearOfExam(split[18]);
					patschool.setExamDetail(eDtail);
					//Contact Detail 
					
					ContactDetail conDetail=new ContactDetail();
				//	conDetail.setCoordinatorEmailId(split[26]);
				//	conDetail.setCoordinatorName(split[24]);
					//conDetail.setCoordinatorPhoneNum(split[25]);
					conDetail.setHeadMasterEmailId(split[23]);
					conDetail.setHeadMasterMobile(split[22]);
					conDetail.setHeadMasterName(split[21]);
					patschool.setContactDetail(conDetail);
					
					
					//book summary
					BookSummary bookSummary=new BookSummary();
					patschool.setBookSummary(bookSummary);
							
					PartnerSchoolService partnerSchool=new PartnerSchoolService();
					partnerSchool.addPartnerSchool(patschool);
							
				}
				  blobstoreService.delete(blobKeys.get(0));
				  
				response.sendRedirect("/#/partnerSchool/listPartnerSchool");
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
