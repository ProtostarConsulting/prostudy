package com.protostar.billingnstock.document;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;




/**
 * Servlet implementation class UploadServlet
 */
public class UploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UploadServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

   /* private boolean isMultipart;
    private String filePath;
    private int maxFileSize = 50 * 1024;
    private int maxMemSize = 4 * 1024;
    private File file ;

    public void init( ){
       // Get the file location where it would be stored.
       filePath = 
              getServletContext().getInitParameter("file-upload"); 
    }
    */
   private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		
		/*String bytestring;
		String contenttype;
		String filefull = null, filefull1 = null;
		String ext;*/
		request.setCharacterEncoding("UTF-8");
/*	FileInputStream fileContent = null;*/
	
	
		System.out.println("Hi I am in servlet");
	      Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
		        List<BlobKey> blobKeys = blobs.get("myFile");
		        
		        String user=request.getParameter("user");
		        System.out.println("user"+user);
		        
		        if (blobKeys == null || blobKeys.isEmpty()) {
		        	response.sendRedirect("/");
		        }else {
		        	response.sendRedirect("/serve?blob-key=" + blobKeys.get(0).getKeyString()+"&user="+user);
		        }
		    
		
	
		
		
		
		
		/*boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		
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
					
					if (!item.isFormField()) {
							String fileName = item.getName();
							byte[] data = item.get(); // converting file content in byte
							bytestring = new String(data); // converting byte in string
							contenttype = item.getContentType(); // Getting the content type of the file
							ext = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length()); // Getting file extension
							filefull = fileName.substring(fileName.lastIndexOf('\\') + 1,fileName.length()); // Getting file name
							if (contenttype.equals("application/pdf") && ext.equals("pdf")&& bytestring.indexOf("%PDF") == 0) {

								String root = getServletContext().getRealPath("/WebContent");
								// File path = new File(root + "/uploads");
								File path = new File(root + "/pdf");
								if (!path.exists()) {
									boolean status = path.mkdirs();
								}

								File uploadedFile = new File(path + "/" + fileName);
								System.out.println(uploadedFile.getAbsolutePath());
								item.write(uploadedFile);

								fileContent = new FileInputStream(uploadedFile.getAbsolutePath());
							} else {
							
								System.out.println("not pdf");
								
							} 
					}
				}
				
			}catch(Exception e){
				System.out.println(e);
			}
		}*/
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		    /*    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
		        List<BlobKey> blobKeys = blobs.get("myFile");
		        if (blobKeys == null || blobKeys.isEmpty()) {
		        	response.sendRedirect("/");
		        } else {
		        	response.sendRedirect("/serve?blob-key=" + blobKeys.get(0).getKeyString());
		        }
		    */
		
		
		/*
		
		 // Check that we have a file upload request
	      isMultipart = ServletFileUpload.isMultipartContent(request);
	      response.setContentType("text/html");
	      java.io.PrintWriter out = response.getWriter( );
	      if( !isMultipart ){
	         out.println("<html>");
	         out.println("<head>");
	         out.println("<title>Servlet upload</title>");  
	         out.println("</head>");
	         out.println("<body>");
	         out.println("<p>No file uploaded</p>"); 
	         out.println("</body>");
	         out.println("</html>");
	         return;
	      }
	      DiskFileItemFactory factory = new DiskFileItemFactory();
	      // maximum size that will be stored in memory
	      factory.setSizeThreshold(maxMemSize);
	      // Location to save data that is larger than maxMemSize.
	      factory.setRepository(new File("c:\\temp"));

	      // Create a new file upload handler
	      ServletFileUpload upload = new ServletFileUpload(factory);
	      // maximum file size to be uploaded.
	      upload.setSizeMax( maxFileSize );

	      try{ 
	      // Parse the request to get file items.
	      List fileItems = (List) upload.parseRequest(request);
		
	      // Process the uploaded file items
	      Iterator i = ((java.util.List<FileItem>) fileItems).iterator();

	      out.println("<html>");
	      out.println("<head>");
	      out.println("<title>Servlet upload</title>");  
	      out.println("</head>");
	      out.println("<body>");
	      while ( i.hasNext () ) 
	      {
	         FileItem fi = (FileItem)i.next();
	         if ( !fi.isFormField () )	
	         {
	            // Get the uploaded file parameters
	            String fieldName = fi.getFieldName();
	            String fileName = fi.getName();
	            String contentType = fi.getContentType();
	            boolean isInMemory = fi.isInMemory();
	            long sizeInBytes = fi.getSize();
	            // Write the file
	            if( fileName.lastIndexOf("\\") >= 0 ){
	               file = new File( filePath + 
	               fileName.substring( fileName.lastIndexOf("\\"))) ;
	            }else{
	               file = new File( filePath + 
	               fileName.substring(fileName.lastIndexOf("\\")+1)) ;
	            }
	            fi.write( file ) ;
	            out.println("Uploaded Filename: " + fileName + "<br>");
	         }
	      }
	      out.println("</body>");
	      out.println("</html>");
	   }catch(Exception ex) {
	       System.out.println(ex);
	   }
	   }
	   public void doGet(HttpServletRequest request, 
	                       HttpServletResponse response)
	        throws ServletException, java.io.IOException {
	        
	        throw new ServletException("GET method used with " +
	                getClass( ).getName( )+": POST method required.");
	   
	}*/
	}
}
