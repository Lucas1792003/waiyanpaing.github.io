# Web Development Portfolio — Wai Yan Paing (6511171)

This repository hosts my *Web Development* coursework portfolio.  
The homepage lists class assignments and projects with short descriptions and links to their deployed builds.

**Live site:** https://lucas1792003.github.io/waiyanpaing.github.io/

---
## Added Intresting Feature
-Elden Ring Mode

## What’s in this repo

- `index.html` – the portfolio landing page (pure HTML/CSS).
- `*-build/` folders – static builds served by GitHub Pages (copied from each project’s `dist/`).
- Project source folders (e.g., `midterm-prep1/`, `midterm-quotation-app/`) – Vite/React code.  
  Each project has its own README inside its folder.

Example layout:
waiyanpaing.github.io/
├─ index.html
├─ midterm-prep1/ # project source (Vite)
├─ midterm-prep1-build/ # deployed build (from dist)
├─ midterm-quotation-app/ # project source (Vite)
├─ midterm-quotation-app-build/ # deployed build (from dist)
└─ ...

yaml
Copy
Edit

---

## How it’s deployed

- Hosted with **GitHub Pages** from this repository.
- Each Vite project sets `base` to its published path (e.g. `/waiyanpaing.github.io/midterm-prep1-build/`), then builds to `dist/`.
- The contents of `dist/` are copied into a matching `*-build/` folder at the repo root.

Quick deploy pattern:
```bash
# from repo root
npm --prefix <project-folder> run build
rm -rf <project-name>-build
cp -r <project-folder>/dist <project-name>-build
git add <project-name>-build
git commit -m "Deploy <project-name>"
git push
Vite base example:

ts
Copy
Edit
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/waiyanpaing.github.io/<project-name>-build/',
});
Adding a new project
Create a new Vite/React project in a folder at the repo root.

Set its base (see above).

npm run build and copy dist/ to <project-name>-build/.

Add a new card + link in index.html.

Notes
This repo is for course work demonstration; styling on the landing page is intentionally lightweight.

Each project’s technical details and instructions live in that project’s own README.

pgsql
Copy
Edit

If you want, I can drop this into a `README.md` at the repo root for you.
::contentReference[oaicite:0]{index=0}