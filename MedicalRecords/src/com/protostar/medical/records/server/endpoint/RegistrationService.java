package com.protostar.medical.records.server.endpoint;

import javax.persistence.EntityManager;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.medical.records.server.data.EMF;
import com.protostar.medical.records.server.data.MyBean;
import com.protostar.medical.records.server.data.RegisterUserEntity;
import com.protostar.medical.records.server.data.RegisterUserEntityInfo;

@Api(name = "registrationservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))
public class RegistrationService {
	
	@ApiMethod(name = "saveRegiUser")
	public MyBean saveRegiUser(RegisterUserEntityInfo regiUser)
	 {
		MyBean mybean = new MyBean();
		System.out.println("Came to Server side :" + regiUser.getFirstName());
		EntityManager en=null;
		RegisterUserEntity registerUserEntity = new RegisterUserEntity();
		
		registerUserEntity.setId(regiUser.getId());
		registerUserEntity.setFirstName(regiUser.getFirstName());
		registerUserEntity.setLastName(regiUser.getLastName());
		registerUserEntity.setMobileNumber(regiUser.getMobileNumber());
		registerUserEntity.setEmailID(regiUser.getEmailID());
		
		try 
		{
			en=EMF.get().createEntityManager();
			en.persist(registerUserEntity);
			mybean.setData("Registration is done successfully...");
		}
		finally 
		{
			en.close();
		}
		
		
		return mybean;
	}
	

}
//HttpServletRequest request=null;
/*String scheme = request.getScheme();             
String serverName = request.getServerName();  
int serverPort = request.getServerPort();     
String contextPath = request.getContextPath();
String url = scheme+"://"+serverName+":"+serverPort+contextPath;*/


/*
Properties props = new Properties();
Session session = Session.getDefaultInstance(props, null);

String msgBody = "...";

try {
    Message msg = new MimeMessage(session);
    try {
		msg.setFrom(new InternetAddress("noreply.protostar@gmail.com", "protostar123"));
		msg.addRecipient(Message.RecipientType.TO,new InternetAddress("shaileshmunot1991@gmail.com", "Mr. shailesh"));
	} catch (UnsupportedEncodingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
    msg.setSubject("Your Example.com account has been activated");
    msg.setText(msgBody);
    Transport.send(msg);

} catch (AddressException e) {
	e.printStackTrace();
} catch (MessagingException e) {
	e.printStackTrace();
}*/





/*StringBuffer msg = new StringBuffer();
 msg.append(" <html><head><meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><style type='text/css'></style></head><body><h2>Hello "+registerUserEntity.getFirstName()+" "+registerUserEntity.getLastName()+
 			"</h2> Thank You for Registering with <b> Amclin Life Sciences </b>"+"<br><b>Regards</b><br>Amclin Admin.</dody></html>");
 
 
    SendMail.sendMail(registerUserEntity.getEmailID(),"Amclin Notification",msg);*/
    
 /*   try {
		Smsservice.sms();
	} catch (TwilioRestException e)
    {
	System.out.println(e);
		e.printStackTrace();
	}
    */