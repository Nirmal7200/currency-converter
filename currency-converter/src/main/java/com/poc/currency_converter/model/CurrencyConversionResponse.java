package com.poc.currency_converter.model;

import lombok.Data;

@Data
public class CurrencyConversionResponse {
    private Meta meta;
    private Response response;

    @Data
    public static class Meta {
        private int code;
        private String disclaimer;
    }

    @Data
    public static class Response {
        private long timestamp;
        private String date;
        private String from;
        private String to;
        private double amount;
        private double value;
    }
}