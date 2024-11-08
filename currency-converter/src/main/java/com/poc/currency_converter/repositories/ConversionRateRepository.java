package com.poc.currency_converter.repositories;

import com.poc.currency_converter.entities.ConversionRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ConversionRateRepository extends JpaRepository<ConversionRate, Long> {
    Optional<ConversionRate> findBySourceCurrencyAndTargetCurrencyAndTimestampAfter(
            String sourceCurrency, String targetCurrency, LocalDateTime timestamp);
}