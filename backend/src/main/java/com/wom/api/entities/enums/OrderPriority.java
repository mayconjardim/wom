package com.wom.api.entities.enums;

public enum OrderPriority {
	
	LOW(0), MEDIUM(1), HIGH(2);

	private int code;

	private OrderPriority(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static OrderPriority valueOf(int code) {
		for (OrderPriority value : OrderPriority.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Invalid Order Priority code");
	}

}
