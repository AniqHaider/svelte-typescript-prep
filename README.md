# svelte-typescript-prep

> **Windows?** See [SETUP-WINDOWS.md](SETUP-WINDOWS.md).

100 multiple-choice questions (50 Svelte / 50 TypeScript, basic → mid) in a small Svelte 5 quiz app.
Every question has a self-contained explanation: why the right answer is right **and** why the tempting wrong ones fail.

```bash
bun install
bun run dev        # http://localhost:5174
bun run validate   # checks 100 questions, 4 distinct options each, explanations present
bun run check      # svelte-check (needs TypeScript 6 — svelte-check doesn't support TS 7 yet)
```

**Theory tabs** — *Svelte theory* and *TypeScript theory*: 16 (Svelte) and 15 (TypeScript) sections with a spoken script ("say it like this"), key points, code, likely follow-ups and pitfalls. Practice mode hides the script so you say it aloud first, then reveal. Content lives in `src/lib/theory/`.

**Quiz modes** — Practice (explanation shown immediately after each pick) · Exam (no feedback until the end, then a full review).
**Missed questions** are remembered in localStorage so you can retry only those.
Options are shuffled every attempt, so explanations never refer to A/B/C/D.

## Coverage
- **Svelte 5:** component structure, scoped CSS/:global, `$state` / `$state.raw` / `$state.snapshot`, `$derived(.by)`, `$effect` (cleanup, async pitfall), `$props` / `$bindable`, callback props, snippets & `{@render}`, blocks (`#if/#each/#await`), bindings, `bind:this`, actions, shared state in `.svelte.ts`, context, stores, lifecycle.
- **SvelteKit:** routing, `load` (universal vs server), layouts, `+server.ts`, form actions + `use:enhance`, `ssr` / `prerender`, hooks, redirects, `PUBLIC_` env vars, typing `$state` and `children`.
- **TypeScript:** primitives & inference, `unknown` vs `any`, unions/narrowing, discriminated unions, `as const`, `keyof`/`typeof`, generics + constraints, utility types, `never`/exhaustiveness, assertions, `?.` / `??`, `strictNullChecks`, overloads, type guards, `satisfies`, classes, mapped/conditional/template-literal types, `infer`.

Questions live in `src/lib/questions/{svelte,typescript}.ts` — add one with `add(level, question, correct, [w1,w2,w3], why, code?)`.
