"use client";

import React from "react";
import { useBrand } from "@/context/BrandContext";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Zap,
} from "lucide-react";

export function Stage5CritiqueView() {
  const {
    project,
    isLoading,
    applyCritiqueUpgrades,
    proceedToStage6,
    goToStage,
  } = useBrand();

  const stage5 = project.stage5;
  if (!stage5) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
        <p>Please complete Stage 4 (Visual System) first.</p>
        <button
          onClick={() => goToStage(4)}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
        >
          Return to Stage 4
        </button>
      </div>
    );
  }

  const {
    distinctivenessScore,
    antiGenericTier,
    clichesDetected,
    redTeamCritique,
    audienceAlignmentScore,
    upgradesApplied,
  } = stage5;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <ShieldAlert className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Stage 05: Red Team Anti-Generic Audit & Consistency Defense
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          The Anti-Generic Engine in action.
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Weak AI produces generic fluff like &ldquo;Empowering teams to collaborate seamlessly.&rdquo; Our Red Team Critic stress-tests every claim, flags overused startup tropes, and forces punchier, distinctive revisions.
        </p>
      </div>

      {/* Distinctiveness Scores Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Distinctiveness Gauge */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Distinctiveness Metric
            </span>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
              {antiGenericTier}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-black text-white">{distinctivenessScore}</span>
            <span className="text-sm text-zinc-400">/ 100</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
              style={{ width: `${distinctivenessScore}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Penalizes overused tropes (&ldquo;Uber for X&rdquo;, &ldquo;all-in-one&rdquo;, &ldquo;seamless&rdquo;) and rewards tangible operational promises.
          </p>
        </div>

        {/* Audience Alignment Gauge */}
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/15 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              Audience Resonance Index
            </span>
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-300">
              High Fit
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-black text-white">{audienceAlignmentScore}</span>
            <span className="text-sm text-zinc-400">/ 100</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-700"
              style={{ width: `${audienceAlignmentScore}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Measures psychological congruence between tone, visual weight, and the target builder persona.
          </p>
        </div>
      </div>

      {/* Red Team Brand Director Critique */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
          Red Team Evaluator Commentary
        </h3>
        <p className="text-sm text-zinc-200 leading-relaxed italic bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
          &ldquo;{redTeamCritique}&rdquo;
        </p>
      </div>

      {/* Cliche Interception & Before/After Upgrades */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Cliches Intercepted & Rewritten ({clichesDetected.length})</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Comparison of generic startup phrasing versus upgraded high-signal positioning.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {clichesDetected.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase text-zinc-400">
                  Target: {item.foundIn.replace("_", " ")}
                </span>
                <span className="text-[11px] font-medium text-amber-400/90 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Cliche Intercepted
                </span>
              </div>

              {/* Before vs After Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Before (Weak) */}
                <div className="rounded-lg border border-rose-500/20 bg-rose-950/15 p-3">
                  <span className="text-[10px] font-bold uppercase text-rose-400 block mb-1">
                    ✕ Weak / Generic Formulation:
                  </span>
                  <p className="text-zinc-300 font-mono text-[11px]">
                    &ldquo;{item.originalText}&rdquo;
                  </p>
                  <p className="mt-2 text-[10px] text-zinc-400 italic">
                    Reason: {item.whyItIsWeak}
                  </p>
                </div>

                {/* After (Upgraded) */}
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/15 p-3">
                  <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">
                    ✓ High-Signal Replacement:
                  </span>
                  <p className="text-emerald-100 font-semibold text-[11px]">
                    &ldquo;{item.replacementBetterText}&rdquo;
                  </p>
                  <p className="mt-2 text-[10px] text-emerald-300/80">
                    High specificity, concrete mechanics, zero tech jargon.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!upgradesApplied && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={applyCritiqueUpgrades}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/40 transition"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Apply Anti-Generic Upgrades (+6 Score Boost)</span>
            </button>
          </div>
        )}
      </div>

      {/* Proceed */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <span className="text-xs text-zinc-400">
          Critique Status: <strong className="text-emerald-400">Passed Quality Guardrails</strong>
        </span>
        <button
          onClick={proceedToStage6}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Generating Launch Kit & Assets...</span>
            </>
          ) : (
            <>
              <span>Finalize & Deliver Launch Kit</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
