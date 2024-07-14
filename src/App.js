// src/App.js
import React, { useState } from 'react';

function App() {
    const [formData, setFormData] = useState({
        newEMIWithIDFCOnProposedVehicle: 15000,
        otherFixedEMIExcCurrentProposedCarLoanEMI: 20000,
        salaryOrIncome: 500000,
        currentYear: 2024,
        selectedEmploymentType: '',
        selectedModelYear: 2005,
        selectedLoanTenure: 1,
        selectOwner: 1,
        finalTiercom: '',
        currentloanTenure: 9,
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const assetModelYears = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const requiredLoanTenure = [1, 2, 3, 4, 5];
    const owners = [1, 2, 3, 4, 5];
    const finalTiers = ["Plat", "Gold", "Silver", "Bronz Plus", "Bronz S"];
    // const currentLoanTenures = [9, 10, 11, 12];
    const currentLoanTenures = ["Loan fee" ,"< 9 month ","9 ,10 ,11 month"] 


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8080/api/calculator/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setResult(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Employment Type:
                    <select name="selectedEmploymentType" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Salaried">Salaried</option>
                        <option value="Self Employed">Self Employed</option>
                    </select>
                </label>
                <br />
                <label>
                    Asset Model Year:
                    <select name="selectedModelYear" onChange={handleChange}>
                        {assetModelYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Loan Tenure (years):
                    <select name="selectedLoanTenure" onChange={handleChange}>
                        {requiredLoanTenure.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Owner:
                    <select name="selectOwner" onChange={handleChange}>
                        {owners.map(owner => (
                            <option key={owner} value={owner}>{owner}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Final Tier:
                    <select name="finalTiercom" onChange={handleChange}>
                        {finalTiers.map(tier => (
                            <option key={tier} value={tier}>{tier}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Current Loan Tenure:
                    <select name="currentloanTenure" onChange={handleChange}>
                        {currentLoanTenures.map(tenure => (
                            <option key={tenure} value={tenure}>{tenure}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="submit">Calculate</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <h3>Calculation Result:</h3>
                    <p>Fixed EMI Monthly Inc New EMI: {result.fixedEMIMonthlyIncNewEMI}</p>
                    <p>FOIR: {result.foirPercent}%</p>
                    <p>Asset Age EOT: {result.assetAgeEot}</p>
                    <p>Owner Multiplier: {result.ownerMultiplier}%</p>
                    <p>Loan Tenure Value: {result.loanTenureValue}</p>
                    <p>Ownership :{result.ownership}%</p>
                </div>
            )}
        </div>
    );
}


export default App;
