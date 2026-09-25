"use client";

import React, { useState } from "react";
import { useBrand } from "@/context/BrandContext";
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  Users,
  Target,
  Lightbulb,
} from "lucide-react";

const EXAMPLE_IDEAS = [
  "An app that helps college students find hackathon teammates",
  "AI contract and invoice auditor for independent freelance developers",
  "Biohacking and cold plunge social club with biomarker tracking",
  "Micro-SaaS to convert GitHub issues into customer-facing changelogs",
];

export function Stage1DiscoveryView() {
  const {
    project,
    isLoading,
    startDiscovery,
    updateQuestionOption,
    confirmDiscoveryAndProceed,
  } = useBrand();

  const [inputIdea, setInputIdea] = useState(
    project.stage1?.rawIdea || ""
  );

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputIdea.trim() || isLoading) return;
    startDiscovery(inputIdea.trim());
  };

  const handleSelectExample = (idea: string) => {
    setInputIdea(idea);
    startDiscovery(idea);
  };

  const stage1 = project.stage1;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Stage 01: Adaptive Discovery & Problem Extraction
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Deconstruct the raw idea before branding.
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          The number one mistake is jumping straight to logos and catchy taglines. We first probe the root problem, pinpoint your exact customer, and stress-test your core assumptions.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmitIdea} className="mt-6 space-y-4">
          <div className="relative">
            <textarea
              rows={3}
              value={inputIdea}
              onChange={(e) => setInputIdea(e.target.value)}
              placeholder="Describe your raw product, startup, or community idea in 1-2 sentences..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
              <span className="font-medium text-zinc-500 mr-1 flex items-center gap-1">
                <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                Try an example:
              </span>
              {EXAMPLE_IDEAS.map((example, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectExample(example)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-indigo-500/50 hover:bg-zinc-800 hover:text-white transition"
                >
                  {example.split(" ")[0]} {example.split(" ")[1]}...
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!inputIdea.trim() || isLoading}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Probing Idea...</span>
                </>
              ) : (
                <>
                  <span>Analyze & Probe</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Stage 1 Results & Clarifying Questions */}
      {stage1 && (
        <div className="space-y-6">
          {/* Problem & Audience Extraction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold mb-2">
                <Target className="h-4 w-4" />
                <span>Extracted Core Problem</span>
              </div>
              <p className="text-sm font-medium text-zinc-200 leading-relaxed">
                {stage1.coreProblem}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
                <Users className="h-4 w-4" />
                <span>Target Audience & Pain Point</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {stage1.targetAudience.primary}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                <strong className="text-zinc-300">Visceral Pain:</strong> {stage1.targetAudience.painPoint}
              </p>
            </div>
          </div>

          {/* Adaptive Interview Questions */}
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/10 p-6 border-l-4 border-l-indigo-500">
            <div className="flex items-center gap-2 text-indigo-300 mb-1">
              <HelpCircle className="h-5 w-5" />
              <h3 className="text-base font-bold text-white">
                Adaptive Founder Interview (3 High-Stakes Questions)
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mb-6">
              Answer these questions to calibrate the AI reasoning before positioning. Your answers shape the upcoming brand battle.
            </p>

            <div className="space-y-5">
              {stage1.clarifyingQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/80 p-4"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400">
                      {idx + 1}
                    </span>
                    <div className="w-full">
                      <p className="text-sm font-semibold text-white">{q.question}</p>
                      <p className="mt-0.5 text-[11px] text-zinc-400 italic">{q.context}</p>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = q.selectedOption === opt;
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => updateQuestionOption(q.id, opt)}
                              className={`flex items-start gap-2 rounded-lg p-2.5 text-left text-xs transition border ${
                                isSelected
                                  ? "border-indigo-500 bg-indigo-600/20 text-white font-medium shadow-sm"
                                  : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                              }`}
                            >
                              <div
                                className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                                  isSelected
                                    ? "border-indigo-400 bg-indigo-500"
                                    : "border-zinc-600"
                                }`}
                              >
                                {isSelected && (
                                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                )}
                              </div>
                              <span className="leading-snug">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={confirmDiscoveryAndProceed}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Orchestrating Brand Battle...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Clarifications & Enter Brand Battle</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
