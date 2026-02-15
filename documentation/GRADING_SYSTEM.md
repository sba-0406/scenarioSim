# ScenarioSim Grading System

This document explains how the ScenarioSim evaluation engine calculates final grades for leadership simulations.

---

## Overview

The grading system uses a **Performance Multiplier** approach that evaluates both:
1. **Skill Accumulation** - What strategies you practiced
2. **Metric Management** - How well you balanced the professional environment

---

## Step-by-Step Calculation

### 1. Skill Score Accumulation

Every time you make a choice, you earn **+10 points** in a specific behavioral skill:

| Approach | Manager Skill | Developer Skill | HR Skill |
|:---|:---|:---|:---|
| **Relationship** | Team Stability Management | Collaboration Under Pressure | Employee Sensitivity Handling |
| **Results** | Delivery Control | Task Ownership | Retention Strategy Awareness |
| **Boundary** | Conflict Containment | Code Quality Discipline | Policy Enforcement Strength |

**Example** (9 turns, balanced choices):
```javascript
skillScores = {
  "Team Stability Management": 30,
  "Delivery Control": 30,
  "Conflict Containment": 30
}
```

---

### 2. Calculate Skill Average

```javascript
skillAverage = (30 + 30 + 30) / 3 = 30
```

---

### 3. Calculate Performance Multiplier

This is where **quality** matters. The engine evaluates your final metrics using **polarity**:

#### Metric Polarity (Manager Example):
- `morale`: **'high'** (higher is better)
- `risk`: **'low'** (lower is better)
- `trust`: **'high'** (higher is better)

#### Health Score Formula:
```javascript
// For 'high' polarity metrics:
health = finalValue / 100

// For 'low' polarity metrics:
health = (100 - finalValue) / 100
```

#### Example Calculation:
```javascript
// Final metrics:
morale: 40, risk: 5, trust: 75

// Calculate health scores:
morale health = 40 / 100 = 0.40
risk health = (100 - 5) / 100 = 0.95
trust health = 75 / 100 = 0.75

// Average them:
performanceMultiplier = (0.40 + 0.95 + 0.75) / 3 = 0.70
```

---

### 4. Apply Multiplier to Final Score

```javascript
adjustedScore = (skillAverage × performanceMultiplier × 2) + 30
adjustedScore = (30 × 0.70 × 2) + 30
adjustedScore = 42 + 30 = 72
```

---

### 5. Grade Mapping

```javascript
function getGrade(score) {
  if (score >= 90) return 'S';  // Outstanding
  if (score >= 80) return 'A';  // Excellent
  if (score >= 70) return 'B';  // Good
  if (score >= 60) return 'C';  // Satisfactory
  if (score >= 50) return 'D';  // Needs Improvement
  return 'F';                   // Unsatisfactory
}
```

**Result**: `getGrade(72)` = **"B"**

---

## Impact of Different Play Styles

### Player A: "The Dictator" (All Results)
- **Final Skills**: Delivery Control: 90, Others: 0
- **Final Metrics**: morale: 0, risk: 0, trust: 95
- **Multiplier**: 0.65 (crushed morale penalty)
- **Grade**: **C**

### Player B: "The Diplomat" (Balanced)
- **Final Skills**: All three: 30 each
- **Final Metrics**: morale: 70, risk: 50, trust: 65
- **Multiplier**: 0.85 (healthy balance)
- **Grade**: **A**

### Player C: "The Pushover" (All Relationship)
- **Final Skills**: Team Stability: 90, Others: 0
- **Final Metrics**: morale: 100, risk: 85, trust: 95
- **Multiplier**: 0.70 (high risk penalty)
- **Grade**: **B**

---

## Key Insights

1. **Completion ≠ Excellence**: Finishing all 9 turns doesn't guarantee an "A"
2. **Balance Matters**: The multiplier rewards keeping ALL metrics healthy
3. **Polarity is Critical**: The system knows that `risk: 85` is bad, even though it's a high number
4. **Transparency**: The `performanceMultiplier` is stored in your final report

---

## Technical Implementation

**Configuration**: [`backend/config/simulationConfig.js`](file:///c:/Users/shaik/Downloads/dojo-main/dojo-main/backend/config/simulationConfig.js)
- Defines `metricPolarity` for each role

**Calculation**: [`backend/controllers/dojoController.js`](file:///c:/Users/shaik/Downloads/dojo-main/dojo-main/backend/controllers/dojoController.js)
- `finalizeDojoSession()` function (lines 303-350)

**Display**: Final report shows:
- Overall Grade (S/A/B/C/D/F)
- Performance Multiplier (for transparency)
- Skill Scores breakdown
- AI-generated feedback

---

## Related Documentation

- [Evaluation Example](file:///C:/Users/shaik/.gemini/antigravity/brain/9e12ba02-bbd5-4be8-8add-8561dd5e155b/evaluation_example.md) - Detailed turn-by-turn walkthrough
- [Walkthrough](file:///C:/Users/shaik/.gemini/antigravity/brain/9e12ba02-bbd5-4be8-8add-8561dd5e155b/walkthrough.md) - Implementation details
