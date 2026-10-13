# svelte-typescript-prep — Windows setup

A small Svelte 5 + Vite quiz app: **100 multiple-choice questions** (50 Svelte/SvelteKit, 50 TypeScript) with explanations,
plus *Svelte theory* and *TypeScript theory* tabs. No backend, no database, no accounts.

> **Status.** Developed and tested on macOS (type-check, build, question validation, running in the browser). The
> Windows steps below follow each tool's official Windows docs and the project has no OS-specific code — but they have
> **not been run on a real Windows PC yet**. See *Troubleshooting* if something fails.

## 1. Install the tools (PowerShell)

```powershell
winget install --id Git.Git -e
winget install --id Oven-sh.Bun -e
winget install --id OpenJS.NodeJS.LTS -e      # recommended; required if you prefer npm
```

Close and reopen PowerShell, then check:

```powershell
git --version ; bun --version ; node --version
```

## 2. Get the code and run it

```powershell
mkdir C:\dev ; cd C:\dev
git clone https://github.com/AniqHaider/svelte-typescript-prep.git
cd svelte-typescript-prep
bun install
bun run dev
```

Open **http://localhost:5174**.

| Command | What it does |
|---|---|
| `bun run dev` | Dev server with hot reload on port **5174** |
| `bun run build` | Production build into `dist\` |
| `bun run preview` | Serve `dist\` on port 5174 |
| `bun run check` | `svelte-check` type check — expect `0 ERRORS` |
| `bun run validate` | Checks the question bank: expect `total 100`, `svelte: 50`, `typescript: 50`, then `OK` |

### No Bun? Use npm instead

```powershell
npm install
npm run dev        # dev / build / preview / check all work with npm
```

`npm run validate` needs Bun (it runs `bun scripts/validate.ts`); everything else doesn't.

## 3. Using the app

- **Quiz** tab: pick topic / level / length / mode. *Practice* explains each answer right after you pick; *Exam* holds the
  explanations until the end and gives a review. Options are shuffled each attempt. Keys: `1`–`4` choose, `Enter` next.
- **Svelte** and **TypeScript** tabs: interview "say it like this" scripts, key points, code, follow-ups and pitfalls.
  *Practice mode* hides the script so you say it aloud first.
- Progress (missed questions, theory ticks) is stored in the browser's **localStorage** for `http://localhost:5174` —
  it is per browser and per port, and is not carried over from your old machine.

## 4. Editing the content

Questions live in `src\lib\questions\svelte.ts` and `typescript.ts`; theory in `src\lib\theory\`. Add a question with
`add(level, question, correct, [wrong1, wrong2, wrong3], why, code?)`, then run `bun run validate`.

## 5. Notes

- **TypeScript is pinned to `~6`** in `package.json` because `svelte-check` did not support TypeScript 7 when this was
  built. Don't bump it without checking `bun run check`.
- This app is also bundled inside the **Kata** Android app (`prep-pocket` repo, *Prep* tab) — you don't need both.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `bun` / `node` "not recognized" | Close and reopen PowerShell so PATH refreshes. |
| Port 5174 already in use | `bun run dev -- --port 5180` |
| `svelte-check` complains about TypeScript 7 | Make sure `typescript` is `~6`: `bun add -d typescript@~6` |
| Page shows old content after edits | Hard refresh (Ctrl+Shift+R). |
| Scripts blocked ("running scripts is disabled") | Only for `.ps1` files: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. |
