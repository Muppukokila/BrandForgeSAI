"use client";

import React from "react";
import { Palette, Type, WandSparkles } from "lucide-react";
import { Stage3Shape, Stage4Visual, Stage6Deliver } from "@/types/brand";

interface BrandIdentityPreviewProps {
  stage3: Stage3Shape | null;
  stage4: Stage4Visual | null;
  stage6: Stage6Deliver;
}

function LogoMark({ stage4, letter }: { stage4: Stage4Visual | null; letter: string }) {
  const logoType = stage4?.logoDirection.svgShapeType || "connected_nodes";
  const primary = stage4?.colorPalette.find((color) => color.role === "primary")?.hex || "#4F46E5";
  const accent = stage4?.logoDirection.accentColor || stage4?.colorPalette.find((color) => color.role === "accent")?.hex || "#10B981";

  return (
    <svg viewBox="0 0 100 100" className="h-16 w-16" role="img" aria-label="Generated brand logo">
      <rect width="100" height="100" rx="24" fill="#09090B" />
      {logoType === "connected_nodes" && (
        <>
          <path d="M28 70 50 30l22 40H28Z" stroke={primary} strokeWidth="6" fill="none" />
          <circle cx="28" cy="70" r="9" fill={primary} />
          <circle cx="72" cy="70" r="9" fill={primary} />
          <circle cx="50" cy="30" r="11" fill={accent} />
        </>
      )}
      {logoType === "geometric_monogram" && (
        <>
          <polygon points="50,14 86,80 14,80" stroke={primary} strokeWidth="6" fill="none" />
          <text x="50" y="65" textAnchor="middle" fontSize="34" fontWeight="800" fill={accent}>{letter}</text>
        </>
      )}
      {logoType === "minimal_abstract" && (
        <>
          <path d="M24 76Q50 12 76 76" stroke={primary} strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="40" r="9" fill={accent} />
        </>
      )}
      {logoType === "bold_badge" && (
        <>
          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill={primary} opacity=".25" stroke={primary} strokeWidth="4" />
          <text x="50" y="62" textAnchor="middle" fontSize="36" fontWeight="900" fill="#FFFFFF">{letter}</text>
        </>
      )}
    </svg>
  );
}

export function BrandIdentityPreview({ stage3, stage4, stage6 }: BrandIdentityPreviewProps) {
  const brandName = stage3?.names[stage3.selectedNameIndex]?.name || "Your Brand";
  const tagline = stage3?.names[stage3.selectedNameIndex]?.tagline || "Identity in progress";
  const palette = stage4?.colorPalette || [];
  const background = palette.find((color) => color.role === "background")?.hex || "#FAFAFA";
  const surface = palette.find((color) => color.role === "surface")?.hex || "#F1F5F9";
  const text = palette.find((color) => color.role === "text")?.hex || "#0F172A";
  const primary = palette.find((color) => color.role === "primary")?.hex || "#4F46E5";
  const letter = stage4?.logoDirection.monogramLetter || brandName.charAt(0).toUpperCase();

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-4">
        <div className="flex items-center gap-2 text-amber-300">
          <WandSparkles className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Live Brand Identity Preview</span>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">Generated live</span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.25fr_.75fr]">
        <div className="p-5 sm:p-7" style={{ backgroundColor: background, color: text }}>
          <div className="flex items-center justify-between border-b pb-5" style={{ borderColor: `${text}22` }}>
            <div className="flex items-center gap-3">
              <LogoMark stage4={stage4} letter={letter} />
              <div>
                <p className="text-base font-black tracking-tight">{brandName}</p>
                <p className="text-[11px] opacity-60">{tagline}</p>
              </div>
            </div>
            <span className="hidden rounded-full px-3 py-1 text-[10px] font-bold sm:inline-block" style={{ backgroundColor: `${primary}18`, color: primary }}>Brand system</span>
          </div>

          <div className="max-w-xl py-10 sm:py-14">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[.18em]" style={{ color: primary }}>{stage6.landingPageHero.badge}</p>
            <h2 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">{stage6.landingPageHero.headline}</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed opacity-70">{stage6.landingPageHero.subheadline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-lg px-4 py-2.5 text-xs font-bold text-white shadow-lg" style={{ backgroundColor: primary }}>{stage6.landingPageHero.ctaPrimary}</span>
              <span className="rounded-lg border px-4 py-2.5 text-xs font-semibold" style={{ borderColor: `${text}33` }}>{stage6.landingPageHero.ctaSecondary}</span>
            </div>
          </div>
        </div>

        <div className="space-y-5 border-t border-zinc-200/10 p-5 sm:p-7 lg:border-l lg:border-t-0" style={{ backgroundColor: surface }}>
          <div className="flex items-center gap-2" style={{ color: text }}>
            <Palette className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Color system</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {palette.map((color) => (
              <div key={color.role} className="overflow-hidden rounded-lg border border-black/10 bg-white/50">
                <div className="h-10" style={{ backgroundColor: color.hex }} />
                <div className="p-2" style={{ color: text }}>
                  <p className="truncate text-[10px] font-bold">{color.name}</p>
                  <p className="font-mono text-[9px] opacity-60">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-black/10 pt-5" style={{ color: text }}>
            <div className="mb-3 flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Type pairing</span>
            </div>
            <p className="text-xl font-black tracking-tight">{stage4?.typography.headingFont || "Heading font"}</p>
            <p className="mt-1 text-sm opacity-65">{stage4?.typography.bodyFont || "Body font"}</p>
            <p className="mt-4 text-[11px] leading-relaxed opacity-60">{stage4?.logoDirection.concept || "Logo direction generated from your brand strategy."}</p>
          </div>
        </div>
      </div>
    </section>
  );
}