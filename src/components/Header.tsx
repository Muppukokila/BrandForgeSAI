"use client";

import React, { useState } from "react";
import { useBrand } from "@/context/BrandContext";
import { Sparkles, Key, RotateCcw, Share2, ShieldCheck, ExternalLink } from "lucide-react";

interface HeaderProps {
  onOpenExport: () => void;
}

export function Header({ onOpenExport }: HeaderProps) {
  const { apiKey, setApiKey, resetProject, project } = useBrand();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSaveKey = () => {
    setApiKey(tempKey.trim());
    setShowKeyModal(false);
  };

  const hasCompletedAll = project.completedStages.includes(6);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-lg">
                  Brand<span className="text-indigo-400">Forge</span> AI
                </span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-400 border border-indigo-500/20">
                  v2.5
                </span>
              </div>
              <p className="hidden text-xs text-zinc-400 sm:block">
                Autonomous Brand Intelligence & Launch OS
              </p>
            </div>
          </div>

          {/* Sponsor Tag & Sponsor Code */}
          <div className="hidden md:flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-950/30 px-3 py-1.5 text-xs text-purple-200">
            <span className="font-semibold text-purple-300">Inkloom Hackathon</span>
            <span className="text-zinc-500">•</span>
            <span className="font-mono text-xs font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
              INKLOOM-WCC
            </span>
            <a
              href="https://inkloom.art"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-200 flex items-center gap-1 transition"
            >
              inkloom.art <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyModal(true)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
              title="Configure Gemini API Key"
            >
              <Key className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden sm:inline">
                {apiKey ? "API Key Configured" : "AI Mode"}
              </span>
              {apiKey && <ShieldCheck className="h-3 w-3 text-emerald-400" />}
            </button>

            {project.stage1 && (
              <button
                onClick={resetProject}
                className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-red-400 transition"
                title="Reset Brand Session"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              onClick={onOpenExport}
              disabled={!project.stage1}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition ${
                hasCompletedAll
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-400 hover:to-purple-500 shadow-indigo-500/20"
                  : project.stage1
                  ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                  : "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"
              }`}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Export Kit</span>
            </button>
          </div>
        </div>
      </header>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Engine Configuration</h3>
                <p className="text-xs text-zinc-400">Powered by Google Gemini 2.5 Flash</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-300 mb-4">
              BrandForge comes equipped with a smart fallback simulation engine ready for offline hackathon testing. To run live LLM inferences, insert your free Gemini API key below:
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Gemini API Key
              </label>
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 mb-5 text-[11px] text-zinc-400">
              💡 <span className="font-semibold text-zinc-300">Hackathon Tip:</span> If no key is entered, BrandForge seamlessly uses the deterministic domain-reasoning mock engine.
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="rounded-lg px-3.5 py-2 text-xs font-medium text-zinc-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
