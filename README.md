# Mahbub Ali — Academic & Research Portfolio

Next.js portfolio for Mahbub Ali.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
