export interface ClichePattern {
  regex: RegExp;
  category: "value_prop" | "name" | "tagline" | "voice";
  explanation: string;
  replacementAdvice: string;
}

export const KNOWN_CLICHES: ClichePattern[] = [
  {
    regex: /\b(uber|airbnb|tinder)\s+for\b/i,
    category: "value_prop",
    explanation: "Referencing 2010s gig-economy monopolies makes your product sound derivative and masks the real mechanics of your solution.",
    replacementAdvice: "Describe the concrete transformation you provide instead of borrowing another company's brand shorthand.",
  },
  {
    regex: /\bempowering\s+(.+?)\s+to\b/i,
    category: "value_prop",
    explanation: "'Empowering' is one of the most overused, low-information verbs in tech. It tells the user nothing about what the tool actually accomplishes.",
    replacementAdvice: "Use an active, visceral verb like 'equip', 'accelerate', 'automate', 'unblock', or 'arm'.",
  },
  {
    regex: /\ball-in-one\s+(platform|solution|tool)\b/i,
    category: "value_prop",
    explanation: "'All-in-one' signals a bloated tool that does many things poorly rather than one sharp thing exceptionally well.",
    replacementAdvice: "Position as a specialized operating system or precision engine for your single highest-value workflow.",
  },
  {
    regex: /\brevolutioniz(e|ing)\b/i,
    category: "tagline",
    explanation: "Founders claim 'revolution' before having 10 users. It provokes cynicism from modern buyers.",
    replacementAdvice: "State the tangible before/after contrast (e.g., 'From 3 days of spreadsheets to a 30-second audit').",
  },
  {
    regex: /\bseamless(ly)?\b/i,
    category: "voice",
    explanation: "'Seamless' is table stakes filler. No customer buys software because someone called it seamless.",
    replacementAdvice: "Highlight the specific friction removed (e.g., 'Zero API keys required', 'Instant webhook sync').",
  },
  {
    regex: /\bunlock\s+(your|the)\s+potential\b/i,
    category: "tagline",
    explanation: "Classic corporate self-help filler with zero specific domain context.",
    replacementAdvice: "Highlight the concrete metric or leverage gained.",
  },
  {
    regex: /\b(supercharge|turbocharge)\b/i,
    category: "voice",
    explanation: "Tech marketing cliché that substitutes hype for specificity.",
    replacementAdvice: "State the velocity multiplier: 'Ship in 4 hours' or 'Halve your triage backlog'.",
  },
  {
    regex: /\bnext-gen(eration)?\b/i,
    category: "tagline",
    explanation: "Unsubstantiated hyperbole that will be obsolete in 6 months.",
    replacementAdvice: "Highlight the novel architecture or psychological insight.",
  },
  {
    regex: /\b(ify|ly)$/i,
    category: "name",
    explanation: "Suffixing '-ify' or '-ly' is a 2014 naming pattern that instantly feels like a commodity SaaS project.",
    replacementAdvice: "Opt for an evocative compound noun, an architectural metaphor, or a punchy invented verb.",
  },
];

export function auditTextForCliches(text: string): { found: boolean; matches: Array<{ original: string; why: string; advice: string }> } {
  const matches: Array<{ original: string; why: string; advice: string }> = [];

  for (const pattern of KNOWN_CLICHES) {
    const match = text.match(pattern.regex);
    if (match) {
      matches.push({
        original: match[0],
        why: pattern.explanation,
        advice: pattern.replacementAdvice,
      });
    }
  }

  return {
    found: matches.length > 0,
    matches,
  };
}

export function calculateDistinctivenessScore(textSamples: string[]): {
  score: number;
  tier: "Exceptional" | "Distinctive" | "Average" | "Generic Trap";
} {
  let penalty = 0;
  const combined = textSamples.join(" ");

  for (const pattern of KNOWN_CLICHES) {
    if (pattern.regex.test(combined)) {
      penalty += 14;
    }
  }

  if (combined.length < 50) penalty += 15;

  const score = Math.max(22, Math.min(98, 95 - penalty));

  let tier: "Exceptional" | "Distinctive" | "Average" | "Generic Trap" = "Distinctive";
  if (score >= 88) tier = "Exceptional";
  else if (score >= 72) tier = "Distinctive";
  else if (score >= 50) tier = "Average";
  else tier = "Generic Trap";

  return { score, tier };
}
