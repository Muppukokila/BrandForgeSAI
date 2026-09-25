"use client";

import React, { createContext, startTransition, useContext, useState, useEffect } from "react";
import {
  BrandProject,
  StageNumber,
  Stage1Discovery,
  Stage2Positioning,
  Stage3Shape,
  Stage4Visual,
  Stage5Critique,
  Stage6Deliver,
} from "@/types/brand";
import confetti from "canvas-confetti";

interface BrandContextType {
  project: BrandProject;
  isLoading: boolean;
  loadingMessage: string;
  errorMessage: string | null;
  apiKey: string;
  setApiKey: (key: string) => void;
  goToStage: (stage: StageNumber) => void;
  startDiscovery: (idea: string) => Promise<void>;
  updateQuestionOption: (qId: string, option: string) => void;
  confirmDiscoveryAndProceed: () => Promise<void>;
  selectTerritory: (territory: "territoryA" | "territoryB" | "blend") => void;
  proceedToStage3: () => Promise<void>;
  selectNameIndex: (idx: number) => void;
  proceedToStage4: () => Promise<void>;
  proceedToStage5: () => Promise<void>;
  proceedToStage6: () => Promise<void>;
  resetProject: () => void;
  applyCritiqueUpgrades: () => void;
}

const initialProject: BrandProject = {
  id: "brandforge-default",
  currentStage: 1,
  completedStages: [],
  stage1: null,
  stage2: null,
  stage3: null,
  stage4: null,
  stage5: null,
  stage6: null,
  updatedAt: new Date().toISOString(),
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<BrandProject>(initialProject);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("brandforge_project");
    if (saved) {
      try {
        startTransition(() => setProject(JSON.parse(saved)));
      } catch (e) {
        console.warn("Could not parse saved brandforge project", e);
      }
    }
    const savedKey = localStorage.getItem("brandforge_gemini_key");
    if (savedKey) startTransition(() => setApiKey(savedKey));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (project.stage1) {
      localStorage.setItem("brandforge_project", JSON.stringify(project));
    }
  }, [project]);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("brandforge_gemini_key", key);
  };

  const goToStage = (stage: StageNumber) => {
    setProject((prev) => ({ ...prev, currentStage: stage }));
  };

  const startDiscovery = async (idea: string) => {
    setErrorMessage(null);
    setIsLoading(true);
    setLoadingMessage("Agent 1: Deconstructing idea & formulating clarifying questions...");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: 1,
          data: { rawIdea: idea },
          apiKey,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || !data.result) {
        throw new Error(data.error || "The discovery request did not return a result.");
      }
      setProject((prev) => ({
        ...prev,
        stage1: data.result as Stage1Discovery,
        currentStage: 1,
        completedStages: [1],
        updatedAt: new Date().toISOString(),
      }));
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Discovery failed. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const updateQuestionOption = (qId: string, option: string) => {
    setProject((prev) => {
      if (!prev.stage1) return prev;
      const updatedQuestions = prev.stage1.clarifyingQuestions.map((q) =>
        q.id === qId ? { ...q, selectedOption: option } : q
      );
      return {
        ...prev,
        stage1: {
          ...prev.stage1,
          clarifyingQuestions: updatedQuestions,
        },
      };
    });
  };

  const confirmDiscoveryAndProceed = async () => {
    if (!project.stage1) return;
    setErrorMessage(null);
    setIsLoading(true);
    setLoadingMessage("Agent 2: Orchestrating Brand Battle between 2 opposing positioning models...");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: 2,
          data: { stage1: project.stage1 },
          apiKey,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || !data.result) {
        throw new Error(data.error || "The positioning request did not return a result.");
      }
      setProject((prev) => ({
        ...prev,
        stage2: data.result as Stage2Positioning,
        currentStage: 2,
        completedStages: Array.from(new Set([...prev.completedStages, 1, 2])),
      }));
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Positioning failed. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const selectTerritory = (territory: "territoryA" | "territoryB" | "blend") => {
    setProject((prev) => {
      if (!prev.stage2) return prev;
      return {
        ...prev,
        stage2: {
          ...prev.stage2,
          selectedTerritoryId: territory,
        },
      };
    });
  };

  const proceedToStage3 = async () => {
    if (!project.stage1 || !project.stage2) return;
    setErrorMessage(null);
    setIsLoading(true);
    setLoadingMessage("Agent 3: Sculpting brand personality, voice guardrails & 4 naming territories...");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: 3,
          data: { stage1: project.stage1, stage2: project.stage2 },
          apiKey,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || !data.result) {
        throw new Error(data.error || "The identity request did not return a result.");
      }
      setProject((prev) => ({
        ...prev,
        stage3: data.result as Stage3Shape,
        currentStage: 3,
        completedStages: Array.from(new Set([...prev.completedStages, 1, 2, 3])),
      }));
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Identity shaping failed. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const selectNameIndex = (idx: number) => {
    setProject((prev) => {
      if (!prev.stage3) return prev;
      return {
        ...prev,
        stage3: {
          ...prev.stage3,
          selectedNameIndex: idx,
        },
      };
    });
  };

  const proceedToStage4 = async () => {
    if (!project.stage3) return;
    setErrorMessage(null);
    setIsLoading(true);
    setLoadingMessage("Agent 4: Designing 6-color palette, font pairing & dynamic SVG mark...");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: 4,
          data: { stage3: project.stage3 },
          apiKey,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || !data.result) {
        throw new Error(data.error || "The visual system request did not return a result.");
      }
      setProject((prev) => ({
        ...prev,
        stage4: data.result as Stage4Visual,
        currentStage: 4,
        completedStages: Array.from(new Set([...prev.completedStages, 1, 2, 3, 4])),
      }));
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Visual system generation failed. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const proceedToStage5 = async () => {
    if (!project.stage1 || !project.stage2 || !project.stage3 || !project.stage4) return;
    setErrorMessage(null);
    setIsLoading(true);
    setLoadingMessage("Agent 5: Ruthless Red Team Critic auditing brand for cliches & generic tropes...");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: 5,
          data: {
            stage1: project.stage1,
            stage2: project.stage2,
            stage3: project.stage3,
            stage4: project.stage4,
          },
          apiKey,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || !data.result) {
        throw new Error(data.error || "The critique request did not return a result.");
      }
      setProject((prev) => ({
        ...prev,
        stage5: data.result as Stage5Critique,
        currentStage: 5,
        completedStages: Array.from(new Set([...prev.completedStages, 1, 2, 3, 4, 5])),
      }));
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Brand critique failed. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const applyCritiqueUpgrades = () => {
    setProject((prev) => {
      if (!prev.stage5) return prev;
      return {
        ...prev,
        stage5: {
          ...prev.stage5,
          upgradesApplied: true,
          distinctivenessScore: Math.min(98, prev.stage5.distinctivenessScore + 6),
          antiGenericTier: "Exceptional",
        },
      };
    });
  };

  const proceedToStage6 = async () => {
    if (
      !project.stage1 ||
      !project.stage2 ||
      !project.stage3 ||
      !project.stage4 ||
      !project.stage5
    )
      return;
    setErrorMessage(null);
    setIsLoading(true);
    setLoadingMessage("Agent 6: Generating high-converting landing page hero, pitch & social launch pack...");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: 6,
          data: {
            stage1: project.stage1,
            stage2: project.stage2,
            stage3: project.stage3,
            stage4: project.stage4,
            stage5: project.stage5,
          },
          apiKey,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || !data.result) {
        throw new Error(data.error || "The delivery request did not return a result.");
      }

      setProject((prev) => ({
        ...prev,
        stage6: data.result as Stage6Deliver,
        currentStage: 6,
        completedStages: Array.from(new Set([...prev.completedStages, 1, 2, 3, 4, 5, 6])),
      }));
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore confetti if canvas not available
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Launch kit generation failed. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const resetProject = () => {
    if (confirm("Reset current brand session? All generated stages will be cleared.")) {
      localStorage.removeItem("brandforge_project");
      setProject(initialProject);
    }
  };

  return (
    <BrandContext.Provider
      value={{
        project,
        isLoading,
        loadingMessage,
        errorMessage,
        apiKey,
        setApiKey: saveApiKey,
        goToStage,
        startDiscovery,
        updateQuestionOption,
        confirmDiscoveryAndProceed,
        selectTerritory,
        proceedToStage3,
        selectNameIndex,
        proceedToStage4,
        proceedToStage5,
        proceedToStage6,
        resetProject,
        applyCritiqueUpgrades,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return ctx;
}
