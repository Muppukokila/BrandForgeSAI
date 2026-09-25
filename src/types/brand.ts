export type StageNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface ClarifyingQuestion {
  id: string;
  question: string;
  context: string;
  options: string[];
  selectedOption?: string;
  customAnswer?: string;
}

export interface Stage1Discovery {
  rawIdea: string;
  coreProblem: string;
  targetAudience: {
    primary: string;
    secondary: string;
    painPoint: string;
  };
  categoryHypothesis: string;
  clarifyingQuestions: ClarifyingQuestion[];
  isClarified: boolean;
}

export interface PositioningTerritory {
  id: "territoryA" | "territoryB";
  territoryName: string;
  archetype: string;
  taglineHypothesis: string;
  valueProposition: string;
  categoryFraming: string;
  unfairAdvantage: string;
  whyItWins: string;
  keyRisk: string;
}

export interface Stage2Positioning {
  territoryA: PositioningTerritory;
  territoryB: PositioningTerritory;
  strategicRecommendation: string;
  selectedTerritoryId: "territoryA" | "territoryB" | "blend";
  blendedNotes?: string;
}

export interface PersonalityTrait {
  trait: string;
  justification: string;
}

export interface TraitToAvoid {
  trait: string;
  reason: string;
}

export interface BrandNameOption {
  name: string;
  style: "Invented" | "Compound" | "Metaphor" | "Action-Oriented";
  rationale: string;
  domainFeasibilityNote: string;
  tagline: string;
}

export interface Stage3Shape {
  personalityTraits: PersonalityTrait[];
  traitsToAvoid: TraitToAvoid[];
  toneOfVoice: {
    formality: number;
    boldness: number;
    warmth: number;
    voiceSummary: string;
    rules: {
      do: string[];
      dont: string[];
    };
  };
  names: BrandNameOption[];
  selectedNameIndex: number;
}

export interface ColorSwatch {
  role: "primary" | "secondary" | "accent" | "background" | "surface" | "text";
  name: string;
  hex: string;
  rationale: string;
}

export interface Stage4Visual {
  colorPalette: ColorSwatch[];
  typography: {
    headingFont: string;
    bodyFont: string;
    pairingRationale: string;
    headingWeight: string;
  };
  logoDirection: {
    concept: string;
    symbolism: string;
    svgShapeType: "geometric_monogram" | "minimal_abstract" | "connected_nodes" | "bold_badge";
    monogramLetter: string;
    accentColor: string;
  };
}

export interface ClicheDetection {
  foundIn: "value_prop" | "name" | "tagline" | "voice" | "visuals";
  originalText: string;
  whyItIsWeak: string;
  replacementBetterText: string;
}

export interface Stage5Critique {
  distinctivenessScore: number;
  antiGenericTier: "Exceptional" | "Distinctive" | "Average" | "Generic Trap";
  clichesDetected: ClicheDetection[];
  redTeamCritique: string;
  audienceAlignmentScore: number;
  upgradesApplied: boolean;
}

export interface Stage6Deliver {
  elevatorPitch: {
    tenWords: string;
    thirtySeconds: string;
  };
  landingPageHero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    socialProofHook: string;
  };
  socialLaunchCampaign: {
    twitterThreadOpener: string;
    linkedInAnnouncement: string;
    launchEmailSubject: string;
    launchEmailBody: string;
  };
  brandGuidelinesSummaryMarkdown: string;
}

export interface BrandProject {
  id: string;
  currentStage: StageNumber;
  completedStages: StageNumber[];
  stage1: Stage1Discovery | null;
  stage2: Stage2Positioning | null;
  stage3: Stage3Shape | null;
  stage4: Stage4Visual | null;
  stage5: Stage5Critique | null;
  stage6: Stage6Deliver | null;
  updatedAt: string;
}
