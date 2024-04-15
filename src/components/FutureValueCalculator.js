import React, { useState } from "react";
import { NumberField } from "../ReusableComponents/NumberField";
import { SelectField } from "../ReusableComponents/SelectField";

export const FutureValueCalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [compoundingPeriod, setCompoundingPeriod] = useState(1);
  const [timePeriod, setTimePeriod] = useState(0);
  const [additionalContributions, setAdditionalContributions] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const calculateFutureValue = () => {

    if (interestRate < 0 || timePeriod < 0) {
      setErrorMessage("Annual interest rate and time period cannot be negative");
      return;
    } else {
      setErrorMessage('');
    }
    const interestRateDecimal = interestRate / 100;
    let futureValue = principal * Math.pow(1 + interestRateDecimal / compoundingPeriod, compoundingPeriod * timePeriod);

    futureValue += additionalContributions * ((Math.pow(1 + interestRateDecimal / compoundingPeriod, compoundingPeriod * timePeriod) - 1) / (interestRateDecimal / compoundingPeriod));
    
    futureValue /= Math.pow(1 + inflationRate / 100, timePeriod);

    setFutureValue(futureValue.toFixed(2));
  };

  const selectFieldOptions = [
    { label: "Annualy", value: 1 },
    { label: "Semi Annualy", value: 2 },
    { label: "Quarterly", value: 4 },
    { label: "Monthly", value: 12 }
  ]

  return (
    <div>
      <h1>Future Interest Calculator</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <NumberField label="Principal Amount (Ksh):" value={principal} onChange={(e) => setPrincipal(parseFloat(e.target.value))} />
      </div>
      <div>
        <NumberField label="Annual interest Rate" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
      </div>
      <div>
        <SelectField 
          label="Compounding Period"
          value={compoundingPeriod}
          onChange={(e) => setCompoundingPeriod(parseInt(e.target.value))}
          options={ [...selectFieldOptions] }
        />
      </div>
      <div>
        <NumberField label="Time Period (Years): " value={timePeriod} onChange={(e) => setTimePeriod(parseInt(e.target.value))} />
      </div>
      <div>
        <NumberField label="Additional Contributions (per period):" value={additionalContributions} onChange={(e) => setAdditionalContributions(parseFloat(e.target.value))} />
      </div>
      <div>
        <NumberField label="Inflation Rate (%):" value={inflationRate} onChange={(e) => setInflationRate(parseFloat(e.target.value))} />
      </div>
      <button onClick={calculateFutureValue}>Calculate</button>
      <div>
        <h2>Future Value: {futureValue} Ksh</h2>
      </div>
    </div>
  )
}