package com.wom.api.dto;

import java.util.HashSet;
import java.util.Set;

import com.wom.api.entities.User;

public class UserInsertDTO extends UserDTO {
	private static final long serialVersionUID = 1L;

	private String password;

	private Set<RoleDTO> roles = new HashSet<>();

	public UserInsertDTO() {
		super();
	}

	public UserInsertDTO(User entity) {
		this.setFirstName(entity.getFirstName());
		this.setLastName(entity.getLastName());
		this.setEmail(entity.getEmail());
		this.setPhoneNumber(entity.getPhoneNumber());
		password = entity.getPassword();
		entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public Set<RoleDTO> getRoles() {
		return roles;
	}
}