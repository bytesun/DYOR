import React, { useState, useEffect } from "react";
import { saveProject, loadProjects } from './utils/dbOperations';import "./App.css";
import { ChecklistItem, Factor, ProjectData } from './types';

const App: React.FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [factors, setFactors] = useState<Factor[]>([
    {
      id: 1,
      name: "Whitepaper & Website",
      weight: 0.1,
      checklist: [
        { text: "Is the whitepaper clear and detailed?", checked: false },
        { text: "Does the website provide comprehensive information?", checked: false },
      ],
    },
    {
      id: 2,
      name: "Team & Advisors",
      weight: 0.1,
      checklist: [
        { text: "Are the team members experienced and credible?", checked: false },
        { text: "Are there reputable advisors?", checked: false },
      ],
    },
    {
      id: 3,
      name: "Technology",
      weight: 0.2,
      checklist: [
        { text: "Is the blockchain innovative and secure?", checked: false },
        { text: "Does the project solve a technical challenge?", checked: false },
      ],
    },
    {
      id: 4,
      name: "Use Case",
      weight: 0.15,
      checklist: [
        { text: "Does the project address a real-world problem?", checked: false },
        { text: "Is there a clear target market?", checked: false },
      ],
    },
    {
      id: 5,
      name: "Tokenomics",
      weight: 0.15,
      checklist: [
        { text: "Is the token's utility well-defined?", checked: false },
        { text: "Is the token supply and distribution fair?", checked: false },
      ],
    },
    {
      id: 6,
      name: "Roadmap",
      weight: 0.1,
      checklist: [
        { text: "Are past milestones achieved?", checked: false },
        { text: "Is the future roadmap realistic?", checked: false },
      ],
    },
    {
      id: 7,
      name: "Community & Ecosystem",
      weight: 0.1,
      checklist: [
        { text: "Is the community active and engaged?", checked: false },
        { text: "Are there strong partnerships?", checked: false },
      ],
    },
    {
      id: 8,
      name: "Market Performance",
      weight: 0.05,
      checklist: [
        { text: "What is the token's price history?", checked: false },
        { text: "Is there sufficient liquidity?", checked: false },
      ],
    },
    {
      id: 9,
      name: "Regulatory Compliance",
      weight: 0.05,
      checklist: [
        { text: "Is the project compliant with regulations?", checked: false },
        { text: "Are there any legal risks?", checked: false },
      ],
    },
    {
      id: 10,
      name: "Security & Audits",
      weight: 0.05,
      checklist: [
        { text: "Have the smart contracts been audited?", checked: false },
        { text: "Is the project secure from hacks?", checked: false },
      ],
    },
    {
      id: 11,
      name: "Financials & Funding",
      weight: 0.05,
      checklist: [
        { text: "Is the project well-funded?", checked: false },
        { text: "Is the burn rate sustainable?", checked: false },
      ],
    },
    {
      id: 12,
      name: "Reputation & Reviews",
      weight: 0.05,
      checklist: [
        { text: "What do experts and media say about the project?", checked: false },
        { text: "Are there any red flags or controversies?", checked: false },
      ],
    },
  ]);

  useEffect(() => {
    const loadSavedProjects = async () => {
      const projects = await loadProjects();
      // Handle loaded projects
    };
    loadSavedProjects();
  }, []);

  const handleChecklistChange = (factorId: number, itemIndex: number) => {
    setFactors(prevFactors =>
      prevFactors.map(factor => {
        if (factor.id === factorId) {
          const newChecklist = [...factor.checklist];
          newChecklist[itemIndex] = {
            ...newChecklist[itemIndex],
            checked: !newChecklist[itemIndex].checked
          };
          return { ...factor, checklist: newChecklist };
        }
        return factor;
      })
    );
  };

  const calculateFactorScore = (factor: Factor): number => {
    const checkedCount = factor.checklist.filter(item => item.checked).length;
    return (checkedCount / factor.checklist.length) * factor.weight * 100;
  };

  const calculateTotalScore = (): number => {
    return factors.reduce((total, factor) => total + calculateFactorScore(factor), 0);
  };

  const handleSaveProject = async () => {
    const projectData = {
      name: projectName,
      factors: factors,
      totalScore: calculateTotalScore(),
      lastUpdated: new Date().toISOString()
    };
    
    await saveProject(projectData);
  };

  return (
    <div className="App">
      <h1>Crypto Project Evaluator</h1>
      <div className="project-input">
        <input
          type="text"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="factors-container">
        {factors.map((factor) => (
          <div key={factor.id} className="factor-card">
            <h3>{factor.name}</h3>
            <p>Weight: {factor.weight * 100}%</p>
            <div className="checklist">
              {factor.checklist.map((item, index) => (
                <label key={index} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleChecklistChange(factor.id, index)}
                  />
                  {item.text}
                </label>
              ))}
            </div>
            <div className="factor-score">
              Score: {calculateFactorScore(factor).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
      <div className="total-score">
        Total Score: {calculateTotalScore().toFixed(1)}%
      </div>
      <button 
        className="save-button"
        onClick={handleSaveProject}
      >
        Save Project
      </button>
    </div>
  );
};

export default App;