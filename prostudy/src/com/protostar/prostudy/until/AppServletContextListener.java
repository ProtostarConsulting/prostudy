package com.protostar.prostudy.until; 

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.googlecode.objectify.ObjectifyService;
import com.protostar.prostudy.entity.Car;

public class AppServletContextListener  implements ServletContextListener {

	  @Override
	  public void contextDestroyed(ServletContextEvent arg0) {
	    //Notification that the servlet context is about to be shut down.   
	  }

	  @Override
	  public void contextInitialized(ServletContextEvent arg0) {
		  System.out.println("###Inside AppServletContextListener###");
		  //register all your entities here
		  ObjectifyService.register(Car.class);
	       // ObjectifyService.register(Motorcycle.class);
	  }

	}