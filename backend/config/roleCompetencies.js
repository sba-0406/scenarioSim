/**
 * Role-Specific Competency Definitions
 * Each role has 6 unique competencies that are evaluated during the simulation
 */

const ROLE_COMPETENCIES = {
    Manager: [
        'Empathy',
        'Delegation',
        'Conflict Resolution',
        'Strategic Thinking',
        'Decision Making',
        'Team Motivation'
    ],
    Developer: [
        'Technical Communication',
        'Problem Solving',
        'Collaboration',
        'Time Management',
        'Professionalism',
        'Learning Agility'
    ],
    HR: [
        'Empathy',
        'Active Listening',
        'Conflict Mediation',
        'Policy Knowledge',
        'Discretion',
        'Communication Clarity'
    ],
    Executive: [
        'Strategic Vision',
        'Stakeholder Management',
        'Decision Making Under Pressure',
        'Negotiation',
        'Change Management',
        'Professionalism'
    ]
};

// Expected competency scores for each role (benchmarks)
const ROLE_REQUIREMENTS = {
    Manager: {
        'Empathy': 80,
        'Delegation': 75,
        'Conflict Resolution': 85,
        'Strategic Thinking': 75,
        'Decision Making': 80,
        'Team Motivation': 70
    },
    Developer: {
        'Technical Communication': 75,
        'Problem Solving': 85,
        'Collaboration': 80,
        'Time Management': 70,
        'Professionalism': 75,
        'Learning Agility': 80
    },
    HR: {
        'Empathy': 85,
        'Active Listening': 90,
        'Conflict Mediation': 85,
        'Policy Knowledge': 75,
        'Discretion': 80,
        'Communication Clarity': 80
    },
    Executive: {
        'Strategic Vision': 85,
        'Stakeholder Management': 80,
        'Decision Making Under Pressure': 90,
        'Negotiation': 85,
        'Change Management': 75,
        'Professionalism': 80
    }
};

// Helper: Get competency names for a role
function getCompetenciesForRole(role) {
    return ROLE_COMPETENCIES[role] || ROLE_COMPETENCIES.Manager;
}

// Helper: Get required scores for a role
function getRequirementsForRole(role) {
    return ROLE_REQUIREMENTS[role] || ROLE_REQUIREMENTS.Manager;
}

// Helper: Map generic competency fields to role-specific names
function mapCompetenciesToNames(role, scores) {
    const competencyNames = getCompetenciesForRole(role);
    const result = {};

    competencyNames.forEach((name, index) => {
        result[name] = scores[`competency${index + 1}`] || 0;
    });

    return result;
}

module.exports = {
    ROLE_COMPETENCIES,
    ROLE_REQUIREMENTS,
    getCompetenciesForRole,
    getRequirementsForRole,
    mapCompetenciesToNames
};
