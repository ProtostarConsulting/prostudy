package com.protostar.prostudy.service;

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

import com.protostar.prostudy.entity.ScheduledQuestionEntity;

/**
 * Servlet implementation class DownloadScheduledQuestionListServlet
 */
public class DownloadScheduledQuestionListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadScheduledQuestionListServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hello i am in download servlet");
		Long instituteId = Long.parseLong(request.getParameter("instituteId"));

		System.out.println("instituteId===" + instituteId);
		ScheduledQuestionService sqService= new ScheduledQuestionService();
		
		
		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT); 
		
		List<ScheduledQuestionEntity> patse =sqService.getQuestionsByInstitute(instituteId);
		System.out.println(patse);
		
		OutputStream out = null;
		try {

			response.setContentType("application/vnd.ms-excel");

			
			response.setHeader("Content-Disposition",
					"attachment; filename=ScheduledQuestionList_"+sdf.format(date)+".csv");

			WritableWorkbook w = Workbook.createWorkbook(response
					.getOutputStream());
			WritableSheet s = w.createSheet("Demo", 0);

			s.addCell(new Label(0, 0, "id"));
			s.addCell(new Label(1, 0, "instituteID"));
			s.addCell(new Label(2, 0, "description"));
			s.addCell(new Label(3, 0, "category"));
			s.addCell(new Label(4, 0, "option1"));
			s.addCell(new Label(5, 0, "option2"));
			s.addCell(new Label(6, 0, "option3"));
			s.addCell(new Label(7, 0, "option4"));
			s.addCell(new Label(8, 0, "correctAns"));		
			
			
			for (int i = 0; i < patse.size(); i++) {
				int l=i+1;
				int k=15;
			
				s.addCell(new Label(0,l,patse.get(i).getId().toString()));
				s.addCell(new Label(1, l,patse.get(i).getInstituteID().toString()));
				s.addCell(new Label(2, l,patse.get(i).getDescription()));
				s.addCell(new Label(3, l, patse.get(i).getCategory()));
				s.addCell(new Label(4, l,patse.get(i).getOption1()));
				s.addCell(new Label(5, l, patse.get(i).getOption2()));
				s.addCell(new Label(6, l, patse.get(i).getOption3()));
				s.addCell(new Label(7, l, patse.get(i).getOption4()));
				s.addCell(new Label(8, l, patse.get(i).getCorrectAns()));
												
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

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
