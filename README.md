# BrandForge AI

BrandForge AI is a working brand intelligence and launch system that I built independently as a solo developer. It turns a rough founder idea into a structured, critique-tested brand system and launch kit.

## Submission Answers

### What is the solution?

BrandForge AI is built for early-stage founders and creators who need to move from an unclear idea to a distinctive, usable brand. It runs a six-stage workflow: discovery, positioning battle, personality and naming, visual identity, red-team critique, and launch delivery. The final result includes a selected name, positioning, voice rules, logo direction, six-color design system, typography pairing, live brand preview, landing-page hero, elevator pitches, social copy, email copy, and exportable brand files.

### What makes it distinctive?

I built it as a reasoning pipeline rather than a single prompt. Each stage consumes the structured output of the previous stage. The Brand Battle forces two contrasting positioning directions, while the Red Team stage identifies generic language and replaces it with more specific alternatives. The final stage renders the generated brand as a live visual identity and landing-page preview instead of returning only a text document.

### Tech stack, models, and APIs

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS
- Google GenAI SDK with Gemini 2.5 Flash support
- Deterministic fallback reasoning engine for free offline demos
- Lucide React, Framer Motion, and canvas-confetti
- Next.js API route at `/api/generate`
- LocalStorage persistence for the current brand session
- Deterministic fallback engine for offline demos and no-key usage

### Prompt architecture and AI workflow

The workflow uses six separate structured prompts instead of one giant prompt:

1. **Discover:** extracts the problem, audience, category, and three founder questions.
2. **Battle:** produces two opposing positioning territories with risks and advantages.
3. **Shape:** creates personality traits, voice rules, and four naming directions.
4. **Visualize:** creates six semantic color tokens, typography, and logo geometry.
5. **Challenge:** audits positioning, naming, voice, and visuals for cliches and weak claims.
6. **Deliver:** produces the final pitch, hero copy, social campaign, email, and brand guide.

Every stage returns JSON-shaped data mapped to TypeScript stage contracts. The browser sends the current stage payload and previous structured outputs to `/api/generate`. If no provider key is configured, the same workflow runs through a deterministic domain-specific mock engine.

### Agents, chains, and evaluation

BrandForge uses six sequential specialist agents: discovery strategist, positioning strategist, naming and voice designer, visual identity architect, red-team critic, and launch copywriter. Stage 5 evaluates distinctiveness and audience alignment on a 0-100 scale, lists detected cliches, and supplies replacement copy. The API validates stage numbers, required dependencies, malformed JSON, and blank ideas before running a stage.

## Run Locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

For production validation:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd run build
```

The app works without an API key using its deterministic fallback engine. A Gemini API key can be configured through the app; never commit secrets.

## Project Links

- GitHub: https://github.com/Muppukokila/BrandForgeSAI
- Live product: Add the deployed public URL after deployment.
- Instagram project post: Add your own public post or reel URL.
- LinkedIn project post: Add your own public post URL.

## Solo Contribution

I built this project alone, including the product concept, six-stage orchestration, prompts, API route, fallback reasoning engine, state management, live logo and color preview, final launch simulator, export flow, validation, and testing.
