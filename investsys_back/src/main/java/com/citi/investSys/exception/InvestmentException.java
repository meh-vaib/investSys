package com.citi.investSys.exception;

import org.springframework.http.HttpStatus;

public class InvestmentException {

    private String message;
    private Throwable throwable;
    private HttpStatus httpStatus;

    public InvestmentException(String message, HttpStatus httpStatus, Throwable throwable) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.throwable = throwable;
    }

    public String getMessage() {
        return message;
    }

    public Throwable getThrowable() {
        return throwable;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
