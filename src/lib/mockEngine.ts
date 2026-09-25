import {
  Stage1Discovery,
  Stage2Positioning,
  Stage3Shape,
  Stage4Visual,
  Stage5Critique,
  Stage6Deliver,
} from "@/types/brand";
import { calculateDistinctivenessScore } from "./clicheCorpus";

export function generateMockStage1(rawIdea: string): Stage1Discovery {
  const isStudentOrEd = /student|tutor|hackathon|college|campus|learn|study/i.test(rawIdea);
  const isFinance = /crypto|money|finance|invest|pay|budget/i.test(rawIdea);
  const isHealth = /health|fitness|workout|diet|mental/i.test(rawIdea);

  let coreProblem = `Founders struggle to turn the raw concept "${rawIdea}" into an authoritative market positioning with verified customer demand.`;
  let primaryAudience = "Early adopters seeking high-efficiency workflows and zero-bloat tooling";
  let painPoint = "Overwhelmed by generic options, high coordination costs, and lack of trust";
  let category = "Next-Generation Workflow & Community Intelligence";

  if (isStudentOrEd) {
    coreProblem = "Students waste hours in fragmented Discord and WhatsApp groups trying to find committed teammates with complementary technical and design skills.";
    primaryAudience = "Ambitious collegiate engineers, designers, and hackathon competitors";
    painPoint = "Flaky partners, mismatched skill tiers, and asymmetric dedication during 48-hour sprints.";
    category = "Collegiate Talent & Hackathon Formation Protocol";
  } else if (isFinance) {
    coreProblem = "Retail investors lack institutional-grade portfolio visibility and get blindsided by volatile drawdown risks.";
    primaryAudience = "Self-directed tech professionals managing personal portfolios";
    painPoint = "Cluttered broker apps with delayed analytics and zero proactive risk telemetry.";
    category = "Automated Wealth Intelligence Platform";
  } else if (isHealth) {
    coreProblem = "Individuals abandon wellness routines because habit trackers rely on manual logging instead of passive biomarker feedback.";
    primaryAudience = "Performance-focused knowledge workers optimizing energy and recovery";
    painPoint = "Guilt-inducing streak mechanics and lack of personalized biological nuance.";
    category = "Adaptive Biological Cadence System";
  }

  return {
    rawIdea,
    coreProblem,
    targetAudience: {
      primary: primaryAudience,
      secondary: "Community leads, event organizers, and ecosystem recruiters",
      painPoint,
    },
    categoryHypothesis: category,
    clarifyingQuestions: [
      {
        id: "q1",
        question: "What is the primary motivation driving your users to seek this out first?",
        context: "Clarifying whether the friction is speed, prestige, or safety decides the brand's core positioning tone.",
        options: [
          "Urgency & Immediate Need (They need a verified solution right now)",
          "Prestige & Selective Excellence (They want to belong to an elite tier)",
          "Peace of Mind & Trust (They've been burned by unreliable alternatives)",
        ],
        selectedOption: "Urgency & Immediate Need (They need a verified solution right now)",
      },
      {
        id: "q2",
        question: "How should your pricing and accessibility philosophy be perceived?",
        context: "Brands that feel radically democratic require distinct visual and verbal cues from premium specialized instruments.",
        options: [
          "Radically Open & Merit-Driven (Low barrier, viral community-first)",
          "High-Touch & Curated (Invite-only or vetting required)",
          "Pragmatic Utility (Transparent pay-per-use, zero enterprise fluff)",
        ],
        selectedOption: "Radically Open & Merit-Driven (Low barrier, viral community-first)",
      },
      {
        id: "q3",
        question: "Who is the primary enemy or counter-alternative your brand fights against?",
        context: "Great brands define themselves against an antagonist (e.g., bureaucracy, apathy, or spam).",
        options: [
          "Chaos & Flakiness (Fragmented group chats, ghosting, broken promises)",
          "Corporate Stagnation (Bloated legacy tools built in 2012)",
          "Gatekeeping & Unfair Pedigree (Traditional networks that ignore raw merit)",
        ],
        selectedOption: "Chaos & Flakiness (Fragmented group chats, ghosting, broken promises)",
      },
    ],
    isClarified: true,
  };
}

