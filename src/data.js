export const MOCK_USER = {
  name: "Raj",
  age: 32,
  gender: "Male",
  profession: "working professional",
  location: "India",
  metrics: {
    heartRate: { value: 88, unit: "bpm", status: "elevated" },
    bloodPressure: { value: "138/88", unit: "mmHg", status: "rising" },
    spO2: { value: 97, unit: "%", status: "normal" },
    sleep: { value: 5.2, unit: "hrs", status: "low" },
    steps: { value: 3200, unit: "steps", status: "low" },
    stress: { value: "High", unit: "", status: "high" },
    healthScore: 62
  },
  trends: {
    bloodPressure: [
      { day: "3 Days Ago", value: "135/86" },
      { day: "Yesterday", value: "137/87" },
      { day: "Today", value: "138/88" }
    ]
  }
};

export const SYSTEM_PROMPT = `You are HealthBuddy, a friendly AI health assistant. The user is Raj, a 32-year-old male. His metrics: Heart Rate 88 bpm, BP 138/88 mmHg (rising 3-day trend), SpO2 97%, Sleep 5.2 hours, Steps 3,200, Stress High, Health Score 62/100. Respond in plain warm English. Never diagnose. Always recommend a doctor for anything serious. Keep responses to 2-4 sentences per point. Use clear section labels for multi-point answers.`;
