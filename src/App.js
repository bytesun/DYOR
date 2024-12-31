import React, { useState } from "react";
import "./App.css";

function App() {
  // Define the factors, weights, and their checklists
  const factors = [
    {
      id: 1,
      name: "Whitepaper & Website",
      weight: 0.1,
      checklist: [
        "Is the whitepaper clear and detailed?",
        "Does the website provide comprehensive information?",
      ],
    },
    {
      id: 2,
      name: "Team & Advisors",
      weight: 0.1,
      checklist: [
        "Are the team members experienced and credible?",
        "Are there reputable advisors?",
      ],
    },
    {
      id: 3,
      name: "Technology",
      weight: 0.2,
      checklist: [
        "Is the blockchain innovative and secure?",
        "Does the project solve a technical challenge?",
      ],
    },
    {
      id: 4,
      name: "Use Case",
      weight: 0.15,
      checklist: [
        "Does the project address a real-world problem?",
        "Is there a clear target market?",
      ],
    },
    {
      id: 5,
      name: "Tokenomics",
      weight: 0.15,
      checklist: [
        "Is the token’s utility well-defined?",
        "Is the token supply and distribution fair?",
      ],
    },
    {
      id: 6,
      name: "Roadmap",
      weight: 0.1,
      checklist: [
        "Are past milestones achieved?",
        "Is the future roadmap realistic?",
      ],
    },
    {
      id: 7,
      name: "Community & Ecosystem",
      weight: 0.1,
      checklist: [
        "Is the community active and engaged?",
        "Are there strong partnerships?",
      ],
    },
    {
      id: 8,
      name: "Market Performance",
      weight: 0.05,
      checklist: [
        "What is the token’s price history?",
        "Is there sufficient liquidity?",
      ],
    },
    {
      id: 9,
      name: "Regulatory Compliance",
      weight: 0.05,
      checklist: [
        "Is the project compliant with regulations?",
        "Are there any legal risks?",
      ],
    },
    {
      id: 10,
      name: "Security & Audits",
      weight: 0.05,
      checklist: [
        "Have the smart contracts been audited?",
        "Is the project secure from hacks?",
      ],
    },
    {
      id: 11,
      name: "Financials & Funding",
      weight: 0.05,
      checklist: [
        "Is the project well-funded?",
        "Is the burn rate sustainable?",
      ],
    },
    {
      id: 12,
      name: "Reputation & Reviews",
      weight: 0.05,
      checklist: [
        "What do experts and media say about the project?",
        "Are there any red flags or controversies?",
      ],
    },
  ];

  // State to store scores and checklist completion
  const [scores, setScores] = useState({});
  const [checklistStatus, setChecklistStatus] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  // Handle checklist completion
  const handleChecklistChange = (factorId, itemIndex, isChecked) => {
    const updatedStatus = { ...checklistStatus };
    if (!updatedStatus[factorId]) updatedStatus[factorId] = [];
    updatedStatus[factorId][itemIndex] = isChecked;
    setChecklistStatus(updatedStatus);
  };

  // Handle score input changes
  const handleScoreChange = (factorId, value) => {
    const newScores = { ...scores, [factorId]: parseFloat(value) || 0 };
    setScores(newScores);
    calculateTotalScore(newScores);
  };

  // Calculate the total weighted score
  const calculateTotalScore = (scores) => {
    let total = 0;
    factors.forEach((factor) => {
      total += (scores[factor.id] || 0) * factor.weight;
    });
    setTotalScore(total.toFixed(2));
  };

  // Check if all checklist items for a factor are completed
  const isChecklistComplete = (factorId) => {
    return checklistStatus[factorId] && checklistStatus[factorId].every((item) => item);
  };

  // Calculate progress
  const completedFactors = factors.filter((factor) => isChecklistComplete(factor.id)).length;
  const totalFactors = factors.length;

  return (
    <div className="App">
      <h1>Crypto Project Evaluator</h1>
      <div className="progress">
        <h3>
          Progress: {completedFactors}/{totalFactors} factors completed
        </h3>
      </div>
      <div className="factors">
        {factors.map((factor) => (
          <div key={factor.id} className="factor">
            <h2>{factor.name} (Weight: {factor.weight * 100}%)</h2>
            <div className="checklist">
              {factor.checklist.map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={checklistStatus[factor.id]?.[index] || false}
                    onChange={(e) =>
                      handleChecklistChange(factor.id, index, e.target.checked)
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
            {isChecklistComplete(factor.id) && (
              <div className="score-input">
                <label>Score (0-10):</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={scores[factor.id] || ""}
                  onChange={(e) => handleScoreChange(factor.id, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="result">
        <h2>Total Score: {totalScore}</h2>
        <p>
          {totalScore >= 8
            ? "This project looks strong! Consider investing."
            : totalScore >= 6
            ? "This project has potential but needs further research."
            : "This project may not be worth investing in."}
        </p>
      </div>
    </div>
  );
}

export default App;