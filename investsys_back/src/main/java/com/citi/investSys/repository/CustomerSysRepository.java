package com.citi.investSys.repository;

import com.citi.investSys.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerSysRepository extends JpaRepository<Customer, String> {

}