export function generateMockStage2(stage1: Stage1Discovery): Stage2Positioning {
  const territoryA = {
    id: "territoryA" as const,
    territoryName: "The Disruptive Syndicate",
    archetype: "The Rebel & Catalyst",
    taglineHypothesis: "No Flakes. No Bureaucracy. Just Builders.",
    valueProposition: `The anti-fluff formation network that matches ${stage1.targetAudience.primary} based on proven GitHub commits and verified shipping velocity.`,
    categoryFraming: "Decentralized Team Formation Engine",
    unfairAdvantage: "Proof-of-work matching algorithms that guarantee equal stakes and zero ghosting.",
    whyItWins: "Cuts through the noise of crowded group chats by polarizing against lazy participants.",
    keyRisk: "Might feel intimidating to shy beginners if the tone leans too aggressive.",
  };

  const territoryB = {
    id: "territoryB" as const,
    territoryName: "The Master Craft Guild",
    archetype: "The Sage & Architect",
    taglineHypothesis: "Where High-Caliber Craft Meets Seamless Co-Creation.",
    valueProposition: `A curated intelligence layer designed to pair high-standard practitioners with high-complementarity collaborators for breakthrough projects.`,
    categoryFraming: "Strategic Collaborative Intelligence",
    unfairAdvantage: "Deep psychometric and skill-graph pairing calibrated for psychological safety and flow-state output.",
    whyItWins: "Attracts top 5% talent who value precision, mutual respect, and long-term reputational upside.",
    keyRisk: "Slower initial viral loop due to selective positioning.",
  };

  return {
    territoryA,
    territoryB,
    strategicRecommendation:
      "Territory A offers higher initial viral velocity for student and creator communities, while Territory B delivers higher lifetime enterprise and B2B pricing power. For maximum momentum, anchor in Territory A's punchy boldness.",
    selectedTerritoryId: "territoryA",
  };
}

export function generateMockStage3(stage1: Stage1Discovery, stage2: Stage2Positioning): Stage3Shape {
  return {
    personalityTraits: [
      {
        trait: "Uncompromisingly Direct",
        justification: "Users are fatigued by polite corporate jargon. Speaking plainly signals high integrity and respect for their time.",
      },
      {
        trait: "Electric & Kinetic",
        justification: "Captures the high-octane excitement of 48-hour build weekends and instant momentum.",
      },
      {
        trait: "Vigorously Merit-Based",
        justification: "Celebrates what you have built and deployed over where you went to school.",
      },
      {
        trait: "Warmly In-the-Trenches",
        justification: "Feels like an experienced peer in the Discord channel, not a suit evaluating from an ivory tower.",
      },
    ],
    traitsToAvoid: [
      {
        trait: "Stuffy Corporate Formalism",
        reason: "Instant trust killer for Gen-Z and digital-native builders.",
      },
      {
        trait: "Over-promising Silicon Valley Hype",
        reason: "Buzzwords like 'revolutionary AI magic' provoke cynical pushback.",
      },
      {
        trait: "Condescending or Gatekeeping",
        reason: "We challenge flakiness, never genuine ambition.",
      },
    ],
    toneOfVoice: {
      formality: 3,
      boldness: 9,
      warmth: 7,
      voiceSummary: "Clear, punchy, irreverent yet hyper-competent. We speak in active verbs and short sentences.",
      rules: {
        do: [
          "Use crisp engineering and builder terminology (ship, deploy, commit, sprint).",
          "Back assertions with specific operational numbers.",
          "Keep sentences under 14 words whenever possible.",
        ],
        dont: [
          "Never say 'supercharge your productivity' or 'empower teams'.",
          "Never hide pricing or friction behind 'Schedule an Enterprise Demo' buttons.",
          "Avoid hollow superlative adjectives (best-in-class, next-generation).",
        ],
      },
    },
    names: [
      {
        name: "SquadForge",
        style: "Compound",
        rationale: "Combines the military cohesion of 'Squad' with the elemental heat and craftsmanship of 'Forge'.",
        domainFeasibilityNote: "squadforge.dev or squadforge.sh is clean and resonates with developers.",
        tagline: "Form your strike team. Ship by midnight.",
      },
      {
        name: "Kinetix",
        style: "Invented",
        rationale: "Derived from kinetic energy and matrix—evoking unstoppable collaborative velocity.",
        domainFeasibilityNote: "kinetix.team or trykinetix.com fits modern product convention.",
        tagline: "Collaborative momentum on demand.",
      },
      {
        name: "Cohort",
        style: "Metaphor",
        rationale: "A classical Roman tactical unit re-imagined as high-trust modern builder squads.",
        domainFeasibilityNote: "cohort.build or joincohort.xyz",
        tagline: "Find the other half of your brain.",
      },
      {
        name: "SyncPulse",
        style: "Action-Oriented",
        rationale: "Signals instantaneous alignment and heartbeat vitality between co-founders.",
        domainFeasibilityNote: "syncpulse.app or syncpulse.io",
        tagline: "Instant synergy. Zero friction.",
      },
    ],
    selectedNameIndex: 0,
  };
}

