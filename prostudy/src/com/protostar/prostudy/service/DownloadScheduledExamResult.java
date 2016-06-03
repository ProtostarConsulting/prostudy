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

import com.protostar.prostudy.entity.ScheduledExamResultEntity;

/**
 * Servlet implementation class DownloadScheduledExamResult
 */
public class DownloadScheduledExamResult extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadScheduledExamResult() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		System.out.println("hello i am in download servlet");
		Long selectedExamId = Long.parseLong(request.getParameter("selectedExamId"));

		System.out.println("selectedExamId===" + selectedExamId);
		ScheduledExamResultService patss=new ScheduledExamResultService();
		
		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT); 
		
		List<ScheduledExamResultEntity> patse =patss.getScheduledExamResultListByExamId(selectedExamId);
		
		
		OutputStream out = null;
		try {

			response.setContentType("application/vnd.ms-excel");

			
			response.setHeader("Content-Disposition",
					"attachment; filename=ScheduledExamResultList_"+sdf.format(date)+".csv");

			WritableWorkbook w = Workbook.createWorkbook(response
					.getOutputStream());
			WritableSheet s = w.createSheet("Demo", 0);

			s.addCell(new Label(0, 0, "id"));
			s.addCell(new Label(1, 0, "examTitle"));
			s.addCell(new Label(2, 0, "userId"));
			s.addCell(new Label(3, 0, "email_id"));
			s.addCell(new Label(4, 0, "firstName"));
			s.addCell(new Label(5, 0, "lastName"));
			s.addCell(new Label(6, 0, "startTime"));
			s.addCell(new Label(7, 0, "endTime"));
			s.addCell(new Label(8, 0, "score"));
			s.addCell(new Label(9, 0, "testID"));
			s.addCell(new Label(10, 0, "userAns"));
			s.addCell(new Label(11, 0, "test"));		
		
			
			for (int i = 0; i < patse.size(); i++) {
				int l=i+1;
				int k=15;
			
				s.addCell(new Label(0,l,patse.get(i).getId().toString()));
				s.addCell(new Label(1, l,patse.get(i).getExamTitle()));
				s.addCell(new Label(2, l,patse.get(i).getUserId()));
				s.addCell(new Label(3, l, patse.get(i).getEmail_id()));
				s.addCell(new Label(4, l,patse.get(i).getFirstName()));
				s.addCell(new Label(5, l, patse.get(i).getLastName()));
				s.addCell(new Label(6, l, patse.get(i).getStartTime()));
				s.addCell(new Label(7, l, patse.get(i).getEndTime()));
				s.addCell(new Label(8, l, patse.get(i).getScore()));
				s.addCell(new Label(9, l, patse.get(i).getTestID().toString()));
				s.addCell(new Label(10,l, patse.get(i).getUserAns().toString()));
				s.addCell(new Label(11,l, patse.get(i).getTest().toString()));
				
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
