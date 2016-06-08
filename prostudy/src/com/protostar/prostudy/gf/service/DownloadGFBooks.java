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

import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFStudentEntity;

/**
 * Servlet implementation class DownloadGFBooks
 */
public class DownloadGFBooks extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadGFBooks() {
        super();
        // TODO Auto-generated constructor stub
    }

    protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hi i am download servlet");
		Long insId = Long.parseLong(request.getParameter("InstituteId"));

		System.out.println("insid===" + insId);

		GFBookStockService gfBookStockService = new GFBookStockService();
		
		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT); 
				
		List<GFBookEntity> gfbookEntity = gfBookStockService.getGFBookByInstituteId(insId);
		
		OutputStream out = null;
		try {

			response.setContentType("application/vnd.ms-excel");

			
			response.setHeader("Content-Disposition",
					"attachment; filename=BookData_"+sdf.format(date)+".csv");

			WritableWorkbook w = Workbook.createWorkbook(response
					.getOutputStream());
			WritableSheet s = w.createSheet("Demo", 0);

			s.addCell(new Label(0, 0, "bookName"));
			s.addCell(new Label(1, 0, "bookAuther"));
			s.addCell(new Label(2, 0, "weight"));
			s.addCell(new Label(3, 0, "bookPrice"));
			s.addCell(new Label(4, 0, "bookPublication"));
			s.addCell(new Label(5, 0, "bookMedium"));
			s.addCell(new Label(6, 0, "bookQty"));
			s.addCell(new Label(7, 0, "Temp"));
			
			
			for (int i = 0; i < gfbookEntity.size(); i++) {
				int l=i+1;
				int k=15;	
				
				String qty = String.valueOf(gfbookEntity.get(i).getBookQty());
				String weight = String.valueOf(gfbookEntity.get(i).getWeight());
				String price = String.valueOf(gfbookEntity.get(i).getBookPrice());
				
				s.addCell(new Label(0,l,gfbookEntity.get(i).getBookName()));
				s.addCell(new Label(1, l,gfbookEntity.get(i).getBookAuther()));
				s.addCell(new Label(2, l, weight));
				s.addCell(new Label(3, l, price));
				s.addCell(new Label(4, l,gfbookEntity.get(i).getBookPublication()));	
				s.addCell(new Label(5, l,gfbookEntity.get(i).getBookMedium()));
				s.addCell(new Label(6, l, qty));
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