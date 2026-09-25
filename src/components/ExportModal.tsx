"use client";

import React, { useState } from "react";
import { useBrand } from "@/context/BrandContext";
import {
  X,
  Download,
  FileCode,
  FileText,
  Printer,
  Check,
  Share2,
} from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { project } = useBrand();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const brandName =
    project.stage3?.names[project.stage3.selectedNameIndex]?.name || "Brand";

  const generateMarkdown = () => {
    return (
      project.stage6?.brandGuidelinesSummaryMarkdown ||
      `# ${brandName} Brand Book\n\nGenerated via BrandForge AI.\n\n## Core Problem\n${
        project.stage1?.coreProblem || ""
      }\n\n## Value Proposition\n${
        project.stage2?.territoryA?.valueProposition || ""
      }\n`
    );
  };

  const generateTokensJSON = () => {
    const tokens = {
      brand: brandName,
      tagline: project.stage3?.names[project.stage3.selectedNameIndex]?.tagline,
      colors: project.stage4?.colorPalette || [],
      typography: project.stage4?.typography || {},
      voice: project.stage3?.toneOfVoice || {},
      antiGenericScore: project.stage5?.distinctivenessScore || 0,
      generatedAt: new Date().toISOString(),
    };
    return JSON.stringify(tokens, null, 2);
  };

  const handleDownloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    setTimeout(() => setCopiedType(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Export {brandName} Brand Package
              </h3>
              <p className="text-xs text-zinc-400">
                Production-ready guidelines, tokens & assets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 3 Export Formats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Format 1: Markdown Guidebook */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col justify-between">
            <div>
              <FileText className="h-6 w-6 text-indigo-400 mb-2" />
              <h4 className="text-xs font-bold text-white">Brand Book (MD)</h4>
              <p className="text-[11px] text-zinc-400 mt-1">
                Complete strategy, tone rules, and identity documentation in Markdown.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() =>
                  handleDownloadFile(
                    generateMarkdown(),
                    `${brandName.toLowerCase()}-brand-book.md`,
                    "text/markdown"
                  )
                }
                className="flex-1 rounded-lg bg-zinc-800 py-1.5 text-[11px] font-semibold text-zinc-200 hover:bg-zinc-700 flex items-center justify-center gap-1"
              >
                <Download className="h-3 w-3" />
                <span>Save</span>
              </button>
              <button
                onClick={() => handleCopy(generateMarkdown(), "md")}
                className="rounded-lg border border-zinc-800 p-1.5 text-zinc-400 hover:text-white"
                title="Copy markdown"
              >
                {copiedType === "md" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Format 2: JSON Design Tokens */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col justify-between">
            <div>
              <FileCode className="h-6 w-6 text-purple-400 mb-2" />
              <h4 className="text-xs font-bold text-white">Design Tokens (JSON)</h4>
              <p className="text-[11px] text-zinc-400 mt-1">
                Color hex codes, typography weights, and system variables for developers.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() =>
                  handleDownloadFile(
                    generateTokensJSON(),
                    `${brandName.toLowerCase()}-tokens.json`,
                    "application/json"
                  )
                }
                className="flex-1 rounded-lg bg-zinc-800 py-1.5 text-[11px] font-semibold text-zinc-200 hover:bg-zinc-700 flex items-center justify-center gap-1"
              >
                <Download className="h-3 w-3" />
                <span>Save</span>
              </button>
              <button
                onClick={() => handleCopy(generateTokensJSON(), "json")}
                className="rounded-lg border border-zinc-800 p-1.5 text-zinc-400 hover:text-white"
                title="Copy JSON"
              >
                {copiedType === "json" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Format 3: Print / PDF */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col justify-between">
            <div>
              <Printer className="h-6 w-6 text-emerald-400 mb-2" />
              <h4 className="text-xs font-bold text-white">Print / PDF Kit</h4>
              <p className="text-[11px] text-zinc-400 mt-1">
                Directly print or save a PDF brand sheet using your browser&apos;s engine.
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => window.print()}
                className="w-full rounded-lg bg-zinc-800 py-1.5 text-[11px] font-semibold text-zinc-200 hover:bg-zinc-700 flex items-center justify-center gap-1"
              >
                <Printer className="h-3 w-3" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sponsor Acknowledgment & Submission Reminder */}
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-4 text-xs text-indigo-300">
          <p className="font-semibold text-white mb-1">
            Built for Inkloom Hackathon 2026
          </p>
          <p className="text-zinc-400 text-[11px]">
            Don&apos;t forget to include the credit code <span className="font-mono text-amber-300">INKLOOM-WCC</span> and mention <span className="text-indigo-300">inkloom.art</span> in your submission and social media project posts.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
