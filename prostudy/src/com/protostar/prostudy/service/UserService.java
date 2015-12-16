package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.entity.ChapterEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;

@Api(name = "userService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class UserService {

	@ApiMethod(name = "addUser")
	public ServerMsg addUser(UserEntity userEntity) {
		System.out.println("chapterEntity:" + userEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			em.persist(userEntity);
			msgBean.setMsg("User Records Added successfully" + " "
					+ userEntity.getFirstName());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of addUser

	@SuppressWarnings("unchecked")
	@ApiMethod(name = "getAllUser")
	public List<UserEntity> getAllUser() {
		System.out.println("In side getAllUser ");
		List<UserEntity> userList = new ArrayList<UserEntity>();
		EntityManager em = null;
		try {

			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select c from UserEntity c");
			userList = q.getResultList();
			System.out.println("Got AllUser: " + userList.size());

		} catch (Exception e)

		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return userList;

	}// end of getAllUser

	@ApiMethod(name = "updateUser")
	public ServerMsg updateUser(UserEntity userEntity)
	{
		
		System.out.println("In side updateUser ");
		System.out.println("userEntity:" + userEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			
			UserEntity userEntity2 = new UserEntity();
			
			userEntity2.setFirstName(userEntity.getFirstName());
			userEntity2.setLastName(userEntity.getLastName());
			userEntity2.setUserName(userEntity.getUserName());
			userEntity2.setEmail_id(userEntity.getEmail_id());
			userEntity2.setPwd(userEntity.getPwd());
			userEntity2.setRole(userEntity.getRole());
			userEntity2.setContact(userEntity.getContact());
			userEntity2.setGender(userEntity.getGender());
			
			em = EMF.get().createEntityManager();
			em.persist(userEntity2);
			msgBean.setMsg("User Records Updated successfully" + " "
					+ userEntity2.getUserName());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of updateUser

}// end of UserService
