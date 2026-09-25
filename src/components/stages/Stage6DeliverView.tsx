"use client";

import React, { useState } from "react";
import { useBrand } from "@/context/BrandContext";
import { BrandIdentityPreview } from "@/components/BrandIdentityPreview";
import {
  Rocket,
  Share2,
  Copy,
  Check,
  Globe,
  MessageSquare,
  Send,
  Mail,
  FileText,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface Stage6DeliverViewProps {
  onOpenExport: () => void;
}

export function Stage6DeliverView({ onOpenExport }: Stage6DeliverViewProps) {
  const { project, goToStage } = useBrand();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const stage6 = project.stage6;
  if (!stage6) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
        <p>Please complete Stage 5 (Red Team Audit) first.</p>
        <button
          onClick={() => goToStage(5)}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
        >
          Return to Stage 5
        </button>
      </div>
    );
  }

  const { elevatorPitch, landingPageHero, socialLaunchCampaign } = stage6;

  const primaryColor = project.stage4?.colorPalette[0]?.hex || "#4F46E5";

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 text-emerald-400 mb-2">
          <Rocket className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Stage 06: Launch-Ready Brand Kit & Deployment Assets
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Everything you need to launch today.
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          From a rough founder sentence to a coherent, launch-ready brand operating system. Preview your live hero section, copy your launch announcements, or export the complete brand guidebook.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition"
          >
            <Share2 className="h-4 w-4" />
            <span>Export Brand Kit (PDF / Markdown / JSON)</span>
          </button>
        </div>
      </div>

      <BrandIdentityPreview
        stage3={project.stage3}
        stage4={project.stage4}
        stage6={stage6}
      />

      {/* Simulated Live Landing Page Hero Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-6">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Live Landing Page Simulation
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
        </div>

        {/* Live Mockup Container */}
        <div className="mx-auto max-w-2xl py-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-medium text-indigo-300 mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{landingPageHero.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {landingPageHero.headline}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto">
            {landingPageHero.subheadline}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              style={{ backgroundColor: primaryColor }}
              className="w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
            >
              {landingPageHero.ctaPrimary}
            </button>
            <button className="w-full sm:w-auto rounded-xl border border-zinc-700 bg-zinc-900/80 px-6 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 transition">
              {landingPageHero.ctaSecondary}
            </button>
          </div>

          <p className="mt-5 text-xs text-zinc-400">
            ✓ {landingPageHero.socialProofHook}
          </p>
        </div>
      </div>

      {/* Elevator Pitch Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 10-Word Pitch */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                10-Word Crisp Pitch
              </span>
              <button
                onClick={() => handleCopy(elevatorPitch.tenWords, "tenWords")}
                className="text-zinc-500 hover:text-white transition flex items-center gap-1 text-xs"
              >
                {copiedSection === "tenWords" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copiedSection === "tenWords" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-base font-bold text-white leading-snug">
              &ldquo;{elevatorPitch.tenWords}&rdquo;
            </p>
          </div>
          <p className="mt-4 text-[11px] text-zinc-400">
            Ideal for bio tags, header subtitles, and elevator intros.
          </p>
        </div>

        {/* 30-Second Investor/Founder Pitch */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                30-Second Founder Pitch
              </span>
              <button
                onClick={() => handleCopy(elevatorPitch.thirtySeconds, "thirtySeconds")}
                className="text-zinc-500 hover:text-white transition flex items-center gap-1 text-xs"
              >
                {copiedSection === "thirtySeconds" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copiedSection === "thirtySeconds" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed italic bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/80">
              &ldquo;{elevatorPitch.thirtySeconds}&rdquo;
            </p>
          </div>
          <p className="mt-3 text-[11px] text-zinc-400">
            Calibrated for demo days, investor calls, and launch keynotes.
          </p>
        </div>
      </div>

      {/* Social Launch Campaign Deck */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Rocket className="h-4 w-4 text-emerald-400" />
          <span>Multi-Channel Social Launch Copy</span>
        </h3>

        <div className="space-y-4">
          {/* Twitter / X Opener */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-sky-400">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>X / Twitter Thread Opener</span>
              </span>
              <button
                onClick={() => handleCopy(socialLaunchCampaign.twitterThreadOpener, "twitter")}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copiedSection === "twitter" ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>{copiedSection === "twitter" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed">
              {socialLaunchCampaign.twitterThreadOpener}
            </pre>
          </div>

          {/* LinkedIn Announcement */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                <Send className="h-3.5 w-3.5" />
                <span>LinkedIn Founder Announcement</span>
              </span>
              <button
                onClick={() => handleCopy(socialLaunchCampaign.linkedInAnnouncement, "linkedin")}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copiedSection === "linkedin" ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>{copiedSection === "linkedin" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed">
              {socialLaunchCampaign.linkedInAnnouncement}
            </pre>
          </div>

          {/* Launch Email */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <Mail className="h-3.5 w-3.5" />
                <span>Early Access Launch Email</span>
              </span>
              <button
                onClick={() => handleCopy(socialLaunchCampaign.launchEmailBody, "email")}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copiedSection === "email" ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>{copiedSection === "email" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="mb-2 text-xs text-zinc-400">
              <strong>Subject:</strong> {socialLaunchCampaign.launchEmailSubject}
            </div>
            <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed">
              {socialLaunchCampaign.launchEmailBody}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
