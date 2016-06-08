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

import com.protostar.prostudy.gf.entity.GFStudentEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;

/**
 * Servlet implementation class DownloadGFStudents
 */
public class DownloadGFStudents extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadGFStudents() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hi i am download servlet");
		Long insId = Long.parseLong(request.getParameter("InstituteId"));

		System.out.println("insid===" + insId);
//		PartnerSchoolService patss=new PartnerSchoolService();
		GFStudentService gfStudentService = new GFStudentService();
		
		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT); 
		
//		List<PartnerSchoolEntity> patse =patss.getPartnerByInstitute(insId);
		
		List<GFStudentEntity> gfStudentEntitie = gfStudentService.getGFStudentsByInstitute(insId);
		
		OutputStream out = null;
		try {

			response.setContentType("application/vnd.ms-excel");

			
			response.setHeader("Content-Disposition",
					"attachment; filename=StudentData_"+sdf.format(date)+".csv");

			WritableWorkbook w = Workbook.createWorkbook(response
					.getOutputStream());
			WritableSheet s = w.createSheet("Demo", 0);

			s.addCell(new Label(0, 0, "fName"));
			s.addCell(new Label(1, 0, "mName"));
			s.addCell(new Label(2, 0, "lName"));
			s.addCell(new Label(3, 0, "gender"));
			s.addCell(new Label(4, 0, "mediumOfAnswer"));
			s.addCell(new Label(27, 0, "Temp"));
			
			
			for (int i = 0; i < gfStudentEntitie.size(); i++) {
				int l=i+1;
				int k=15;	
				s.addCell(new Label(0,l,gfStudentEntitie.get(i).getfName()));
				s.addCell(new Label(1, l,gfStudentEntitie.get(i).getmName()));
				s.addCell(new Label(2, l,gfStudentEntitie.get(i).getlName()));
				s.addCell(new Label(3, l, gfStudentEntitie.get(i).getGender()));
				s.addCell(new Label(4, l,gfStudentEntitie.get(i).getMediumOfAnswer()));	
				
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