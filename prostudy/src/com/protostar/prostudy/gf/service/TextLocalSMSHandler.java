package com.protostar.prostudy.gf.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class TextLocalSMSHandler {

	private static final String TEXTLOCAL_API_URL = "http://api.textlocal.in/send/?";
	private static final String SMS_SENDERNAME = "TXTLCL";
	private static final String TEXTLOCAL_API_KEY = "lgwOpe/8kmU-SS8snypaZaYnhY9P9w93iNGSaOXT6I";

	public static String sendSms(String smsMsg, String mobileNumbers) {
		try {
			if (smsMsg == null || smsMsg.isEmpty() || mobileNumbers == null
					|| mobileNumbers.isEmpty()) {
				return null;
			} else {
				// Validate mobile number with country code with 10 digit
				if (mobileNumbers.length() < 10) {
					return null;
				} else {
					// OK, continue;
				}
			}
			// Construct data
			// String user = "username=" + TEXTLOCAL_API_USERNAME;
			String apiKey = "&apiKey=" + TEXTLOCAL_API_KEY;
			// String message = "&message=" + "This is your message";
			String sender = "&sender=" + SMS_SENDERNAME;
			// String numbers = "&numbers=" + "918123456789";
			String numbers = "&numbers=" + mobileNumbers;

			String message = "&message=" + smsMsg;

			// Send data
			HttpURLConnection conn = (HttpURLConnection) new URL(
					TEXTLOCAL_API_URL).openConnection();
			String data = apiKey + numbers + message + sender;
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Length",
					Integer.toString(data.length()));
			conn.getOutputStream().write(data.getBytes("UTF-8"));
			final BufferedReader rd = new BufferedReader(new InputStreamReader(
					conn.getInputStream()));
			final StringBuffer stringBuffer = new StringBuffer();
			String line;
			while ((line = rd.readLine()) != null) {
				stringBuffer.append(line);
			}
			rd.close();
			System.out.println("data:" + data);
			System.out.println("stringBuffer.toString():"
					+ stringBuffer.toString());
			System.out.println("SMS Send Successfully!");

			return stringBuffer.toString();
		} catch (Exception e) {
			System.out.println("Error SMS: " + e);
			return "Error " + e;
		}
	}

}