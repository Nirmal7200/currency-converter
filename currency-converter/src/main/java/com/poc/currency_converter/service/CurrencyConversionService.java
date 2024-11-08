package com.poc.currency_converter.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poc.currency_converter.entities.ConversionRate;
import com.poc.currency_converter.model.CurrencyConversionResponse;
import com.poc.currency_converter.repositories.ConversionRateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class CurrencyConversionService {
    private final ConversionRateRepository conversionRateRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${currency.api.url}")
    private String currencyApiBaseUrl;

    @Value("${currency.api.base-conversion-amount}")
    private int currencyApiBaseConversionAmount;

    @Value("${api.key}")
    private String apiKey;

    public double convertCurrency(String source, String target, int amount) {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        Optional<ConversionRate> rateOpt = conversionRateRepository.findBySourceCurrencyAndTargetCurrencyAndTimestampAfter(
                source, target, oneHourAgo);

        double rate;
        if (rateOpt.isPresent()) {
            rate = rateOpt.get().getRate();
        } else {
            rate = getCurrencyExchangeRate(source, target);
            ConversionRate newRate = new ConversionRate();
            newRate.setSourceCurrency(source);
            newRate.setTargetCurrency(target);
            newRate.setRate(rate);
            newRate.setTimestamp(LocalDateTime.now());
            conversionRateRepository.save(newRate);
        }
        return rate * amount;
    }

    public double getCurrencyExchangeRate(String baseCurrency, String targetCurrencySymbol) {
        double exchangeRate = 0.0;
        String url = currencyApiBaseUrl + "/convert";

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", apiKey)
                .queryParam("from", baseCurrency)
                .queryParam("to", targetCurrencySymbol)
                .queryParam("amount", currencyApiBaseConversionAmount);

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(uriBuilder.toUriString(), String.class);

        if (responseEntity.getStatusCode().is2xxSuccessful() && responseEntity.getBody() != null) {
            try {
                CurrencyConversionResponse currencyResponse = objectMapper.readValue(responseEntity.getBody(), CurrencyConversionResponse.class);
                exchangeRate = currencyResponse.getResponse().getValue();

                log.info("Exchange rate for {}: {}", targetCurrencySymbol, exchangeRate);
            } catch (JsonProcessingException e) {
                log.error("Error occurred while parsing the response", e);
            } catch (HttpClientErrorException e) {
                log.error("HTTP error occurred", e);
            }
        } else {
            log.error("Request failed with status code: {}", responseEntity.getStatusCode());
        }

        return exchangeRate;
    }
}