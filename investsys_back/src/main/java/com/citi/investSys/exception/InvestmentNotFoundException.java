package com.citi.investSys.exception;

public class InvestmentNotFoundException extends RuntimeException{
    public InvestmentNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvestmentNotFoundException(String message) {
        super(message);
    }
}
