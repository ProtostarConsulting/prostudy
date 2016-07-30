package com.protostar.prostudy.gf.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.logging.Logger;

public class TextLocalSMSHandler {

	private static final Logger logger = Logger
			.getLogger(TextLocalSMSHandler.class.getName());
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
			String apiKey = "&apiKey="
					+ URLEncoder.encode(TEXTLOCAL_API_KEY, "UTF-8");
			// String message = "&message=" + "This is your message";
			String sender = "&sender="
					+ URLEncoder.encode(SMS_SENDERNAME, "UTF-8");
			// String numbers = "&numbers=" + "918123456789";
			String numbers = "&numbers="
					+ URLEncoder.encode(mobileNumbers, "UTF-8");

			String message = "&message=" + URLEncoder.encode(smsMsg, "UTF-8");

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
			logger.info("data:" + data);
			logger.info("stringBuffer.toString():" + stringBuffer.toString());

			return stringBuffer.toString();
		} catch (Exception e) {
			logger.warning("Error SMS: " + e);
			return "Error " + e;
		}
	}

}