import { GoogleGenAI } from "@google/genai";
import {
  Stage1Discovery,
  Stage2Positioning,
  Stage3Shape,
  Stage4Visual,
  Stage5Critique,
  Stage6Deliver,
} from "@/types/brand";
import {
  generateMockStage1,
  generateMockStage2,
  generateMockStage3,
  generateMockStage4,
  generateMockStage5,
  generateMockStage6,
} from "./mockEngine";

export async function runStage1(rawIdea: string, customApiKey?: string): Promise<Stage1Discovery> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return generateMockStage1(rawIdea);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a master brand strategist at an elite brand agency.
The user provides a rough startup or creator concept: "${rawIdea}".

Your task is STAGE 1: DISCOVER & PROBE.
DO NOT jump straight into proposing logos, color palettes, or taglines!
Instead:
1. Extract the core problem being solved.
2. Sharpen the target audience (primary, secondary, and deepest visceral pain point).
3. Identify the initial category hypothesis.
4. Generate exactly 3 high-value clarifying questions that test the founder's ambition, pricing/accessibility philosophy, and antagonist/enemy. For each question, supply 3 realistic multiple choice options.

Output strictly valid JSON with this exact structure:
{
  "rawIdea": "${rawIdea}",
  "coreProblem": "...",
  "targetAudience": {
    "primary": "...",
    "secondary": "...",
    "painPoint": "..."
  },
  "categoryHypothesis": "...",
  "clarifyingQuestions": [
    {
      "id": "q1",
      "question": "...",
      "context": "Why answering this matters for the brand...",
      "options": ["Option 1", "Option 2", "Option 3"],
      "selectedOption": "Option 1"
    },
    {
      "id": "q2",
      "question": "...",
      "context": "...",
      "options": ["Option 1", "Option 2", "Option 3"],
      "selectedOption": "Option 1"
    },
    {
      "id": "q3",
      "question": "...",
      "context": "...",
      "options": ["Option 1", "Option 2", "Option 3"],
      "selectedOption": "Option 1"
    }
  ],
  "isClarified": true
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as Stage1Discovery;
    }
    return generateMockStage1(rawIdea);
  } catch (err) {
    console.warn("Gemini Stage 1 error, using fallback engine:", err);
    return generateMockStage1(rawIdea);
  }
}

export async function runStage2(stage1: Stage1Discovery, customApiKey?: string): Promise<Stage2Positioning> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return generateMockStage2(stage1);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a world-class brand strategist orchestrating a "Brand Battle".
Context:
- Idea: ${stage1.rawIdea}
- Core problem: ${stage1.coreProblem}
- Primary user: ${stage1.targetAudience.primary}
- Pain point: ${stage1.targetAudience.painPoint}
- Founder clarifications: ${stage1.clarifyingQuestions.map((q) => `${q.question}: ${q.selectedOption}`).join("; ")}

Create TWO radically contrasting strategic positioning territories (e.g. Territory A: high-energy disruptive insurgent vs. Territory B: ultra-refined precision/guild).
Avoid generic corporate safe bets.

Output strictly valid JSON with this exact structure:
{
  "territoryA": {
    "id": "territoryA",
    "territoryName": "...",
    "archetype": "...",
    "taglineHypothesis": "...",
    "valueProposition": "...",
    "categoryFraming": "...",
    "unfairAdvantage": "...",
    "whyItWins": "...",
    "keyRisk": "..."
  },
  "territoryB": {
    "id": "territoryB",
    "territoryName": "...",
    "archetype": "...",
    "taglineHypothesis": "...",
    "valueProposition": "...",
    "categoryFraming": "...",
    "unfairAdvantage": "...",
    "whyItWins": "...",
    "keyRisk": "..."
  },
  "strategicRecommendation": "Why one might win over the other...",
  "selectedTerritoryId": "territoryA"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as Stage2Positioning;
    }
    return generateMockStage2(stage1);
  } catch (err) {
    console.warn("Gemini Stage 2 error, using fallback engine:", err);
    return generateMockStage2(stage1);
  }
}

