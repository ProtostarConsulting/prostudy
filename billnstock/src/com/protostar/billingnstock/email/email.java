package com.protostar.billingnstock.email;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tools.ant.types.resources.comparators.FileSystem;

import com.google.appengine.labs.repackaged.com.google.common.io.Files;

/**
 * Servlet implementation class email
 */

public class email extends HttpServlet {
	private static final long serialVersionUID = 1L;
  
    public email() {
        super();
        // TODO Auto-generated constructor stub
    }

		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	
			 response.setContentType("text/html;charset=UTF-8");

			   PrintWriter out = response.getWriter();
			   
			   
			   
			   String host = "mail.javatpoint.com";//change accordingly 
				String mailStoreType = "pop3";    
				String username= "pushpak6191@gmail.com";//"sonoojaiswal@javatpoint.com";  
				String password= "xxxxx";//change accordingly    
				eeee.receiveEmail(host, mailStoreType, username, password);   
				
				
				
			   
			 /*  
			   Properties props = new Properties();
			    Session session = Session.getDefaultInstance(props, null);

			    MimeMessage email = new MimeMessage(session);
			    InternetAddress tAddress;
				try {
					tAddress = new InternetAddress("pushpak6191@gmail.com");
				
			    InternetAddress fAddress = new InternetAddress("pushpak.rhtdm@gmail.com"); //from

			    email.setFrom(fAddress);
			    email.addRecipient(javax.mail.Message.RecipientType.TO, tAddress);
			    email.setSubject("test mail send");//subject 

			    MimeBodyPart mimeBodyPart = new MimeBodyPart();
			    mimeBodyPart.setContent("hi push", "text/plain");//body text 
			    mimeBodyPart.setHeader("Content-Type", "text/plain; charset=\"UTF-8\"");

			    Multipart multipart = new MimeMultipart();
			    multipart.addBodyPart(mimeBodyPart);

			    mimeBodyPart = new MimeBodyPart();
			    DataSource source = new FileDataSource("inbox" + "filename");

			    mimeBodyPart.setDataHandler(new DataHandler(source));
			    mimeBodyPart.setFileName("filename");
			    //String contentType = Files.probeContentType(FileSystem
			   ///     .getPath("inbox", "filename"));
			  //  mimeBodyPart.setHeader("Content-Type", contentType + "; name=\"" + "filename" + "\"");
			    mimeBodyPart.setHeader("Content-Transfer-Encoding", "base64");

			    multipart.addBodyPart(mimeBodyPart);

			    email.setContent(multipart);

			  //  return email;

				} catch (MessagingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}//to
			   */
			   
			   
			   
			   
			   
			   
			   
			   
			   
	
		/*System.out.println("HI I AM IN SERVLET");
		 try {
			 String to = request.getParameter("to");
		        String subject = request.getParameter("subject");
		        String message =  request.getParameter("message");
		        String user = request.getParameter("user");
		        String pass = request.getParameter("pass");
		        SendMail.send(to,subject, message, user, pass);
		        out.println("Mail send successfully");
		
		System.out.println("subject="+subject+"message="+message+"pass="+pass);
		 }catch(Exception e){
			 System.out.println(e);
		 }*/
			   
			   
	/*		   
			   Properties props = new Properties();
			   Session session = Session.getDefaultInstance(props, null);

			   String msgBody = "hoooo push";

			   try {
			       Message msg = new MimeMessage(session);
			       msg.setFrom(new InternetAddress("admin@example.com", "Example.com Admin"));
			       msg.addRecipient(Message.RecipientType.TO,new InternetAddress("user@example.com", "pushpak6191@gmail.com"));
			       msg.setSubject("Your Example.com account has been activated");
			       msg.setText(msgBody);
			       Transport.send(msg);

			   } catch (AddressException e) {
			       // ...
			   } catch (MessagingException e) {
			       // ...
			   }
		
		
		*/
			   
			   
		}

			
}
