package com.example.myproject;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.User;
import com.protostar.billingnstock.data.EMF;

@SuppressWarnings("serial")
public class TemplateGoogleAppServlet extends HttpServlet {
	
	@Override
	public void init(ServletConfig cgf){
		EMF.get();
	}
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		User u;
		resp.setContentType("text/plain");
		resp.getWriter().println("Hello, world");
	}
}
