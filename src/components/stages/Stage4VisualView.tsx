"use client";

import React, { useState } from "react";
import { useBrand } from "@/context/BrandContext";
import {
  Palette,
  Type,
  Shapes,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

export function Stage4VisualView() {
  const { project, isLoading, proceedToStage5, goToStage } = useBrand();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const stage4 = project.stage4;
  if (!stage4) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
        <p>Please complete Stage 3 (Shape Identity & Naming) first.</p>
        <button
          onClick={() => goToStage(3)}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
        >
          Return to Stage 3
        </button>
      </div>
    );
  }

  const { colorPalette, typography, logoDirection } = stage4;

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <Palette className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Stage 04: Visual Direction & System Tokens
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Color mood, typography pairing & generative mark.
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Strategy translates directly into visual weight. We establish a 6-tier color token hierarchy, purposeful typography pairings, and a geometric brand mark concept.
        </p>
      </div>

      {/* Color Palette Hierarchy */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <Palette className="h-4 w-4 text-indigo-400" />
          <span>Color Architecture (6 Design Tokens)</span>
        </h2>
        <p className="text-xs text-zinc-400 mb-4">
          Engineered for contrast, accessibility, and emotional resonance. Click any swatch to copy its hex code.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {colorPalette.map((color, i) => (
            <div
              key={i}
              onClick={() => copyToClipboard(color.hex)}
              className="group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-zinc-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="h-10 w-10 rounded-lg border border-white/10 shadow-md transition group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="rounded-md bg-zinc-900 px-2 py-0.5 text-[10px] font-mono text-zinc-400 group-hover:text-indigo-400 transition flex items-center gap-1">
                  {copiedHex === color.hex ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>{color.hex}</span>
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[9px] font-semibold uppercase text-zinc-400">
                  {color.role}
                </span>
                <span className="text-xs font-bold text-white">{color.name}</span>
              </div>
              <p className="mt-1.5 text-[11px] text-zinc-400 leading-snug line-clamp-2">
                {color.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography & Logo Mark Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Typography Pairing */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Type className="h-4 w-4" />
              <span>Typography Pairing</span>
            </div>
            <h3 className="text-base font-bold text-white">
              {typography.headingFont} + {typography.bodyFont}
            </h3>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              {typography.pairingRationale}
            </p>

            {/* Typography Live Specimens */}
            <div className="mt-5 space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">
                  Heading Specimen ({typography.headingFont})
                </span>
                <p className="text-xl font-bold tracking-tight text-white">
                  The future is forged by builders, not observers.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-900">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">
                  Body Specimen ({typography.bodyFont})
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Precision in typography signals respect for the reader. Clean kerning and generous line heights ensure high readability across both dense dashboards and marketing announcements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Mark & Symbolism */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Shapes className="h-4 w-4" />
              <span>Geometric Mark Direction</span>
            </div>
            <h3 className="text-base font-bold text-white">{logoDirection.concept}</h3>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              {logoDirection.symbolism}
            </p>

            {/* Preview Box */}
            <div className="mt-5 flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700/60 shadow-inner">
                <span className="font-mono text-2xl font-black text-indigo-400">
                  {logoDirection.monogramLetter}
                </span>
              </div>
              <div>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20">
                  Format: {logoDirection.svgShapeType.replace("_", " ")}
                </span>
                <p className="mt-1 text-xs text-zinc-300">
                  Rendered live as scalable SVG on the right-hand brand board.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proceed */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <span className="text-xs text-zinc-400">
          Visual Identity: <strong className="text-white">{colorPalette.length} tokens • {typography.headingFont}</strong>
        </span>
        <button
          onClick={proceedToStage5}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Red Team Auditing Brand...</span>
            </>
          ) : (
            <>
              <span>Run Red Team Anti-Generic Audit</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
