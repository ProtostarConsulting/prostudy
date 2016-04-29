package com.protostar.billingnstock.setup.services;

import java.io.IOException;
import java.nio.ByteBuffer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.appengine.labs.repackaged.com.google.common.io.ByteStreams;
import com.google.appengine.tools.cloudstorage.GcsFileOptions;
import com.google.appengine.tools.cloudstorage.GcsFilename;
import com.google.appengine.tools.cloudstorage.GcsOutputChannel;
import com.google.appengine.tools.cloudstorage.GcsService;
import com.google.appengine.tools.cloudstorage.GcsServiceFactory;
import com.itextpdf.text.pdf.codec.Base64.InputStream;

public class uplode extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public uplode() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hi i m in uplode");
		 //Read the file contents from the input stream
        GcsService gcsService = GcsServiceFactory.createGcsService();

        
		GcsFilename filename = new GcsFilename("xyz", "myFile");          

        GcsFileOptions options = new GcsFileOptions.Builder()
                .mimeType("image/jpg")
                .acl("public-read")
               // .addUserMetadata("myfield1", "my field value")
                .build();

        		
          GcsOutputChannel writeChannel = gcsService.createOrReplace(filename, options);

        ServletFileUpload upload = new ServletFileUpload();

        response.setContentType("text/plain");             

        try {
            FileItemIterator iterator = upload.getItemIterator(request);

                while (iterator.hasNext()) {
                    FileItemStream item = iterator.next();
                    InputStream stream = (InputStream) item.openStream();

                    if (item.isFormField()) {
                     // log.warning("Champs texte avec id: " + item.getFieldName()+", et nom: "+Streams.asString(stream));
                    } else {
                      //log.warning("Nous avons un fichier à uploader : " + item.getFieldName() +
                        //          ", appelé = " + item.getName());

                      // You now have the filename (item.getName() and the
                      // contents (which you can read from stream). Here we just
                      // print them back out to the servlet output stream, but you
                      // will probably want to do something more interesting (for
                      // example, wrap them in a Blob and commit them to the
                      // datastore).
                      // Open a channel to write to it


                      byte[] bytes = ByteStreams.toByteArray(stream);

                      try {
                            //writeChannel.write(ByteBuffer.wrap(bytes));
                    	  //writeChannel.write(java.nio.ByteBuffer.wrap(bytes));
                    	  writeChannel.write(ByteBuffer.wrap(bytes));
                      } finally {
                            writeChannel.close();
                            stream.close();
                      }        
                    }        
              }
            } catch (FileUploadException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }



     }
}
