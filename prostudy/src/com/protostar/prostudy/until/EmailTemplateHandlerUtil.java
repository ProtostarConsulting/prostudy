package com.protostar.prostudy.until;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import com.protostar.prostudy.entity.UserEntity;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import freemarker.template.TemplateNotFoundException;

public class EmailTemplateHandlerUtil {

	static Configuration cfg = null;

	public Configuration getConfiguration() {
		if (cfg != null) {
			return cfg;
		}
		/*
		 * ----------------------------------------------------------------------
		 * --
		 */
		/* You should do this ONLY ONCE in the whole application life-cycle: */

		/* Create and adjust the configuration singleton */
		Configuration cfg = new Configuration(Configuration.VERSION_2_3_22);

		// cfg.setDirectoryForTemplateLoading(new
		// File("/WEB-INF/email_templates"));
		cfg.setClassForTemplateLoading(this.getClass(), "/");

		cfg.setDefaultEncoding("UTF-8");
		cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
		cfg.setLogTemplateExceptions(false);

		/*
		 * ----------------------------------------------------------------------
		 * --
		 */
		/*
		 * You usually do these for MULTIPLE TIMES in the application
		 * life-cycle:
		 */

		return cfg;

	}

	public String createNewUserHtmlTemplate(UserEntity user) {
		try {
			/* Create a data-model */
			Map root = new HashMap();
			root.put("firstName", user.getFirstName());
			root.put("siteUrl", "www.prostudy.in");

			root.put("user", user);

			/* Get the template (uses cache internally) */
			Template temp = getConfiguration().getTemplate(
					"email_templates/new_user_registration.ftlh");

			/* Merge data-model with template */
			Writer out = new PrintWriter(new ByteArrayOutputStream(500));
			temp.process(root, out);
			return out.toString();
			// Note: Depending on what `out` is, you may need to call
			// `out.close()`.
			// This is usually the case for file output, but not for servlet
			// output.
		} catch (TemplateNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MalformedTemplateNameException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (TemplateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "";
	}
}
