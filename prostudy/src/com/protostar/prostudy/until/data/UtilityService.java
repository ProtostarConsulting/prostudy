package com.protostar.prostudy.until.data;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.Calendar;
import java.util.List;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.LoadResult;
import com.googlecode.objectify.Work;

public class UtilityService {

	public static String getNextPRN(String role) {
		Calendar rightNow = Calendar.getInstance();

		if (role == null || role.isEmpty()) {
			throw new RuntimeException("Role must not be null or empty");
		}

		int cy = rightNow.get(Calendar.YEAR);
		return role.toUpperCase().charAt(0) + "-" + cy + "-"
				+ String.format("%05d", getCurrentYearNextCounter(cy));
	}

	private static Long getCurrentYearNextCounter(final long cy) {

		final Key<YearCounterEntity> eKey;
		
		List<YearCounterEntity> list = ofy().load()
				.type(YearCounterEntity.class).filter("year", cy)
				.list();
		
		
		if (list == null || list.isEmpty()) {
			YearCounterEntity yc = new YearCounterEntity();
			yc.setYear(cy);
			yc.setCurrentCounter(1L);
			eKey = ofy().save().entity(yc).now();
		}else{
			YearCounterEntity yc = list.get(0);
			eKey = Key.create(yc);			
		}
		
		// If you don't need to return a value, you can use VoidWork
		YearCounterEntity yc = ofy().transact(new Work<YearCounterEntity>() {
			public YearCounterEntity run() {
				YearCounterEntity yc = ofy().load().key(eKey).now();
				yc.setCurrentCounter(yc.getCurrentCounter() + 1);
				Key<YearCounterEntity> now = ofy().save().entity(yc).now();
				return yc;
			}
		});

		return yc.getCurrentCounter();

	}
}
