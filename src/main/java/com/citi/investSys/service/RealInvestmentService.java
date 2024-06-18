package com.citi.investSys.service;

import com.citi.investSys.exception.InvestmentNotFoundException;
import com.citi.investSys.model.Investment;
import com.citi.investSys.repository.InvestSysRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RealInvestmentService implements InvestmentService{

    InvestSysRepository investSysRepository;

    public RealInvestmentService(InvestSysRepository investSysRepository) {
        this.investSysRepository = investSysRepository;
    }

    @Override
    public String addInvestment(Investment investment) {
        investSysRepository.save(investment);
        return "Investment Saved";
    }

    @Override
    public String removeInvestment(String investmentID) {
        if(investSysRepository.existsById(investmentID)){
            investSysRepository.deleteById(investmentID);
            return "Investment Removed";
        }
        else{
            throw new InvestmentNotFoundException("Requested Investment does not exist");
        }
    }

    @Override
    public String updateInvestment(Investment investment) {
        investSysRepository.save(investment);
        return "Investment Updated";
    }

    @Override
    public Investment getInvestment(String investmentID) {
        if(investSysRepository.findById(investmentID).isEmpty()){
            throw new InvestmentNotFoundException("Requested Investment does not exist");
        }
        else{
            return investSysRepository.findById(investmentID).get();
        }
    }

    @Override
    public List<Investment> getAllInvestmentsOfCustomers(String customerID) {
        if(investSysRepository.findByCustomerID(customerID).isEmpty()){
            throw new InvestmentNotFoundException("The Customer does not have any Investments");
        }
        else{
            return investSysRepository.findByCustomerID(customerID);
        }
    }

    @Override
    public List<Investment> getAllInvestments() {
        return investSysRepository.findAll();
    }
}
