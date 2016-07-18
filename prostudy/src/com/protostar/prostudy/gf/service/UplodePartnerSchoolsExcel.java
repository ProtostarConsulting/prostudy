package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.protostar.prostudy.entity.Address;
import com.protostar.prostudy.gf.entity.BookSummary;
import com.protostar.prostudy.gf.entity.ContactDetail;
import com.protostar.prostudy.gf.entity.CoordinatorDetail;
import com.protostar.prostudy.gf.entity.ExamDetail;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.until.data.UtilityService;

/**
 * Servlet implementation class UplodePartnerSchoolsExcel
 */
public class UplodePartnerSchoolsExcel extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final Logger log = Logger
			.getLogger(UplodePartnerSchoolsExcel.class.getName());

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UplodePartnerSchoolsExcel() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		log.info("In side UplodePartnerSchoolsExcel");
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
				Map parameterMap = request.getParameterMap();
				for (Object key : parameterMap.keySet()) {
					log.fine("key:" + key + "\b value:" + parameterMap.get(key));
				}

				Long insId = 0L;
				while (iterator.hasNext()) {
					FileItemStream item = iterator.next();
					log.fine("item.getFieldName(): " + item.getFieldName());

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
					// log.fine("No of bytes read:" + read);
					while ((len = openStream.read(fileContent, 0,
							fileContent.length)) != -1) {
						// res.getOutputStream().write(fileContent, 0, len);
					}
					log.fine("File content is : " + new String(fileContent));
					log.fine("File Read is Done!!");
					// Write code here to parse sheet of patients and upload to
					// database

					String fileAsString = new String(fileContent);

					split2 = fileAsString.split("\n");

				}
				// gte business entity

				for (int row = 1; row < split2.length; row++) {
					try {
						String[] split = split2[row].split(",");
						if (split == null || split.length < 27) {
							continue;
						}
						log.fine(" Row: " + row);
						log.fine(" schoolName: " + split[0]);
						log.fine(" desc: " + split[1]);
						log.fine(" formNumber: " + split[2]);
						log.fine(" category: " + split[3]);
						log.fine(" primaryContact: " + split[4]);
						log.fine(" line1: " + split[5]);
						log.fine(" line2: " + split[6]);
						log.fine(" city: " + split[7]);
						log.fine(" state: " + split[8]);
						log.fine(" country: " + split[9]);
						log.fine(" pin: " + split[10]);
						log.fine(" totalStudent: " + split[11]);
						log.fine(" male: " + split[12]);
						log.fine(" female: " + split[13]);
						log.fine(" total: " + split[14]);
						log.fine(" examMedium1: " + split[15]);
						log.fine(" examMedium2: " + split[16]);
						log.fine(" examMedium3: " + split[17]);
						log.fine(" yearOfExam: " + split[18]);
						log.fine(" bookRequired: " + split[19]);
						log.fine(" modeOfExam: " + split[20]);
						log.fine(" headMasterName: " + split[21]);
						log.fine(" headMasterMobile: " + split[22]);
						log.fine(" headMasterEmailId: " + split[23]);
						log.fine(" coordinatorName: " + split[24]);
						log.fine(" coordinatorPhoneNum: " + split[25]);
						log.fine(" coordinatorEmailId: " + split[26]);
						log.fine(" Col28: " + split[27]);

						// insert partner school
						PartnerSchoolEntity patschool = new PartnerSchoolEntity();
						patschool.setSchoolName(split[0]);
						patschool.setInstName(split[1]);
						patschool.setFormNumber(split[2]);
						patschool.setCategory(split[3]);
						patschool.setPrimaryContact(split[4]);
						patschool.setInstituteID(insId);
						// address
						Address add = new Address();
						add.setLine1(split[5]);
						add.setLine2(split[6]);
						add.setPin(split[10]);
						add.setCity(split[7]);
						add.setState(split[8]);
						add.setCountry(split[9]);
						patschool.setAddress(add);
						// ExamDetail
						ExamDetail eDtail = new ExamDetail();
						eDtail.setBookRequired(split[19]);
						/*
						 * eDtail.setExamMedium(Arrays.asList(split[15],
						 * split[16], split[17]));
						 */
						eDtail.setFemale(split[13]);
						eDtail.setMale(split[12]);
						eDtail.setModeOfExam(split[20]);
						eDtail.setTotal(split[14]);
						eDtail.setTotalStudent(split[11]);
						eDtail.setYearOfExam(split[18]);
						/* patschool.setExamDetail(eDtail); */
						// Contact Detail

						ContactDetail conDetail = new ContactDetail();
						// conDetail.setCoordinatorEmailId(split[26]);
						// conDetail.setCoordinatorName(split[24]);
						// conDetail.setCoordinatorPhoneNum(split[25]);
						CoordinatorDetail corddetail = new CoordinatorDetail();
						corddetail.setSrno(1);
						corddetail.setCoordinatorEmailId(split[26]);
						corddetail.setCoordinatorName(split[24]);
						corddetail.setCoordinatorPhoneNum(split[25]);

						conDetail.setCoordinatorDetail(Arrays
								.asList(corddetail));
						conDetail.setHeadMasterEmailId(split[23]);
						conDetail.setHeadMasterMobile(split[22]);
						conDetail.setHeadMasterName(split[21]);
						patschool.setContactDetail(conDetail);

						// book summary
						BookSummary bookSummary = new BookSummary();
						/* patschool.setBookSummary(bookSummary); */

						PartnerSchoolService partnerSchool = new PartnerSchoolService();
						partnerSchool.addPartnerSchool(patschool);
					} catch (Exception e) {
						log.severe(e.getMessage());
						e.printStackTrace();
						throw new ServletException(
								"Error Occurred while uploading the csv file.",
								e);
					}

				}
			}

		} catch (Exception e) {
			log.severe(e.getMessage());
			e.printStackTrace();
			throw new ServletException(
					"Error Occurred while uploading the csv file.", e);
		}

	}
}
