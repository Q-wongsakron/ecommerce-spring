package com.example.ecommerce.dto;

import lombok.Data;

@Data
// Use this class to send back a Java Object as JSON
public class PurchaseResponse {

    private final String orderTrackingNumber;

}