export function generateMockStage4(stage3: Stage3Shape): Stage4Visual {
  const brandName = stage3.names[stage3.selectedNameIndex]?.name || "BrandForge";

  return {
    colorPalette: [
      {
        role: "primary",
        name: "Hyper Indigo",
        hex: "#4F46E5",
        rationale: "Carries electric technical authority while avoiding standard washed-out corporate blue.",
      },
      {
        role: "secondary",
        name: "Obsidian Core",
        hex: "#09090B",
        rationale: "Creates a dark-mode first, high-contrast canvas that anchors technical craft.",
      },
      {
        role: "accent",
        name: "Volt Lime",
        hex: "#10B981",
        rationale: "Signals operational readiness, live status, and verified deployment signals.",
      },
      {
        role: "background",
        name: "Off-White Canvas",
        hex: "#FAFAFA",
        rationale: "Provides a crisp, editorial reading environment for whitepaper and documentation modes.",
      },
      {
        role: "surface",
        name: "Slate Fog",
        hex: "#F1F5F9",
        rationale: "Soft container fill for cards, pills, and interactive micro-surfaces.",
      },
      {
        role: "text",
        name: "Deep Titanium",
        hex: "#0F172A",
        rationale: "High legibility text meeting WCAG AAA contrast compliance against all surfaces.",
      },
    ],
    typography: {
      headingFont: "Space Grotesk",
      bodyFont: "Inter",
      pairingRationale:
        "Space Grotesk provides a geometric, tech-forward cadence in uppercase and bold weights, balanced by Inter's pristine micro-reading legibility.",
      headingWeight: "font-bold tracking-tight",
    },
    logoDirection: {
      concept: "Interlocking hexagonal anvil and beacon node",
      symbolism: "Represents the fusion of distinct talents coalescing into a single resilient force multiplier.",
      svgShapeType: "connected_nodes",
      monogramLetter: brandName.charAt(0).toUpperCase() || "S",
      accentColor: "#4F46E5",
    },
  };
}

export function generateMockStage5(
  stage1: Stage1Discovery,
  stage2: Stage2Positioning,
  stage3: Stage3Shape,
  stage4: Stage4Visual
): Stage5Critique {
  const brandName = stage3.names[stage3.selectedNameIndex]?.name || "SquadForge";
  const selectedTagline = stage3.names[stage3.selectedNameIndex]?.tagline || "Form your strike team.";

  const textToAudit = [
    brandName,
    selectedTagline,
    stage2.territoryA.valueProposition,
    stage3.toneOfVoice.voiceSummary,
  ];

  const { score, tier } = calculateDistinctivenessScore(textToAudit);

  return {
    distinctivenessScore: 89,
    antiGenericTier: "Exceptional",
    clichesDetected: [
      {
        foundIn: "value_prop",
        originalText: "Empowering students to build together seamlessly",
        whyItIsWeak: "'Empowering' and 'seamlessly' are generic tech filler that obscure the real mechanical matching innovation.",
        replacementBetterText: "Connect vetted collegiate builders with zero coordination drag and proof-of-work matching.",
      },
      {
        foundIn: "tagline",
        originalText: "The all-in-one platform for your next project",
        whyItIsWeak: "'All-in-one platform' dilutes focus and sounds like slow enterprise software.",
        replacementBetterText: "Assemble your 48-hour strike team. Ship by midnight.",
      },
      {
        foundIn: "visuals",
        originalText: "Generic purple-to-pink gradient with soft rounded corners",
        whyItIsWeak: "A familiar visual pattern makes the product harder to distinguish at a glance.",
         replacementBetterText: "Architectural Obsidian Core with high-signal Volt Lime telemetry accents.",
      },
    ],
    redTeamCritique:
      "The brand system strongly avoids the 'happy college stock photo' trap. By framing collaboration as an engineering strike team rather than a casual study hall, you gain immediate credibility with high-performing builders who normally avoid campus networking events.",
    audienceAlignmentScore: 94,
    upgradesApplied: true,
  };
}

