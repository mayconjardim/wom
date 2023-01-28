package com.wom.api.dto;

import com.wom.api.entities.User;

public class UserInsertDTO extends UserDTO {
	private static final long serialVersionUID = 1L;
	
	private String password;
	
	public UserInsertDTO() {
	super();	
	}

	public UserInsertDTO(User entity) {
		password = entity.getPassword();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}