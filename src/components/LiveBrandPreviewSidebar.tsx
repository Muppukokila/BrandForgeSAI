"use client";

import React, { useState } from "react";
import { useBrand } from "@/context/BrandContext";
import {
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  Palette,
  Type,
  TrendingUp,
} from "lucide-react";

export function LiveBrandPreviewSidebar() {
  const { project } = useBrand();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const brandName =
    project.stage3?.names[project.stage3.selectedNameIndex]?.name ||
    (project.stage1 ? "Unamed Project" : "Your Brand");

  const tagline =
    project.stage3?.names[project.stage3.selectedNameIndex]?.tagline ||
    project.stage2?.territoryA?.taglineHypothesis ||
    "Identity In Progress...";

  const archetype =
    project.stage2?.selectedTerritoryId === "territoryB"
      ? project.stage2?.territoryB.archetype
      : project.stage2?.territoryA.archetype || "Discovering Archetype";

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const logoType = project.stage4?.logoDirection.svgShapeType || "connected_nodes";
  const initialLetter = brandName.charAt(0).toUpperCase() || "B";
  const primaryHex = project.stage4?.colorPalette[0]?.hex || "#6366F1";
  const accentHex = project.stage4?.colorPalette[2]?.hex || "#10B981";

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-4">
      <div className="sticky top-20 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Live Brand Board
            </h2>
          </div>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-400">
            {project.completedStages.length}/6 Stages
          </span>
        </div>

        {/* Dynamic Logo Mark & Identity Header */}
        <div className="mt-4 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-4 text-center">
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-700/50 shadow-inner relative overflow-hidden group">
            <svg
              className="h-14 w-14 transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" rx="20" fill="#18181B" />
              {logoType === "connected_nodes" && (
                <>
                  <circle cx="30" cy="70" r="10" fill={primaryHex} />
                  <circle cx="70" cy="70" r="10" fill={primaryHex} />
                  <circle cx="50" cy="30" r="12" fill={accentHex} />
                  <line x1="30" y1="70" x2="50" y2="30" stroke={primaryHex} strokeWidth="5" />
                  <line x1="70" y1="70" x2="50" y2="30" stroke={primaryHex} strokeWidth="5" />
                  <line x1="30" y1="70" x2="70" y2="70" stroke={accentHex} strokeWidth="4" />
                </>
              )}
              {logoType === "geometric_monogram" && (
                <>
                  <polygon points="50,15 85,80 15,80" stroke={primaryHex} strokeWidth="6" fill="none" />
                  <text
                    x="50"
                    y="65"
                    fontSize="34"
                    fontWeight="bold"
                    fill={accentHex}
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {initialLetter}
                  </text>
                </>
              )}
              {logoType === "minimal_abstract" && (
                <>
                  <path d="M 25 75 Q 50 15 75 75" stroke={primaryHex} strokeWidth="8" fill="none" strokeLinecap="round" />
                  <circle cx="50" cy="40" r="8" fill={accentHex} />
                </>
              )}
              {logoType === "bold_badge" && (
                <>
                  <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill={primaryHex} opacity="0.2" stroke={primaryHex} strokeWidth="4" />
                  <text
                    x="50"
                    y="60"
                    fontSize="36"
                    fontWeight="900"
                    fill="#FFFFFF"
                    textAnchor="middle"
                  >
                    {initialLetter}
                  </text>
                </>
              )}
            </svg>
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{ backgroundColor: primaryHex }}
            />
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight">{brandName}</h3>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2 italic">
            &ldquo;{tagline}&rdquo;
          </p>
          {project.stage2 && (
            <span className="mt-2.5 inline-block rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-medium text-indigo-300 border border-indigo-500/20">
              {archetype}
            </span>
          )}
        </div>

        {/* Distinctiveness Score Gauge (Stage 5) */}
        {project.stage5 && (
          <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Anti-Generic Score
              </span>
              <span className="text-xs font-bold text-emerald-400">
                {project.stage5.distinctivenessScore}/100
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${project.stage5.distinctivenessScore}%` }}
              />
            </div>
            <p className="mt-1.5 text-[10px] text-zinc-400">
              Tier: <strong className="text-emerald-300">{project.stage5.antiGenericTier}</strong> (Startup Cliches Filtered)
            </p>
          </div>
        )}

        {/* Color Palette Grid */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-zinc-300">
            <Palette className="h-3.5 w-3.5 text-indigo-400" />
            <span>Design Tokens (Colors)</span>
          </div>

          {project.stage4 ? (
            <div className="grid grid-cols-3 gap-2">
              {project.stage4.colorPalette.map((color, i) => (
                <button
                  key={i}
                  onClick={() => copyToClipboard(color.hex)}
                  className="group relative flex flex-col items-center rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-left hover:border-zinc-700 transition"
                  title={`Click to copy: ${color.name} (${color.hex})`}
                >
                  <div
                    className="h-6 w-full rounded-md shadow-sm mb-1.5 border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] font-bold text-zinc-300 truncate w-full text-center">
                    {color.name}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 group-hover:text-indigo-400 transition">
                    {copiedHex === color.hex ? "Copied!" : color.hex}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-800 p-3 text-center text-xs text-zinc-500">
              Generated in Stage 4 (Visual System)
            </div>
          )}
        </div>

        {/* Typography Preview */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-zinc-300">
            <Type className="h-3.5 w-3.5 text-indigo-400" />
            <span>Typography Pair</span>
          </div>
          {project.stage4 ? (
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs">
              <div className="flex justify-between items-center pb-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-500">Heading:</span>
                <span className="font-semibold text-indigo-300">
                  {project.stage4.typography.headingFont}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1.5">
                <span className="text-zinc-500">Body:</span>
                <span className="font-semibold text-zinc-300">
                  {project.stage4.typography.bodyFont}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-800 p-3 text-center text-xs text-zinc-500">
              Pending Stage 4 configuration
            </div>
          )}
        </div>

        {/* Audience Signal */}
        {project.stage1 && (
          <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-400 font-medium mb-1">
              <TrendingUp className="h-3 w-3 text-indigo-400" />
              <span>Target Persona</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-snug line-clamp-2">
              {project.stage1.targetAudience.primary}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
