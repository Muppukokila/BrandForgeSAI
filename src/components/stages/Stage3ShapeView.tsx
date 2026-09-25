"use client";

import React from "react";
import { useBrand } from "@/context/BrandContext";
import {
  Feather,
  Sparkles,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Globe,
  Check,
} from "lucide-react";

export function Stage3ShapeView() {
  const {
    project,
    isLoading,
    selectNameIndex,
    proceedToStage4,
    goToStage,
  } = useBrand();

  const stage3 = project.stage3;
  if (!stage3) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
        <p>Please complete Stage 2 (Brand Battle) first.</p>
        <button
          onClick={() => goToStage(2)}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
        >
          Return to Stage 2
        </button>
      </div>
    );
  }

  const { personalityTraits, traitsToAvoid, toneOfVoice, names, selectedNameIndex } = stage3;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <Feather className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Stage 03: Shape Personality, Voice & Naming Matrix
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Define character traits and select a memorable name.
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          A brand is a specific behavioral personality, not just a logo. We establish traits justified against your audience, traits to avoid, tone guardrails, and 4 distinct naming directions.
        </p>
      </div>

      {/* Naming Selection Grid (Top Priority Interaction) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Select Brand Name Direction (4 Linguistic Territories)</span>
          </h2>
          <span className="text-xs text-zinc-500">Click to select active name</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {names.map((item, idx) => {
            const isSelected = selectedNameIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => selectNameIndex(idx)}
                className={`cursor-pointer rounded-2xl border p-5 transition-all relative ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-950/20 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500"
                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold text-white">
                    <CheckCircle2 className="h-3 w-3" />
                    Selected
                  </div>
                )}

                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
                    {item.style}
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-white">{item.name}</h3>
                <p className="mt-1 text-xs text-indigo-300 font-medium italic">
                  &ldquo;{item.tagline}&rdquo;
                </p>

                <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                  {item.rationale}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                  <Globe className="h-3 w-3 text-zinc-400" />
                  <span>{item.domainFeasibilityNote}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personality Traits & Avoid Traits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Personality Traits */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Personality Traits (Audience Calibrated)</span>
          </h3>
          <div className="space-y-3">
            {personalityTraits.map((t, i) => (
              <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3">
                <span className="text-xs font-bold text-emerald-400">{t.trait}</span>
                <p className="mt-1 text-xs text-zinc-400 leading-snug">{t.justification}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traits to Avoid */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            <span>Traits to Actively Avoid</span>
          </h3>
          <div className="space-y-3">
            {traitsToAvoid.map((t, i) => (
              <div key={i} className="rounded-xl border border-rose-500/10 bg-rose-950/10 p-3">
                <span className="text-xs font-bold text-rose-400">{t.trait}</span>
                <p className="mt-1 text-xs text-zinc-400 leading-snug">{t.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tone of Voice & Rules */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sliders className="h-4 w-4" />
          <span>Tone of Voice Modulation</span>
        </div>

        <p className="text-xs text-zinc-300 italic mb-6">
          &ldquo;{toneOfVoice.voiceSummary}&rdquo;
        </p>

        {/* Sliders Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">Formality</span>
              <span className="font-bold text-white">{toneOfVoice.formality}/10</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-indigo-500"
                style={{ width: `${toneOfVoice.formality * 10}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">Boldness</span>
              <span className="font-bold text-white">{toneOfVoice.boldness}/10</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-rose-500"
                style={{ width: `${toneOfVoice.boldness * 10}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">Warmth</span>
              <span className="font-bold text-white">{toneOfVoice.warmth}/10</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${toneOfVoice.warmth * 10}%` }}
              />
            </div>
          </div>
        </div>

        {/* Concrete Do and Don't rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
              ✓ Voice Rules (Say This)
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {toneOfVoice.rules.do.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-rose-500/20 bg-rose-950/15 p-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-2">
              ✕ Voice Restrictions (Never Say This)
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {toneOfVoice.rules.dont.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Proceed */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <span className="text-xs text-zinc-400">
          Current Selection: <strong className="text-white">{names[selectedNameIndex]?.name}</strong>
        </span>
        <button
          onClick={proceedToStage4}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Architecting Visual System...</span>
            </>
          ) : (
            <>
              <span>Lock Name & Design Visuals</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
