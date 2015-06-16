/*package com.protostar.medical.records.server.endpoint;

import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;
import com.protostar.medical.records.client.services.LoginService;
import com.protostar.medical.records.shared.AppUser;
import com.protostar.medical.records.shared.EMF;
import com.protostar.medical.records.shared.LoginInfo;
import com.protostar.medical.records.shared.LoginInfo.UserRole;

public class LoginServiceImpl  {

	private static final long serialVersionUID = 3206543364899182353L;
	private static final String[] defaultAdmins = { "ganesh.lawande@gmail.com",
			"ganesh.lawande@protostar.co.in",
			"amol@amclin.com"};
	private static final List<String> defaultAdminList = Arrays.asList(defaultAdmins);
	private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();
	public LoginInfo checkLogin(String requestUri) {
		
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		

		// user.getUserId();
		// user.getAuthDomain();
		LoginInfo loginInfo = new LoginInfo();
		if (user != null) {
			// This means google login/Authentication is successful. Now check
			// Authorization to access this app
			AppUser appUserByEmail = getAppUserByEmail(user.getEmail());
			System.out.println("user.getEmail():" + user.getEmail());
			System.out.println("appUserByEmail:" + appUserByEmail);
			// System.out.println("AppUser:" + appUserByEmail.getId());
			
			if (defaultAdminList.contains(user.getEmail())) {
				System.out.println("The User is a defaul Admin");
				loginInfo.setLoggedIn(true);
				loginInfo.setEmailAddress(user.getEmail());
				loginInfo.setUserRole(UserRole.ADMIN);
				loginInfo.setNickname(user.getNickname());
				loginInfo.setLogoutUrl(userService.createLogoutURL(requestUri));
				// create session and store userid
				HttpServletRequest request = this.getThreadLocalRequest();
				// true will create a new session if it not yet exists
				HttpSession session = request.getSession(true);
				if (session != null)
					session.setAttribute("loginInfo", loginInfo);
			}
			
			if (appUserByEmail != null) {
				loginInfo.setLoggedIn(true);
				loginInfo.setEmailAddress(user.getEmail());
				loginInfo.setUserRole(appUserByEmail.getUserRole());
				loginInfo.setNickname(user.getNickname());
				loginInfo.setLogoutUrl(userService.createLogoutURL(requestUri));
				// create session and store userid
				HttpServletRequest request = this.getThreadLocalRequest();
				// true will create a new session if it not yet exists
				HttpSession session = request.getSession(true);
				if (session != null)
					session.setAttribute("loginInfo", loginInfo);
			} else {
				// Return user to a page asking to contact Admin for access
				System.out.println("AppUser not found");
				loginInfo.setLoggedIn(true);
				loginInfo.setEmailAddress(user.getEmail());
				loginInfo.setLogoutUrl(userService.createLogoutURL(requestUri));

				HttpServletRequest request = this.getThreadLocalRequest();
				// true will create a new session if it not yet exists
				HttpSession session = request.getSession(true);
				if (session != null)
					session.setAttribute("loginInfo", loginInfo);

			}
		} else {
			loginInfo.setLoggedIn(false);
			loginInfo.setLoginUrl(userService.createLoginURL(requestUri));
		}
		return loginInfo;
	}


	public LoginInfo saveNewLogin(LoginInfo newLoginInfo) {

		// Store it in Google datastore
		EntityManager em = null;

		AppUser newUser = LoginInfo.toAppUser(newLoginInfo);
		try {
			em = EMF.get().createEntityManager();
			em.persist(newUser);
		} finally {
			em.close();
		}
		if (newUser.getId() > 0) {
			newLoginInfo.setId(newUser.getId());
			return newLoginInfo;
		}
		return newLoginInfo;
	}

	public AppUser getAppUserByEmail(String emailAddress)
			throws IllegalArgumentException {

		AppUser user = null;
		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			Query q = em
					.createQuery("select u from AppUser u where u.emailAddress = '"
							+ emailAddress + "'");
			List<AppUser> resultList = q.getResultList();
			if (resultList.size() > 0) {
				user = resultList.get(0);
			}

		} finally {
			em.close();
		}
		return user;
	}

	public LoginInfo getLoginUser() {
		HttpServletRequest request = this.getThreadLocalRequest();
		// dont create a new one -> false
		HttpSession session = request.getSession(false);
		System.out.println("session:" + session);
		if (session == null || session.getAttribute("loginInfo") == null) {
			return null;
		}
		// do something with the value
		if (session.getAttribute("loginInfo") == null)
			return null;
		LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
		System.out.println("loginInfo:" + session.getAttribute("loginInfo"));
		return loginInfo;
	}


	public void doLogout() {
		HttpServletRequest request = this.getThreadLocalRequest();
		// dont create a new one -> false
		HttpSession session = request.getSession(false);
		if (session == null)
			return;
		// do some logout stuff ...
		// destroy the session
		session.invalidate();
	}

	public String createUploadUrl(String successPath) {
		String uploadPath = blobstoreService.createUploadUrl(successPath);
		System.out.println("uploadPath:" + uploadPath);
		return uploadPath;
	}
}
*/