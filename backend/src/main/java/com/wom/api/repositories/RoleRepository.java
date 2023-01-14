package com.wom.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wom.api.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