export function generateMockStage6(
  stage1: Stage1Discovery,
  stage2: Stage2Positioning,
  stage3: Stage3Shape,
  stage4: Stage4Visual,
  stage5: Stage5Critique
): Stage6Deliver {
  const brandName = stage3.names[stage3.selectedNameIndex]?.name || "SquadForge";
  const tagline = stage3.names[stage3.selectedNameIndex]?.tagline || "Form your strike team. Ship by midnight.";

  return {
    elevatorPitch: {
      tenWords: `${brandName} forms committed hackathon teams from verified builder proof-of-work data.`,
      thirtySeconds: `Every hackathon, thousands of great projects die because team formation is stuck in chaotic Discord channels and flaky group chats. ${brandName} replaces random luck with proof-of-work telemetry: we pair developers, designers, and founders based on their actual GitHub commits and commitment scores so they can start building in minutes and ship before demo day.`,
    },
    landingPageHero: {
      badge: "Built for serious builders • Fall 2026 Season Open",
      headline: "Stop searching group chats. Assemble your strike team.",
      subheadline: `${brandName} uses proof-of-work matching to pair committed developers, designers, and organizers into high-velocity teams. Zero flakes. Zero ghosting.`,
      ctaPrimary: "Find Your Co-Builders",
      ctaSecondary: "Explore Team Gallery",
      socialProofHook: "Built for collegiate builders who want to ship before demo day.",
    },
    socialLaunchCampaign: {
      twitterThreadOpener: `90% of hackathon teams fail before writing a single line of code—not because the idea is bad, but because 2 of the 4 members ghost by 2:00 AM.\n\nWe spent 6 months studying why co-creation breaks down.\n\nToday, we're launching @${brandName.toLowerCase()}: The proof-of-work team formation engine. 🧵👇`,
      linkedInAnnouncement: `Excited to announce the launch of ${brandName}!\n\nFounders and student builders often start with incredible drive, but lose weeks trying to find complementary peers who share their exact shipping velocity. ${brandName} eliminates coordination chaos with verified skill pairing and commitment accountability.\n\nCheck out our live platform and let us know what you think: https://${brandName.toLowerCase()}.dev`,
      launchEmailSubject: `Announcing ${brandName}: Never build alone again`,
      launchEmailBody: `Hey Builder,\n\nWe've all been there: you have a high-conviction product idea, but finding a co-founder or hackathon partner feels like spinning a roulette wheel.\n\n${brandName} is our answer: a focused engine to pair verified practitioners in minutes.\n\nJoin the initial cohort here: https://${brandName.toLowerCase()}.dev\n\nLet's ship,\nThe ${brandName} Team`,
    },
    brandGuidelinesSummaryMarkdown: `# ${brandName} Brand Guidelines & Identity System\n\n**Tagline:** ${tagline}\n**Archetype:** ${stage2.territoryA.archetype}\n**Core Audience:** ${stage1.targetAudience.primary}\n\n## 1. Brand Essence\n${stage3.toneOfVoice.voiceSummary}\n\n## 2. Color Palette\n${stage4.colorPalette.map((c) => `- **${c.name}** (\`${c.hex}\`): ${c.rationale}`).join("\n")}\n\n## 3. Typography\n- **Headings:** ${stage4.typography.headingFont}\n- **Body:** ${stage4.typography.bodyFont}\n- *Rationale:* ${stage4.typography.pairingRationale}\n\n## 4. Voice Rules\n**Do:**\n${stage3.toneOfVoice.rules.do.map((r) => `- ${r}`).join("\n")}\n\n**Don't:**\n${stage3.toneOfVoice.rules.dont.map((r) => `- ${r}`).join("\n")}\n\n## 5. Anti-Generic Standard\n- Distinctiveness Score: ${stage5.distinctivenessScore}/100 (${stage5.antiGenericTier})\n- Quality Seal: Passed anti-generic startup cliche filter.\n`,
  };
}
