import { NextRequest, NextResponse } from "next/server";
import {
  runStage1,
  runStage2,
  runStage3,
  runStage4,
  runStage5,
  runStage6,
} from "@/lib/gemini";
import {
  Stage1Discovery,
  Stage2Positioning,
  Stage3Shape,
  Stage4Visual,
  Stage5Critique,
} from "@/types/brand";

interface GenerateBody {
  stage?: unknown;
  data?: {
    rawIdea?: unknown;
    stage1?: Stage1Discovery;
    stage2?: Stage2Positioning;
    stage3?: Stage3Shape;
    stage4?: Stage4Visual;
    stage5?: Stage5Critique;
  };
  apiKey?: unknown;
}

export async function POST(req: NextRequest) {
  try {
    let body: GenerateBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Request body must be a JSON object" }, { status: 400 });
    }
    const { stage, data, apiKey } = body;
    const customApiKey = typeof apiKey === "string" ? apiKey : undefined;

    if (typeof stage !== "number" || !Number.isInteger(stage) || stage < 1 || stage > 6) {
      return NextResponse.json({ error: "Stage must be an integer from 1 to 6" }, { status: 400 });
    }

    switch (stage) {
      case 1: {
        const { rawIdea } = data || {};
        if (typeof rawIdea !== "string" || !rawIdea.trim()) {
          return NextResponse.json({ error: "rawIdea is required for stage 1" }, { status: 400 });
        }
        const result = await runStage1(rawIdea.trim(), customApiKey);
        return NextResponse.json({ success: true, stage: 1, result });
      }

      case 2: {
        const { stage1 } = data || {};
        if (!stage1) {
          return NextResponse.json({ error: "stage1 data is required for stage 2" }, { status: 400 });
        }
        const result = await runStage2(stage1, customApiKey);
        return NextResponse.json({ success: true, stage: 2, result });
      }

      case 3: {
        const { stage1, stage2 } = data || {};
        if (!stage1 || !stage2) {
          return NextResponse.json({ error: "stage1 and stage2 data are required for stage 3" }, { status: 400 });
        }
        const result = await runStage3(stage1, stage2, customApiKey);
        return NextResponse.json({ success: true, stage: 3, result });
      }

      case 4: {
        const { stage3 } = data || {};
        if (!stage3) {
          return NextResponse.json({ error: "stage3 data is required for stage 4" }, { status: 400 });
        }
        const result = await runStage4(stage3, customApiKey);
        return NextResponse.json({ success: true, stage: 4, result });
      }

      case 5: {
        const { stage1, stage2, stage3, stage4 } = data || {};
        if (!stage1 || !stage2 || !stage3 || !stage4) {
          return NextResponse.json({ error: "Stages 1-4 are required for stage 5" }, { status: 400 });
        }
        const result = await runStage5(stage1, stage2, stage3, stage4, customApiKey);
        return NextResponse.json({ success: true, stage: 5, result });
      }

      case 6: {
        const { stage1, stage2, stage3, stage4, stage5 } = data || {};
        if (!stage1 || !stage2 || !stage3 || !stage4 || !stage5) {
          return NextResponse.json({ error: "Stages 1-5 are required for stage 6" }, { status: 400 });
        }
        const result = await runStage6(stage1, stage2, stage3, stage4, stage5, customApiKey);
        return NextResponse.json({ success: true, stage: 6, result });
      }

      default:
        return NextResponse.json({ error: `Unsupported stage ${stage}` }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error("API /api/generate error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
