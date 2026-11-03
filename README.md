# Mahbub Ali — Academic & Research Portfolio

Next.js portfolio for Mahbub Ali.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages

The site builds as static files in `out/`. Push this folder as the root of a GitHub repository, then in the repository settings set Pages to **GitHub Actions**. A push to `main` or `master` runs `.github/workflows/pages.yml` and publishes the site.

A repository named `username.github.io` is served from the domain root. Any other repository name is served from `https://username.github.io/repository-name/`. The workflow sets that path during the build.

Preview the static build locally:

```bash
npm run build
npx serve out
```

## Edit content

Personal information, projects, and research copy live in `src/data/portfolio.ts`.

Leave `contact.email` and `contact.linkedin` as the public contact channels. GitHub is not shown as a profile link.

The downloadable CV and research proposal are generated from the same record:

- `public/documents/mahbub-ali-cv.pdf`
- `public/documents/research-proposal.pdf`

Regenerate them after editing `src/data/portfolio.ts`:

```bash
node scripts/write-placeholder-pdfs.mjs
```
