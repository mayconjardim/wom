package com.wom.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wom.api.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}