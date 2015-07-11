package com.protostar.crm.server.data;

import java.io.Serializable;

public class LoginInfo implements Serializable {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	public enum UserRole {BASIC, ADMIN}
	
	private UserRole userRole = null;
	private boolean loggedIn = false;
	private String loginUrl;
	private String logoutUrl;
	private String emailAddress;
	private String nickname;
	private Long id;
	
	public boolean isLoggedIn() {
		return loggedIn;
	}

	public void setLoggedIn(boolean loggedIn) {
		this.loggedIn = loggedIn;
	}

	public String getLoginUrl() {
		return loginUrl;
	}

	public void setLoginUrl(String loginUrl) {
		this.loginUrl = loginUrl;
	}

	public String getLogoutUrl() {
		return logoutUrl;
	}

	public void setLogoutUrl(String logoutUrl) {
		this.logoutUrl = logoutUrl;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	public static AppUser toAppUser(LoginInfo loginInfo) {
		AppUser appUser = new AppUser(); 
		
//		appUser.setId(loginInfo.getId());
		appUser.setEmailAddress(loginInfo.getEmailAddress());
		appUser.setUserRole(loginInfo.getUserRole());
		
		return appUser;
	}
	
	public static LoginInfo toLoginInfo(AppUser appUser) {
		LoginInfo loginInfo = new LoginInfo(); 
		
		loginInfo.setId(appUser.getId());
		loginInfo.setEmailAddress(appUser.getEmailAddress());
		loginInfo.setUserRole(appUser.getUserRole());
		
		return loginInfo;
	}

	
}
