package com.citi.investSys.response;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> responseBuilder(
            String message,
            HttpStatus httpStatus,
            Object responseObject
            ){
        Map<String,Object> response= new HashMap<>();
        response.put("message", message);
        response.put("httpStatus",httpStatus);
        response.put("data",responseObject);

        return new ResponseEntity<>(response,httpStatus);
    }
}