export async function runStage3(
  stage1: Stage1Discovery,
  stage2: Stage2Positioning,
  customApiKey?: string
): Promise<Stage3Shape> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return generateMockStage3(stage1, stage2);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const chosenTerritory = stage2.selectedTerritoryId === "territoryB" ? stage2.territoryB : stage2.territoryA;

    const prompt = `You are an elite naming specialist and brand identity architect.
Context:
- Idea: ${stage1.rawIdea}
- Chosen Strategy: ${chosenTerritory.territoryName} (${chosenTerritory.archetype})
- Value Prop: ${chosenTerritory.valueProposition}

Generate:
1. 4 personality traits justified against the audience.
2. 3 traits to strictly avoid.
3. Tone of voice sliders (1-10) and concrete "Do" and "Don't" rules (no generic 'be nice').
4. 4 distinct brand names across 4 styles: Compound, Invented, Metaphor, and Action-Oriented. Avoid cheesy '-ify' or '-ly' endings! Include taglines and domain notes.

Output strictly valid JSON with this exact structure:
{
  "personalityTraits": [
    { "trait": "...", "justification": "..." }
  ],
  "traitsToAvoid": [
    { "trait": "...", "reason": "..." }
  ],
  "toneOfVoice": {
    "formality": 4,
    "boldness": 8,
    "warmth": 6,
    "voiceSummary": "...",
    "rules": {
      "do": ["Rule 1", "Rule 2", "Rule 3"],
      "dont": ["Don't 1", "Don't 2", "Don't 3"]
    }
  },
  "names": [
    {
      "name": "...",
      "style": "Compound",
      "rationale": "...",
      "domainFeasibilityNote": "...",
      "tagline": "..."
    },
    {
      "name": "...",
      "style": "Invented",
      "rationale": "...",
      "domainFeasibilityNote": "...",
      "tagline": "..."
    },
    {
      "name": "...",
      "style": "Metaphor",
      "rationale": "...",
      "domainFeasibilityNote": "...",
      "tagline": "..."
    },
    {
      "name": "...",
      "style": "Action-Oriented",
      "rationale": "...",
      "domainFeasibilityNote": "...",
      "tagline": "..."
    }
  ],
  "selectedNameIndex": 0
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as Stage3Shape;
    }
    return generateMockStage3(stage1, stage2);
  } catch (err) {
    console.warn("Gemini Stage 3 error, using fallback engine:", err);
    return generateMockStage3(stage1, stage2);
  }
}

export async function runStage4(stage3: Stage3Shape, customApiKey?: string): Promise<Stage4Visual> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return generateMockStage4(stage3);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const selectedName = stage3.names[stage3.selectedNameIndex]?.name || "BrandForge";

    const prompt = `You are a world-class creative design director.
Brand Name: "${selectedName}"
Tone of Voice: ${stage3.toneOfVoice.voiceSummary}
Personality: ${stage3.personalityTraits.map((t) => t.trait).join(", ")}

Design the visual identity system:
1. Exactly 6 cohesive color swatches (primary, secondary, accent, background, surface, text) with valid hex codes and rationale.
2. Typography pairing (Heading Google Font and Body Google Font) with design rationale.
3. Logo direction: concept, symbolism, svgShapeType ('geometric_monogram' | 'minimal_abstract' | 'connected_nodes' | 'bold_badge'), monogramLetter, accentColor.

Output strictly valid JSON with this exact structure:
{
  "colorPalette": [
    { "role": "primary", "name": "...", "hex": "#...", "rationale": "..." },
    { "role": "secondary", "name": "...", "hex": "#...", "rationale": "..." },
    { "role": "accent", "name": "...", "hex": "#...", "rationale": "..." },
    { "role": "background", "name": "...", "hex": "#...", "rationale": "..." },
    { "role": "surface", "name": "...", "hex": "#...", "rationale": "..." },
    { "role": "text", "name": "...", "hex": "#...", "rationale": "..." }
  ],
  "typography": {
    "headingFont": "Space Grotesk",
    "bodyFont": "Inter",
    "pairingRationale": "...",
    "headingWeight": "font-bold tracking-tight"
  },
  "logoDirection": {
    "concept": "...",
    "symbolism": "...",
    "svgShapeType": "geometric_monogram",
    "monogramLetter": "${selectedName.charAt(0).toUpperCase()}",
    "accentColor": "#4F46E5"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as Stage4Visual;
    }
    return generateMockStage4(stage3);
  } catch (err) {
    console.warn("Gemini Stage 4 error, using fallback engine:", err);
    return generateMockStage4(stage3);
  }
}

