/**
 * Simulation Configuration for Dojo
 * Defines roles, metrics, initial states, and approach effects.
 * This is the "Physics Engine" of the simulation.
 */

const roleConfigs = {
  Developer: {
    initialState: { focus: 70, stress: 30, codeQuality: 60 },
    metrics: ['focus', 'stress', 'codeQuality'],
    metricPolarity: { focus: 'high', stress: 'low', codeQuality: 'high' },
    skills: {
      Relationship: "Collaboration Under Pressure",
      Results: "Task Ownership",
      Boundary: "Code Quality Discipline"
    },
    approachEffects: {
      Relationship: { focus: -5, stress: -10, codeQuality: +5 }, // Focus on people/documentation
      Results: { focus: +10, stress: +10, codeQuality: -5 },      // Focus on shipping, stress up
      Boundary: { focus: +5, stress: +5, codeQuality: +10 }      // Focus on standards
    },
    scenarios: [
      { stakeholder: 'Senior Architect', description: 'The Architect wants you to rewrite your entire module to follow a new pattern they just found.' },
      { stakeholder: 'Frantic PM', description: 'The Project Manager wants to add three "small" features to the current sprint without moving the deadline.' },
      { stakeholder: 'Junior Developer', description: 'A junior teammate has accidentally deleted a production database table and is panicking.' }
    ]
  },
  Manager: {
    initialState: { morale: 60, risk: 40, trust: 50 },
    metrics: ['morale', 'risk', 'trust'],
    metricPolarity: { morale: 'high', risk: 'low', trust: 'high' },
    skills: {
      Relationship: "Team Stability Management",
      Results: "Delivery Control",
      Boundary: "Conflict Containment"
    },
    approachEffects: {
      Relationship: { morale: +10, risk: +5, trust: +5 },
      Results: { morale: -10, risk: -10, trust: +5 },
      Boundary: { morale: -5, risk: -5, trust: -5 }
    },
    scenarios: [
      { stakeholder: 'Angry Client', description: 'A major client is furious about a missed deadline and threatens to cancel the contract.' },
      { stakeholder: 'Underperforming Team Member', description: 'A team member consistently misses deadlines and seems disengaged.' },
      { stakeholder: 'Executive in Budget Crisis', description: 'The CFO demands a 30% budget cut to your department immediately.' }
    ]
  },
  HR: {
    initialState: { satisfaction: 60, complianceRisk: 30, retention: 70 },
    metrics: ['satisfaction', 'complianceRisk', 'retention'],
    metricPolarity: { satisfaction: 'high', complianceRisk: 'low', retention: 'high' },
    skills: {
      Relationship: "Employee Sensitivity Handling",
      Results: "Retention Strategy Awareness",
      Boundary: "Policy Enforcement Strength"
    },
    approachEffects: {
      Relationship: { satisfaction: +10, complianceRisk: +5, retention: +5 },
      Results: { satisfaction: -5, complianceRisk: 0, retention: +10 },
      Boundary: { satisfaction: -10, complianceRisk: -10, retention: -5 }
    },
    scenarios: [
      { stakeholder: 'Harassment Complaint', description: 'An employee reports feeling harassed by their manager.' },
      { stakeholder: 'Engineering Manager', description: 'A manager reports that their best engineer is leaving for a 40% raise. You need to handle the exit or counter-offer conversation with the manager.' },
      { stakeholder: 'Legal Counsel', description: 'The company is facing a potential labor lawsuit due to recent overtime policies.' }
    ]
  },
  Executive: {
    initialState: { revenueHealth: 70, brandTrust: 60, strategicRisk: 40 },
    metrics: ['revenueHealth', 'brandTrust', 'strategicRisk'],
    metricPolarity: { revenueHealth: 'high', brandTrust: 'high', strategicRisk: 'low' },
    skills: {
      Relationship: "Organizational Alignment Control",
      Results: "Financial Pressure Handling",
      Boundary: "Strategic Risk Navigation"
    },
    approachEffects: {
      Relationship: { revenueHealth: -5, brandTrust: +10, strategicRisk: -5 },
      Results: { revenueHealth: +10, brandTrust: -5, strategicRisk: +10 },
      Boundary: { revenueHealth: 0, brandTrust: -5, strategicRisk: -10 }
    },
    scenarios: [
      { stakeholder: 'Board Member', description: 'A board member publicly challenges your Q3 strategy in a high-stakes meeting.' },
      { stakeholder: 'Major Competitor', description: 'Your biggest rival just launched a feature that makes your flagship product look obsolete.' },
      { stakeholder: 'Union Representative', description: 'The employee union is threatening a strike during your most critical sales quarter.' }
    ]
  }
};

module.exports = { roleConfigs };
