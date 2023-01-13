package com.wom.api.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wom.api.entities.enums.OrderPriority;
import com.wom.api.entities.enums.OrderStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class WorkOrder implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate = LocalDate.now();

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate expectDate;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate deliveryDate;

	private OrderStatus orderStatus;

	private OrderPriority orderPriority;

	private String generalContractor;

	private String jobSite;

	private String address;

	private String city;

	private String description;

	public WorkOrder() {
	}

	public WorkOrder(Long id, LocalDate startDate, LocalDate expectDate, LocalDate deliveryDate,
			OrderStatus orderStatus, OrderPriority orderPriority, String generalContractor, String jobSite,
			String address, String city, String description) {
		super();
		this.id = id;
		this.startDate = startDate;
		this.expectDate = expectDate;
		this.deliveryDate = deliveryDate;
		this.orderStatus = orderStatus;
		this.orderPriority = orderPriority;
		this.generalContractor = generalContractor;
		this.jobSite = jobSite;
		this.address = address;
		this.city = city;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getExpectDate() {
		return expectDate;
	}

	public void setExpectDate(LocalDate expectDate) {
		this.expectDate = expectDate;
	}

	public LocalDate getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(LocalDate deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	public OrderPriority getOrderPriority() {
		return orderPriority;
	}

	public void setOrderPriority(OrderPriority orderPriority) {
		this.orderPriority = orderPriority;
	}

	public String getGeneralContractor() {
		return generalContractor;
	}

	public void setGeneralContractor(String generalContractor) {
		this.generalContractor = generalContractor;
	}

	public String getJobSite() {
		return jobSite;
	}

	public void setJobSite(String jobSite) {
		this.jobSite = jobSite;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WorkOrder other = (WorkOrder) obj;
		return Objects.equals(id, other.id);
	}

}
