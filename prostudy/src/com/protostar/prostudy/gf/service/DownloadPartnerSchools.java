package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
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

//			response.setContentType("application/vnd.ms-excel");
			response.setContentType("text/csv");
			
			response.setHeader("Content-Disposition",
					"attachment; filename=SchoolData_"+sdf.format(date)+".csv");

			
			
			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);

			writer.append("SchoolName");
			writer.append(',');
			writer.append("desc");
			writer.append(',');
			writer.append("formNumber");
			writer.append(',');
/*			writer.append("category");
			writer.append(',');
*//*			writer.append("primaryContact");
			writer.append(',');
*/			writer.append("line1");
			writer.append(',');
			writer.append("line2");
			writer.append(',');
			writer.append("city");
			writer.append(',');
			writer.append("taluka");
			writer.append(',');
			writer.append("district");
			writer.append(',');
			writer.append("state");
			writer.append(',');
			writer.append("country");
			writer.append(',');
			writer.append("pin");
			writer.append(',');
			writer.append("totalStudent");
			writer.append(',');
			writer.append("male");
			writer.append(',');
			writer.append("female");
			writer.append(',');
			writer.append("total");
			writer.append(',');
			writer.append("examMedium1");
			writer.append(',');
			writer.append("examMedium2");
			writer.append(',');
			writer.append("examMedium3");
			writer.append(',');
			writer.append("yearOfExam");
			writer.append(',');
			writer.append("bookRequired");
			writer.append(',');
			writer.append("modeOfExam");
			writer.append(',');
			writer.append("headMasterName");
			writer.append(',');
			writer.append("headMasterMobile");
			writer.append(',');
			writer.append("headMasterEmailId");
			writer.append(',');
			writer.append("coordinatorName");
			writer.append(',');
			writer.append("coordinatorPhoneNum");
			writer.append(',');
			writer.append("coordinatorEmailId");
			writer.append(',');
			
			writer.append(System.lineSeparator());			
			
			for (int i = 0; i < patse.size(); i++) {
				int l=i+1;
				int k=15;	
				String cat = patse.get(i).getCategory().trim();
				
				writer.append(patse.get(i).getSchoolName());
				writer.append(',');
				writer.append(patse.get(i).getInstName());
				writer.append(',');
				writer.append(patse.get(i).getFormNumber());
				writer.append(',');
/*				writer.append(cat);
				writer.append(',');
*//*				writer.append(patse.get(i).getPrimaryContact());
 				writer.append(',');
*/		
				writer.append(patse.get(i).getAddress().getLine1());
				writer.append(',');
				writer.append(patse.get(i).getAddress().getLine2());
				writer.append(',');
				writer.append(patse.get(i).getAddress().getCity());
				writer.append(',');
				writer.append(patse.get(i).getAddress().getTal());
				writer.append(',');
				writer.append(patse.get(i).getAddress().getDist());
				writer.append(',');
				
				writer.append(patse.get(i).getAddress().getState());
				writer.append(',');
				writer.append(patse.get(i).getAddress().getCountry());
				writer.append(',');
				writer.append(patse.get(i).getAddress().getPin());
				writer.append(',');
				writer.append(System.lineSeparator());
								
			}
	
			writer.close();

		} catch (Exception e) {
			throw new ServletException("Exception in Excel Sample Servlet", e);
		} finally {
			if (out != null)
				out.close();
		}

	}

}
