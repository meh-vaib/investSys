package com.citi.investSys.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class InvestmentExceptionHandler {
    @ExceptionHandler(value = {InvestmentNotFoundException.class})
    public ResponseEntity<Object> handleInvestmentNotFoundException(
            InvestmentNotFoundException investmentNotFoundException
    ){
        InvestmentException investmentException = new InvestmentException(
                investmentNotFoundException.getMessage(),
                HttpStatus.NOT_FOUND,
                investmentNotFoundException.getCause()
        );
        return new ResponseEntity<>(investmentException,HttpStatus.NOT_FOUND);
    }
}
