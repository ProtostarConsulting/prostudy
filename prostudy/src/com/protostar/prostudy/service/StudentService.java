package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.entity.StudentEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;


@Api(name = "studentService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class StudentService
{


	@ApiMethod(name="addStudent")
	public ServerMsg  addStudent(StudentEntity studentEntity)
	{
		System.out.println("StudentEntity:" + studentEntity);
		ServerMsg msgBean=new ServerMsg();
		
		

	EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			em.persist(studentEntity);
			msgBean.setMsg("Student Records Added successfully" + studentEntity.getFirstName());
		} 
		catch (Exception e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
				
		return msgBean;
		
	}//end of addStudent
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getStudents")
	public List<StudentEntity> getStudents()
	{
		System.out.println("In side getAllStudent " );
		List<StudentEntity> studList= new ArrayList<StudentEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select c from StudentEntity c" );
			studList=q.getResultList();
			System.out.println("Got StudentList : " + studList.size() );
			
		} catch (Exception e) 
	
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return studList;
		
	}//end of getAllStudent

}//end of StudentService