export async function runStage5(
  stage1: Stage1Discovery,
  stage2: Stage2Positioning,
  stage3: Stage3Shape,
  stage4: Stage4Visual,
  customApiKey?: string
): Promise<Stage5Critique> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return generateMockStage5(stage1, stage2, stage3, stage4);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a ruthless Brand Critic (The Anti-Generic Red Team Engine).
Your sole purpose is to detect lazy startup patterns, buzzwords (e.g. 'all-in-one', 'empower', 'seamless', 'revolutionary'), cliché visual directions, and weak assumptions.

Review these assets:
- Name: ${stage3.names[stage3.selectedNameIndex]?.name}
- Tagline: ${stage3.names[stage3.selectedNameIndex]?.tagline}
- Value Prop: ${stage2.territoryA.valueProposition}
- Voice: ${stage3.toneOfVoice.voiceSummary}

Output strictly valid JSON with this exact structure:
{
  "distinctivenessScore": 88,
  "antiGenericTier": "Distinctive",
  "clichesDetected": [
    {
      "foundIn": "value_prop",
      "originalText": "...",
      "whyItIsWeak": "...",
      "replacementBetterText": "..."
    }
  ],
  "redTeamCritique": "Detailed ruthless critique of the branding and how it stands out...",
  "audienceAlignmentScore": 92,
  "upgradesApplied": true
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as Stage5Critique;
    }
    return generateMockStage5(stage1, stage2, stage3, stage4);
  } catch (err) {
    console.warn("Gemini Stage 5 error, using fallback engine:", err);
    return generateMockStage5(stage1, stage2, stage3, stage4);
  }
}

export async function runStage6(
  stage1: Stage1Discovery,
  stage2: Stage2Positioning,
  stage3: Stage3Shape,
  stage4: Stage4Visual,
  stage5: Stage5Critique,
  customApiKey?: string
): Promise<Stage6Deliver> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return generateMockStage6(stage1, stage2, stage3, stage4, stage5);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const brandName = stage3.names[stage3.selectedNameIndex]?.name || "Brand";

    const prompt = `You are a high-converting launch copywriter.
Brand: ${brandName}
Tagline: ${stage3.names[stage3.selectedNameIndex]?.tagline}
Positioning: ${stage2.territoryA.valueProposition}
Audience: ${stage1.targetAudience.primary}

Deliver:
1. Elevator pitch (10 words and 30 seconds).
2. High-converting Landing Page Hero copy (badge, headline, subheadline, ctaPrimary, ctaSecondary, socialProofHook).
3. Social launch campaign (Twitter/X thread opener, LinkedIn announcement, launch email).
4. Markdown summary of the brand system.

Output strictly valid JSON with this exact structure:
{
  "elevatorPitch": {
    "tenWords": "...",
    "thirtySeconds": "..."
  },
  "landingPageHero": {
    "badge": "...",
    "headline": "...",
    "subheadline": "...",
    "ctaPrimary": "...",
    "ctaSecondary": "...",
    "socialProofHook": "..."
  },
  "socialLaunchCampaign": {
    "twitterThreadOpener": "...",
    "linkedInAnnouncement": "...",
    "launchEmailSubject": "...",
    "launchEmailBody": "..."
  },
  "brandGuidelinesSummaryMarkdown": "# Brand Guidelines..."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as Stage6Deliver;
    }
    return generateMockStage6(stage1, stage2, stage3, stage4, stage5);
  } catch (err) {
    console.warn("Gemini Stage 6 error, using fallback engine:", err);
    return generateMockStage6(stage1, stage2, stage3, stage4, stage5);
  }
}
