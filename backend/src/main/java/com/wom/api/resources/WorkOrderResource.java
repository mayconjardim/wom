package com.wom.api.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wom.api.dto.WorkOrderDTO;
import com.wom.api.services.WorkOrderService;

@RestController
@RequestMapping(value = "/orders")
public class WorkOrderResource {

	@Autowired
	private WorkOrderService orderSevice;
	
	@GetMapping
	public ResponseEntity<Page<WorkOrderDTO>> findAll(Pageable pageable){
			Page<WorkOrderDTO> list = orderSevice.findAllPaged(pageable);  
		return ResponseEntity.ok().body(list); 
	}
	
}
