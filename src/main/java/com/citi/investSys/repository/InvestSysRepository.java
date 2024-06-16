package com.citi.investSys.repository;

import com.citi.investSys.model.Investment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestSysRepository extends JpaRepository<Investment, String> {
    List<Investment> findByCustomerID(String customerID);
}
