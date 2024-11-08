document.addEventListener('DOMContentLoaded', () => {
    const sourceCurrency = document.getElementById('sourceCurrency');
    const targetCurrency = document.getElementById('targetCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const result = document.getElementById('result');
    const amountInput = document.getElementById('amount');

    // Full list of currencies
    const currencies = {
        "AFN": "Afghani",
        "ALL": "Lek",
        "DZD": "Algerian Dinar",
        "USD": "US Dollar",
        "EUR": "Euro",
        "AOA": "Kwanza",
        "XCD": "East Caribbean Dollar",
        "ARS": "Argentine Peso",
        "AMD": "Armenian Dram",
        "AWG": "Aruban Florin",
        "AUD": "Australian Dollar",
        "AZN": "Azerbaijanian Manat",
        "BSD": "Bahamian Dollar",
        "BHD": "Bahraini Dinar",
        "BDT": "Taka",
        "BBD": "Barbados Dollar",
        "BYN": "Belarussian Ruble",
        "BZD": "Belize Dollar",
        "XOF": "CFA Franc BCEAO",
        "BMD": "Bermudian Dollar",
        "BTN": "Ngultrum",
        "BOB": "Boliviano",
        "BOV": "Mvdol",
        "BAM": "Convertible Mark",
        "BWP": "Pula",
        "NOK": "Norwegian Krone",
        "BRL": "Brazilian Real",
        "BND": "Brunei Dollar",
        "BGN": "Bulgarian Lev",
        "BIF": "Burundi Franc",
        "CVE": "Cabo Verde Escudo",
        "KHR": "Riel",
        "XAF": "CFA Franc BEAC",
        "CAD": "Canadian Dollar",
        "KYD": "Cayman Islands Dollar",
        "CLF": "Unidad de Fomento",
        "CLP": "Chilean Peso",
        "CNY": "Yuan Renminbi",
        "COP": "Colombian Peso",
        "COU": "Unidad de Valor Real",
        "KMF": "Comoro Franc",
        "CDF": "Congolese Franc",
        "NZD": "New Zealand Dollar",
        "CRC": "Costa Rican Colon",
        "CUP": "Cuban Peso",
        "CUC": "Peso Convertible",
        "ANG": "Netherlands Antillean Guilder",
        "CZK": "Czech Koruna",
        "DKK": "Danish Krone",
        "DJF": "Djibouti Franc",
        "DOP": "Dominican Peso",
        "EGP": "Egyptian Pound",
        "SVC": "El Salvador Colon",
        "ERN": "Nakfa",
        "ETB": "Ethiopian Birr",
        "FKP": "Falkland Islands Pound",
        "FJD": "Fiji Dollar",
        "XPF": "CFP Franc",
        "GMD": "Dalasi",
        "GEL": "Lari",
        "GHS": "Ghana Cedi",
        "GIP": "Gibraltar Pound",
        "GTQ": "Quetzal",
        "GNF": "Guinea Franc",
        "GYD": "Guyana Dollar",
        "HTG": "Gourde",
        "HNL": "Lempira",
        "HKD": "Hong Kong Dollar",
        "HUF": "Forint",
        "ISK": "Iceland Krona",
        "INR": "Indian Rupee",
        "IDR": "Rupiah",
        "XDR": "SDR (Special Drawing Right)",
        "IRR": "Iranian Rial",
        "IQD": "Iraqi Dinar",
        "ILS": "New Israeli Sheqel",
        "JMD": "Jamaican Dollar",
        "JPY": "Yen",
        "JOD": "Jordanian Dinar",
        "KZT": "Tenge",
        "KES": "Kenyan Shilling",
        "KPW": "North Korean Won",
        "KRW": "Won",
        "KWD": "Kuwaiti Dinar",
        "KGS": "Som",
        "LAK": "Kip",
        "LBP": "Lebanese Pound",
        "LSL": "Loti",
        "LRD": "Liberian Dollar",
        "LYD": "Libyan Dinar",
        "CHF": "Swiss Franc",
        "MOP": "Pataca",
        "MGA": "Malagasy Ariary",
        "MWK": "Kwacha",
        "MYR": "Malaysian Ringgit",
        "MVR": "Rufiyaa",
        "MRU": "Ouguiya",
        "MUR": "Mauritius Rupee",
        "MXN": "Mexican Peso",
        "MDL": "Moldovan Leu",
        "MNT": "Tugrik",
        "MAD": "Moroccan Dirham",
        "MZN": "Mozambique Metical",
        "MMK": "Kyat",
        "NAD": "Namibia Dollar",
        "NPR": "Nepalese Rupee",
        "NGN": "Naira",
        "OMR": "Rial Omani",
        "PKR": "Pakistan Rupee",
        "PAB": "Balboa",
        "PGK": "Kina",
        "PYG": "Guarani",
        "PEN": "Nuevo Sol",
        "PHP": "Philippine Peso",
        "PLN": "Zloty",
        "QAR": "Qatari Rial",
        "RON": "Romanian Leu",
        "RUB": "Russian Ruble",
        "RWF": "Rwanda Franc",
        "SHP": "Saint Helena Pound",
        "WST": "Tala",
        "STN": "Dobra",
        "SAR": "Saudi Riyal",
        "RSD": "Serbian Dinar",
        "SCR": "Seychelles Rupee",
        "SLE": "Leone",
        "SGD": "Singapore Dollar",
        "SBD": "Solomon Islands Dollar",
        "SOS": "Somali Shilling",
        "ZAR": "Rand",
        "SSP": "South Sudanese Pound",
        "LKR": "Sri Lanka Rupee",
        "SDG": "Sudanese Pound",
        "SRD": "Surinam Dollar",
        "SZL": "Lilangeni",
        "SEK": "Swedish Krona",
        "CHE": "WIR Euro",
        "CHW": "WIR Franc",
        "SYP": "Syrian Pound",
        "TWD": "New Taiwan Dollar",
        "TJS": "Somoni",
        "TZS": "Tanzanian Shilling",
        "THB": "Baht",
        "TOP": "Pa’anga",
        "TTD": "Trinidad and Tobago Dollar",
        "TND": "Tunisian Dinar",
        "TRY": "Turkish Lira",
        "TMT": "Turkmenistan New Manat",
        "UGX": "Uganda Shilling",
        "UAH": "Hryvnia",
        "AED": "UAE Dirham",
        "GBP": "Pound Sterling",
        "UYU": "Peso Uruguayo",
        "UZS": "Uzbekistan Sum",
        "VUV": "Vatu",
        "VES": "Bolivar",
        "VND": "Dong",
        "YER": "Yemeni Rial",
        "ZMW": "Zambian Kwacha",
        "ZWL": "Zimbabwe Dollar"
    };

    // Sort currencies alphabetically by name
    const sortedCurrencies = Object.entries(currencies).sort((a, b) => a[1].localeCompare(b[1]));

    // Populate currency dropdowns
    sortedCurrencies.forEach(([code, name]) => {
        const option = new Option(name, code);
        sourceCurrency.add(option.cloneNode(true));
        targetCurrency.add(option.cloneNode(true));
    });

    convertBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (!amount) {
            result.textContent = 'Please enter a valid amount';
            return;
        }

        const source = sourceCurrency.value;
        const target = targetCurrency.value;

        fetch(`http://localhost:8080/convert?source=${source}&target=${target}&amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                result.textContent = `Converted Amount: ${data.convertedAmount}`;
            })
            .catch(error => console.error('Error:', error));
    });
});