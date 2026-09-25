"use client";

import React from "react";
import { useBrand } from "@/context/BrandContext";
import { StageNumber } from "@/types/brand";
import {
  Compass,
  Swords,
  Feather,
  Palette,
  ShieldAlert,
  Rocket,
  Check,
} from "lucide-react";

interface StepConfig {
  number: StageNumber;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepConfig[] = [
  { number: 1, label: "1. Discover & Probe", shortLabel: "Discover", icon: Compass },
  { number: 2, label: "2. Brand Battle", shortLabel: "Battle", icon: Swords },
  { number: 3, label: "3. Shape Identity", shortLabel: "Shape", icon: Feather },
  { number: 4, label: "4. Visual System", shortLabel: "Visuals", icon: Palette },
  { number: 5, label: "5. Red Team Audit", shortLabel: "Audit", icon: ShieldAlert },
  { number: 6, label: "6. Deliver & Launch", shortLabel: "Launch", icon: Rocket },
];

export function StageProgressBar() {
  const { project, goToStage } = useBrand();

  return (
    <div className="w-full border-b border-zinc-800/80 bg-zinc-950/40 py-3 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {STEPS.map((step, idx) => {
            const isCurrent = project.currentStage === step.number;
            const isCompleted = project.completedStages.includes(step.number);
            const isClickable = isCompleted || step.number <= (Math.max(...project.completedStages, 1));
            const Icon = step.icon;

            return (
              <React.Fragment key={step.number}>
                <button
                  disabled={!isClickable}
                  onClick={() => isClickable && goToStage(step.number)}
                  className={`group flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition text-left ${
                    isCurrent
                      ? "bg-indigo-600/15 border border-indigo-500/40 text-white shadow-sm shadow-indigo-500/10"
                      : isCompleted
                      ? "bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white cursor-pointer"
                      : "opacity-40 cursor-not-allowed text-zinc-500"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition ${
                      isCurrent
                        ? "bg-indigo-600 text-white shadow"
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {isCompleted && !isCurrent ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p
                      className={`text-xs font-medium leading-none ${
                        isCurrent ? "text-indigo-300 font-semibold" : "text-zinc-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    <span className="text-[10px] text-zinc-500">
                      {isCurrent ? "In Progress" : isCompleted ? "Completed" : "Queued"}
                    </span>
                  </div>
                  <span className="text-xs font-medium md:hidden">{step.shortLabel}</span>
                </button>

                {idx < STEPS.length - 1 && (
                  <div
                    className={`h-[1px] flex-1 max-w-[28px] sm:max-w-[48px] transition-colors ${
                      isCompleted ? "bg-emerald-500/40" : "bg-zinc-800"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
