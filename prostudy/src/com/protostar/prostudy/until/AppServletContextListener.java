package com.protostar.prostudy.until;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.googlecode.objectify.ObjectifyService;
import com.protostar.prostudy.entity.AdminEntity;
import com.protostar.prostudy.entity.AttendanceEntity;
import com.protostar.prostudy.entity.BookEntity;
import com.protostar.prostudy.entity.Car;
import com.protostar.prostudy.entity.CarAddress;
import com.protostar.prostudy.entity.CarOwner;
import com.protostar.prostudy.entity.ChapterEntity;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.entity.PracticeExamEntity;
import com.protostar.prostudy.entity.PracticeExamResultEntity;
import com.protostar.prostudy.entity.QuestionEntity;
import com.protostar.prostudy.entity.StudentEntity;
import com.protostar.prostudy.entity.SyllabusEntity;
import com.protostar.prostudy.entity.TeacherEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.entity.userAnsEntity;
import com.protostar.prostudy.until.data.YearCounterEntity;

public class AppServletContextListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// Notification that the servlet context is about to be shut down.
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		System.out.println("###Inside AppServletContextListener###");

		// register all your entities here
		ObjectifyService.register(Car.class);
		  ObjectifyService.register(CarAddress.class);
		  ObjectifyService.register(CarOwner.class);  
		  ObjectifyService.register(StudentEntity.class);  
		  ObjectifyService.register(QuestionEntity.class);
		  ObjectifyService.register(PracticeExamEntity.class);
		  ObjectifyService.register(BookEntity.class);
		  ObjectifyService.register(ChapterEntity.class);
		  
		  ObjectifyService.register(UserEntity.class);
		  ObjectifyService.register(userAnsEntity.class);
		  ObjectifyService.register(InstituteEntity.class);
		  ObjectifyService.register(PracticeExamResultEntity.class);
		  ObjectifyService.register(AdminEntity.class);
		  ObjectifyService.register(TeacherEntity.class);
		  ObjectifyService.register(AttendanceEntity.class);
		  ObjectifyService.register(SyllabusEntity.class);
		  ObjectifyService.register(YearCounterEntity.class);

		


	}

}