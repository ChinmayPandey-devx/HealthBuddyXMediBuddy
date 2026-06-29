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

export const HARDCODED_RESPONSES = {
  summary: [
    {
      title: "What looks good",
      text: "Your SpO2 is at 97% which means your blood oxygen is healthy and your lungs are doing their job well. You also managed to hit some movement today, which is a positive sign even if steps are below target."
    },
    {
      title: "What needs attention",
      text: "Your blood pressure has been climbing for 3 days straight — 135, then 137, now 138 mmHg. Combined with only 5.2 hours of sleep and high stress, your cardiovascular system is under real pressure right now. This pattern needs action today, not tomorrow."
    },
    {
      title: "Top tips for today",
      text: "1. Avoid caffeine and salt for the rest of today — both spike BP within 30 minutes.\n2. Take a 10-minute walk after dinner and sleep before 10:30 PM tonight. Even one night of 7+ hours can bring BP down measurably."
    }
  ],
  alert: [
    {
      title: "What 138/88 mmHg means",
      text: "This puts you in the Stage 1 hypertension range. It is not an emergency, but it is a clear warning sign that your heart is working harder than it should be at your age."
    },
    {
      title: "Why the combination is concerning",
      text: "Poor sleep raises cortisol, which tightens blood vessels. High stress does the same. When both hit together over multiple days, BP climbs and stays elevated. That is exactly what your data is showing."
    },
    {
      title: "What to do right now",
      text: "Drink a glass of cold water, step away from screens for 20 minutes, and do 5 minutes of slow deep breathing (4 seconds in, 6 seconds out). Then book a doctor check-in — this trend should not go past day 4 without professional review."
    }
  ],
  doctor: [
    "Rising blood pressure over 3 consecutive days, now at 138/88 mmHg, combined with chronic sleep deficit and elevated stress.",
    "• BP trend: 135/86 → 137/87 → 138/88 mmHg (3 days)\n• Heart rate: 88 bpm (resting, slightly elevated)\n• Sleep average: 5.2 hours/night\n• Stress level: High (self-reported + wearable HRV data)\n• SpO2: 97% (normal)",
    "1. Is this BP trend serious enough to consider medication, or can lifestyle changes reverse it?\n2. Could my sleep deprivation be the primary driver of this BP rise?",
    "Moderate — consult within 48 hours recommended."
  ]
};

export const CHAT_RESPONSES = [
  {
    keywords: ["heart rate normal", "is my heart rate", "heart rate"],
    response: "88 bpm at rest is slightly above the ideal range of 60–80 bpm. It is not alarming, but combined with your high stress and poor sleep, it suggests your body is in a mild fight-or-flight state. Try the deep breathing exercise I mentioned — resting HR often drops 5–8 bpm within minutes."
  },
  {
    keywords: ["why is my bp high", "blood pressure high", "bp high"],
    response: "Your BP has been climbing for 3 days. The most likely drivers are your 5.2-hour sleep average and sustained high stress — both raise cortisol which constricts blood vessels. Reducing salt, avoiding caffeine, and getting one full night of sleep can make a measurable difference by tomorrow morning."
  },
  {
    keywords: ["what should i eat", "eat today", "diet", "food"],
    response: "For your BP, focus on potassium-rich foods today — banana, coconut water, or a small bowl of curd. Avoid pickles, papads, and anything packaged. A light dinner before 8 PM will also help your sleep quality tonight, which directly impacts tomorrow's BP reading."
  },
  {
    keywords: ["am i okay", "is it dangerous", "dangerous"],
    response: "You are not in danger, but your body is sending clear signals that it needs rest and attention. Your SpO2 is healthy, which is a good sign. The BP trend is the one thing that needs action — one doctor consultation and two good nights of sleep could reset most of what your data is showing."
  }
];

export const CHAT_DEFAULT_RESPONSE = "That is a great question, Raj. Based on your current data, I would recommend focusing on rest and stress reduction today. Your most urgent metric to watch is your blood pressure trend — everything else follows from getting that under control.";

export const AYURVEDIC_REMEDIES = [
  {
    id: "bp",
    name: "Sarpagandha (Rauwolfia)",
    emoji: "🌿",
    helps: "Naturally lowers blood pressure",
    how: "Take 1 tablet twice daily after meals. Available as Himalaya BP Care or Patanjali Mukta Vati.",
    price: "₹185"
  },
  {
    id: "sleep",
    name: "Ashwagandha + Brahmi",
    emoji: "🌙",
    helps: "Reduces cortisol, improves sleep quality",
    how: "1 teaspoon ashwagandha powder in warm milk at night. Brahmi tablets in the morning.",
    price: "₹349"
  },
  {
    id: "hr",
    name: "Arjuna Bark (Terminalia arjuna)",
    emoji: "💧",
    helps: "Supports heart muscle and reduces resting heart rate",
    how: "Brew 1 teaspoon of Arjuna bark powder in water, drink once daily in the morning on an empty stomach.",
    price: "₹220"
  }
];
