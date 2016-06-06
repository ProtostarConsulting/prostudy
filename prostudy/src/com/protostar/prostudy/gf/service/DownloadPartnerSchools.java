package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;

/**
 * Servlet implementation class DownloadPartnerSchools
 */
public class DownloadPartnerSchools extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DownloadPartnerSchools() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hi i am download servlet");
		Long insId = Long.parseLong(request.getParameter("InstituteId"));

		System.out.println("insid===" + insId);
		PartnerSchoolService patss=new PartnerSchoolService();
		
		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT); 
		
		List<PartnerSchoolEntity> patse =patss.getPartnerByInstitute(insId);
		
		
		OutputStream out = null;
		try {

			response.setContentType("application/vnd.ms-excel");

			
			response.setHeader("Content-Disposition",
					"attachment; filename=SchoolData_"+sdf.format(date)+".csv");

			WritableWorkbook w = Workbook.createWorkbook(response
					.getOutputStream());
			WritableSheet s = w.createSheet("Demo", 0);

			s.addCell(new Label(0, 0, "SchoolName"));
			s.addCell(new Label(1, 0, "desc"));
			s.addCell(new Label(2, 0, "formNumber"));
			s.addCell(new Label(3, 0, "category"));
			s.addCell(new Label(4, 0, "primaryContact"));
			s.addCell(new Label(5, 0, "line1"));
			s.addCell(new Label(6, 0, "line2"));
			s.addCell(new Label(7, 0, "city"));
			s.addCell(new Label(8, 0, "state"));
			s.addCell(new Label(9, 0, "country"));
			s.addCell(new Label(10, 0, "pin"));
			s.addCell(new Label(11, 0, "totalStudent"));
			s.addCell(new Label(12, 0, "male"));
			s.addCell(new Label(13, 0, "female"));
			s.addCell(new Label(14, 0, "total"));
			s.addCell(new Label(15, 0, "examMedium"));
			s.addCell(new Label(16, 0, "examMedium"));
			s.addCell(new Label(17, 0, "examMedium"));
			s.addCell(new Label(18, 0, "yearOfExam"));
			s.addCell(new Label(19, 0, "bookRequired"));
			s.addCell(new Label(20, 0, "modeOfExam"));
			s.addCell(new Label(21, 0, "headMasterName"));
			s.addCell(new Label(22, 0, "headMasterMobile"));
			s.addCell(new Label(23, 0, "headMasterEmailId"));
			s.addCell(new Label(24, 0, "coordinatorName"));
			s.addCell(new Label(25, 0, "coordinatorPhoneNum"));
			s.addCell(new Label(26, 0, "coordinatorEmailId"));
			s.addCell(new Label(27, 0, "Temp"));
			
			
			for (int i = 0; i < patse.size(); i++) {
				int l=i+1;
				int k=15;	
				s.addCell(new Label(0,l,patse.get(i).getSchoolName()));
				s.addCell(new Label(1, l,patse.get(i).getDesc()));
				s.addCell(new Label(2, l,patse.get(i).getFormNumber()));
				s.addCell(new Label(3, l, patse.get(i).getCategory()));
				s.addCell(new Label(4, l,patse.get(i).getPrimaryContact()));
				s.addCell(new Label(5, l, patse.get(i).getAddress().getLine1()));
				s.addCell(new Label(6, l, patse.get(i).getAddress().getLine2()));
				s.addCell(new Label(7, l, patse.get(i).getAddress().getCity()));
				s.addCell(new Label(8, l, patse.get(i).getAddress().getState()));
				s.addCell(new Label(9, l, patse.get(i).getAddress().getCountry()));
				s.addCell(new Label(10,l, patse.get(i).getAddress().getPin()));
				s.addCell(new Label(11, l, patse.get(i).getExamDetail().getTotalStudent()));
				s.addCell(new Label(12, l, patse.get(i).getExamDetail().getMale()));
				s.addCell(new Label(13, l, patse.get(i).getExamDetail().getFemale()));
				s.addCell(new Label(14, l, patse.get(i).getExamDetail().getTotal()));
				
				for(int j=0;j<patse.get(i).getExamDetail().getExamMedium().size();j++){
					s.addCell(new Label(k, l, patse.get(i).getExamDetail().getExamMedium().get(j)));
					k++;
				}
							
				s.addCell(new Label(18, l, patse.get(i).getExamDetail().getYearOfExam()));
				s.addCell(new Label(19, l, patse.get(i).getExamDetail().getBookRequired()));
				s.addCell(new Label(20, l, patse.get(i).getExamDetail().getModeOfExam()));
				s.addCell(new Label(21, l, patse.get(i).getContactDetail().getHeadMasterName()));
				s.addCell(new Label(22, l, patse.get(i).getContactDetail().getHeadMasterMobile()));
				s.addCell(new Label(23, l, patse.get(i).getContactDetail().getHeadMasterEmailId()));
				//s.addCell(new Label(24, l, patse.get(i).getContactDetail().getCoordinatorName()));
			//	s.addCell(new Label(25, l, patse.get(i).getContactDetail().getCoordinatorPhoneNum()));
			//	s.addCell(new Label(26, l, patse.get(i).getContactDetail().getCoordinatorEmailId()));
				
				
			}
			
		
			
			
			w.write();
			w.close();

		} catch (Exception e) {
			throw new ServletException("Exception in Excel Sample Servlet", e);
		} finally {
			if (out != null)
				out.close();
		}

	}

}
