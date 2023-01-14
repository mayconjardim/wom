package com.wom.api.resources;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.wom.api.dto.WorkOrderDTO;
import com.wom.api.services.WorkOrderService;

@RestController
@RequestMapping(value = "/orders")
public class WorkOrderResource {

	@Autowired
	private WorkOrderService orderSevice;

	@GetMapping
	public ResponseEntity<Page<WorkOrderDTO>> findAll(Pageable pageable) {
		Page<WorkOrderDTO> list = orderSevice.findAllPaged(pageable);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<WorkOrderDTO> findById(@PathVariable Long id) {
		WorkOrderDTO dto = orderSevice.findById(id);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<WorkOrderDTO> insert(@RequestBody WorkOrderDTO dto) {
		dto = orderSevice.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<WorkOrderDTO> update(@PathVariable Long id, @RequestBody WorkOrderDTO dto) {
		dto = orderSevice.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<WorkOrderDTO> delete(@PathVariable Long id) {
		orderSevice.delete(id);
		return ResponseEntity.noContent().build();
	}

}
