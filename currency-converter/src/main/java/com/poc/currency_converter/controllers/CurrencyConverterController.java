package com.poc.currency_converter.controllers;

import com.poc.currency_converter.model.ConvertedAmountResponse;
import com.poc.currency_converter.service.CurrencyConversionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Log4j2
@CrossOrigin
class CurrencyConverterController {
    private final CurrencyConversionService conversionService;

    @GetMapping("/convert")
    public ConvertedAmountResponse convert(@RequestParam(name = "source") String source,
                                           @RequestParam(name = "target") String target,
                                           @RequestParam(name = "amount") int amount) {
        log.info("Received request to convert {} {} to {}", amount, source, target);
        double convertedAmount = conversionService.convertCurrency(source, target, amount);
        log.info("Converted amount: {} {}", convertedAmount, target);
        return new ConvertedAmountResponse(convertedAmount);
    }
}