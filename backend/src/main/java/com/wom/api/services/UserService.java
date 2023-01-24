package com.wom.api.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wom.api.dto.RoleDTO;
import com.wom.api.dto.UserDTO;
import com.wom.api.dto.UserInsertDTO;
import com.wom.api.entities.Role;
import com.wom.api.entities.User;
import com.wom.api.repositories.RoleRepository;
import com.wom.api.repositories.UserRepository;
import com.wom.api.services.exceptions.DatabaseException;
import com.wom.api.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {
		Page<User> page = userRepository.findAll(pageable);
		return page.map(user -> new UserDTO(user));
	}

	@Transactional(readOnly = true)
	public List<UserDTO> findAll( ) {
		List<User> list = userRepository.findAll();
		return list.stream().map(user -> new UserDTO(user)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = userRepository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Id not found! " + id));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDtoEntity(dto, entity);
		entity.setPassword(encoder.encode((dto.getPassword())));
		entity = userRepository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserInsertDTO dto) {

		try {
			User entity = userRepository.getReferenceById(id);
			copyDtoEntity(dto, entity);

			if (!dto.getPassword().equals(entity.getPassword())) {
				entity.setPassword(encoder.encode(dto.getPassword()));
			}

			entity = userRepository.save(entity);
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found: " + id);
		}
	}

	public void delete(Long id) {
		try {
			userRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found: " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Database integrity violation!");
		}
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);
		if (user == null) {
			throw new UsernameNotFoundException("E-mail not found!");
		}
		return user;
	}

	private void copyDtoEntity(UserDTO dto, User entity) {
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		entity.setPhoneNumber(dto.getPhoneNumber());

		entity.getRoles().clear();
		for (RoleDTO roleDto : dto.getRoles()) {
			Role role = roleRepository.getReferenceById(roleDto.getId());
			entity.getRoles().add(role);
		}
	}

}
