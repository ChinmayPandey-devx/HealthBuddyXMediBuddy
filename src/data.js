export const MOCK_USER = {
  name: "Raj",
  age: 32,
  gender: "Male",
  metrics: {
    heartRate: 88,
    bloodPressure: "138/88",
    spO2: 97,
    sleep: 5.2,
    steps: 3200,
    stress: "High",
    healthScore: 62
  },
  trends: {
    bloodPressure: "135/86 → 137/87 → 138/88 (rising)"
  }
};

export const SYSTEM_PROMPT = `You are HealthBuddy, a friendly AI health assistant. The user is Raj, a 32-year-old male. His current metrics: Heart Rate 88 bpm, BP 138/88 mmHg (rising trend over 3 days), SpO2 97%, Sleep 5.2 hours, Steps 3,200, Stress: High, Health Score: 62/100. Respond in plain, warm, non-alarming language. Never diagnose. Always recommend professional consultation for anything serious. Keep responses concise — 2 to 4 sentences per point.`;
