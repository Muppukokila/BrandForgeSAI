"use client";

import React from "react";
import { useBrand } from "@/context/BrandContext";
import {
  Swords,
  Zap,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Flame,
  Crown,
} from "lucide-react";

export function Stage2PositioningView() {
  const {
    project,
    isLoading,
    selectTerritory,
    proceedToStage3,
    goToStage,
  } = useBrand();

  const stage2 = project.stage2;
  if (!stage2) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
        <p>Please complete Stage 1 (Discovery & Clarification) first.</p>
        <button
          onClick={() => goToStage(1)}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
        >
          Return to Stage 1
        </button>
      </div>
    );
  }

  const { territoryA, territoryB, selectedTerritoryId, strategicRecommendation } = stage2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <Swords className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Stage 02: Brand Battle (Divergent Strategic Positioning)
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Two divergent strategic paths. One wins.
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Weak startups settle for an uninspired middle ground. We stage a debate between two contrasting market postures so you can intentionally choose your brand&apos;s unfair competitive posture.
        </p>

        {/* AI Strategic Recommendation Banner */}
        <div className="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 text-xs text-indigo-200">
          <strong className="font-semibold text-indigo-300">💡 AI Strategist Insight:</strong>{" "}
          {strategicRecommendation}
        </div>
      </div>

      {/* The Two Competing Territories (Brand Battle Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Territory A */}
        <div
          onClick={() => selectTerritory("territoryA")}
          className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 relative flex flex-col justify-between ${
            selectedTerritoryId === "territoryA"
              ? "border-rose-500/80 bg-rose-950/15 shadow-xl shadow-rose-950/30 ring-1 ring-rose-500/50"
              : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 opacity-80 hover:opacity-100"
          }`}
        >
          {selectedTerritoryId === "territoryA" && (
            <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-rose-600 px-3 py-0.5 text-[11px] font-bold text-white shadow-md">
              <CheckCircle2 className="h-3 w-3" />
              Active Choice
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <Flame className="h-5 w-5" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Territory A • Insurgent Force
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{territoryA.territoryName}</h3>
            <p className="mt-1 text-xs font-semibold text-rose-300">
              Archetype: {territoryA.archetype}
            </p>

            <blockquote className="mt-4 rounded-lg border-l-2 border-rose-500/60 bg-zinc-950/60 p-3 text-xs italic text-zinc-300">
              &ldquo;{territoryA.taglineHypothesis}&rdquo;
            </blockquote>

            <div className="mt-5 space-y-3 text-xs">
              <div>
                <span className="font-bold text-zinc-300">Value Proposition:</span>
                <p className="text-zinc-400 mt-0.5 leading-relaxed">
                  {territoryA.valueProposition}
                </p>
              </div>

              <div>
                <span className="font-bold text-zinc-300">Unfair Advantage:</span>
                <p className="text-zinc-400 mt-0.5 leading-relaxed">
                  {territoryA.unfairAdvantage}
                </p>
              </div>

              <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/20 p-2.5">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Why It Wins:
                </span>
                <p className="text-emerald-200/80 mt-0.5">{territoryA.whyItWins}</p>
              </div>

              <div className="rounded-lg bg-amber-950/20 border border-amber-500/20 p-2.5">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Strategic Risk:
                </span>
                <p className="text-amber-200/80 mt-0.5">{territoryA.keyRisk}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800">
            <button
              type="button"
              className={`w-full rounded-xl py-2.5 text-xs font-semibold transition ${
                selectedTerritoryId === "territoryA"
                  ? "bg-rose-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {selectedTerritoryId === "territoryA" ? "Selected Territory" : "Choose Territory A"}
            </button>
          </div>
        </div>

        {/* Territory B */}
        <div
          onClick={() => selectTerritory("territoryB")}
          className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 relative flex flex-col justify-between ${
            selectedTerritoryId === "territoryB"
              ? "border-indigo-500/80 bg-indigo-950/15 shadow-xl shadow-indigo-950/30 ring-1 ring-indigo-500/50"
              : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 opacity-80 hover:opacity-100"
          }`}
        >
          {selectedTerritoryId === "territoryB" && (
            <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-0.5 text-[11px] font-bold text-white shadow-md">
              <CheckCircle2 className="h-3 w-3" />
              Active Choice
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Crown className="h-5 w-5" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Territory B • Prestige Architect
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{territoryB.territoryName}</h3>
            <p className="mt-1 text-xs font-semibold text-indigo-300">
              Archetype: {territoryB.archetype}
            </p>

            <blockquote className="mt-4 rounded-lg border-l-2 border-indigo-500/60 bg-zinc-950/60 p-3 text-xs italic text-zinc-300">
              &ldquo;{territoryB.taglineHypothesis}&rdquo;
            </blockquote>

            <div className="mt-5 space-y-3 text-xs">
              <div>
                <span className="font-bold text-zinc-300">Value Proposition:</span>
                <p className="text-zinc-400 mt-0.5 leading-relaxed">
                  {territoryB.valueProposition}
                </p>
              </div>

              <div>
                <span className="font-bold text-zinc-300">Unfair Advantage:</span>
                <p className="text-zinc-400 mt-0.5 leading-relaxed">
                  {territoryB.unfairAdvantage}
                </p>
              </div>

              <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/20 p-2.5">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Why It Wins:
                </span>
                <p className="text-emerald-200/80 mt-0.5">{territoryB.whyItWins}</p>
              </div>

              <div className="rounded-lg bg-amber-950/20 border border-amber-500/20 p-2.5">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Strategic Risk:
                </span>
                <p className="text-amber-200/80 mt-0.5">{territoryB.keyRisk}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800">
            <button
              type="button"
              className={`w-full rounded-xl py-2.5 text-xs font-semibold transition ${
                selectedTerritoryId === "territoryB"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {selectedTerritoryId === "territoryB" ? "Selected Territory" : "Choose Territory B"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm & Proceed Button */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <span className="text-xs text-zinc-400">
          Selected: <strong className="text-white">{selectedTerritoryId === "territoryA" ? territoryA.territoryName : territoryB.territoryName}</strong>
        </span>
        <button
          onClick={proceedToStage3}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Generating Identity & Names...</span>
            </>
          ) : (
            <>
              <span>Lock Position & Shape Identity</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
