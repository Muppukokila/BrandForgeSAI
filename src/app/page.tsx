"use client";

import React, { useState } from "react";
import { useBrand } from "@/context/BrandContext";
import { Header } from "@/components/Header";
import { StageProgressBar } from "@/components/StageProgressBar";
import { LiveBrandPreviewSidebar } from "@/components/LiveBrandPreviewSidebar";
import { Stage1DiscoveryView } from "@/components/stages/Stage1DiscoveryView";
import { Stage2PositioningView } from "@/components/stages/Stage2PositioningView";
import { Stage3ShapeView } from "@/components/stages/Stage3ShapeView";
import { Stage4VisualView } from "@/components/stages/Stage4VisualView";
import { Stage5CritiqueView } from "@/components/stages/Stage5CritiqueView";
import { Stage6DeliverView } from "@/components/stages/Stage6DeliverView";
import { ExportModal } from "@/components/ExportModal";
import { AlertCircle, Loader2, ExternalLink } from "lucide-react";

export default function Home() {
  const { project, isLoading, loadingMessage, errorMessage } = useBrand();
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Top Navigation */}
      <Header onOpenExport={() => setIsExportOpen(true)} />

      {/* Progress Bar */}
      <StageProgressBar />

      {/* Main Workspace Layout */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Loading Overlay / Toast */}
        {isLoading && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-indigo-500/30 bg-indigo-950/40 p-4 backdrop-blur-md shadow-lg animate-pulse">
            <Loader2 className="h-5 w-5 animate-spin text-indigo-400 shrink-0" />
            <div className="flex-1">
              <span className="text-xs font-semibold text-indigo-300">
                Cognitive Reasoning Engine Active
              </span>
              <p className="text-xs text-zinc-200 mt-0.5">{loadingMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-sm text-rose-100 shadow-lg">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
            <div>
              <p className="font-semibold text-rose-300">Generation failed</p>
              <p className="mt-0.5 text-rose-100/80">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Active Stage Workbench (Left Panel) */}
          <div className="flex-1 w-full min-w-0">
            {project.currentStage === 1 && <Stage1DiscoveryView />}
            {project.currentStage === 2 && <Stage2PositioningView />}
            {project.currentStage === 3 && <Stage3ShapeView />}
            {project.currentStage === 4 && <Stage4VisualView />}
            {project.currentStage === 5 && <Stage5CritiqueView />}
            {project.currentStage === 6 && (
              <Stage6DeliverView onOpenExport={() => setIsExportOpen(true)} />
            )}
          </div>

          {/* Persistent Live Brand Board (Right Panel) */}
          <LiveBrandPreviewSidebar />
        </div>
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-6 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            BrandForge AI • Built for the <strong>Inkloom Hackathon</strong> (Participant Edition)
          </p>
          <div className="flex items-center gap-3 text-zinc-400">
            <span>Sponsor:</span>
            <a
              href="https://inkloom.art"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
            >
              inkloom.art <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-zinc-600">•</span>
            <span className="font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              Code: INKLOOM-WCC
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
