package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.service.InstituteService;

public class UploadBulkGFStudentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public UploadBulkGFStudentServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");

		System.out.println("Hi I am in servlet set logo");
		Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
		List<BlobKey> blobKeys = blobs.get("myFile");

		Long instID = null; 
			 

		boolean isMultipart = ServletFileUpload.isMultipartContent(request);

		if (isMultipart) {
			// Create a factory for disk-based file items
			FileItemFactory factory = new DiskFileItemFactory();
			// Create a new file upload handler
			ServletFileUpload upload = new ServletFileUpload(factory);
			try {
				// Parse the request/* FileItem
				List<?> items = upload.parseRequest(request);
				Iterator<?> iterator = items.iterator();
				while (iterator.hasNext()) {
					FileItem item = (FileItem) iterator.next();
					if (item.isFormField()) {
						if (item.getFieldName().equals("instID")) {
							instID = Long.parseLong(item.getString());
							System.out.println("instID=" + instID);
						}
					}
				}
			} catch (Exception e) {

			}
		}

		if (blobKeys == null || blobKeys.isEmpty()) {
			response.sendRedirect("/");
		} else {
			// Save blobKeys into current business entity field
			 InstituteService ins = new InstituteService();
			 InstituteEntity getInstituteById = ins.getInstituteById(instID); 
			 getInstituteById.setBulkGFStudentBlobKey(blobKeys.get(0).getKeyString());
		
			 ofy().save().entity(getInstituteById).now();
			
			 response.sendRedirect("/#/gandhifoundation");  
			 //response.sendRedirect("/serve?blob-key=" +
			// blobKeys.get(0).getKeyString()+"&user="+user);
		}

	}
}