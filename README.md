# Aarushi Asawa Portfolio

Aarushi Asawa Portfolio is a Vite + React personal site for a sustainability consultant. It combines a polished consultant profile, impact-focused case studies, and a lightweight journal/CMS flow backed by Supabase and Gemini.

The site is positioned around sustainability transformation, circular operations, carbon reporting, finance transformation, and sport-sector sustainability. It is more than a static portfolio: the journal can be managed by an authenticated owner, and posts can be created manually, from a topic prompt, or from a source link.

## Current status

This repository is an in-progress client-facing portfolio app. The core front-end, routing, profile content, project sections, blog list/detail views, owner login flow, Supabase-backed blog storage, and Gemini-assisted writing helpers are present.

What is incomplete or should be hardened before production:

- the original AI Studio scaffold language has been replaced in this README, but deployment still depends on correct environment configuration
- blog image handling stores compressed image data or external URLs in the database rather than using dedicated object storage
- owner authorization is simple and depends on `VITE_OWNER_EMAIL` plus Supabase RLS policies
- Gemini environment handling should be reviewed for Vite production builds
- the CV download button is present in the UI but should be connected to a real hosted file
- social links, SEO metadata, analytics, and accessibility QA should be finalized before launch

## Product idea

The product is a credibility engine for a sustainability consultant. The homepage establishes positioning, the about page turns career history into trust signals, and the journal keeps the site alive with fresh thinking.

The best version of this site helps a prospective client quickly answer three questions:

1. Does Aarushi understand sustainability strategy and financial operations?
2. Has she delivered measurable outcomes in credible environments?
3. Is there an active point of view behind the work?

The AI-assisted journal exists to reduce publishing friction while keeping the owner in control of the final narrative.

## What works today

- Client-side route handling for home, about, journal, and journal detail pages
- Consultant hero and sustainability positioning
- Experience timeline and impact project cards
- Supabase-backed blog posts with public read access
- Owner login through Supabase Auth
- Owner-only create/delete blog actions in the UI
- Manual post editor with simple formatting controls
- AI topic-to-post generation with Gemini
- Link-to-post generation using a readable source fetch path
- AI or uploaded cover image support with browser-side compression
- Responsive visual design with nature-inspired imagery and motion

## Product manager perspective

This project sits between personal brand, lead generation, and lightweight publishing. The most important product choice is to keep the site focused on trust, not feature breadth. A polished homepage and credible case studies matter more than a complex CMS.

The journal is a smart product wedge because sustainability consulting is expertise-driven. If Aarushi can publish thoughtful commentary quickly, the website becomes a living proof point rather than a static resume. The risk is that generated content can feel generic; the product should treat AI as a drafting assistant, not a voice replacement.

## Key trade-offs

- Static portfolio vs editable CMS: Supabase makes publishing easier, but adds auth, database, and policy setup.
- AI-assisted writing vs personal voice: Gemini reduces blank-page friction, but every post needs owner review.
- Data URL images vs object storage: Inline images are simple for a prototype, but object storage is better for production scale.
- Client-side routing vs full framework routing: The app stays lightweight, but direct deep-link hosting needs correct fallback configuration.
- Rich visual identity vs maintainability: Bespoke motion and illustrative elements make the brand memorable, but require QA across devices.

## Concepts used

- Vite: Fast front-end build tool for React apps.
- React: Component model for the portfolio, journal, and interactive UI.
- Supabase: Hosted Postgres, Auth, and row-level security for blog storage.
- Row-level security: Database policies that allow public reads and owner writes/deletes.
- Gemini API: AI text and image generation for journal drafting and covers.
- Client-side routing: Browser history state maps URLs to React views.
- Content editor: Owner-facing manual writing flow with basic formatting actions.
- Image compression: Canvas-based conversion to smaller WebP data URLs before storage.
- Prompt-to-post: AI generation workflow that returns structured JSON content.
- Link-to-post: Source URL extraction followed by AI rewriting into publishable commentary.

## Project structure

```text
App.tsx                    Client-side route state and page shell
components/
  Hero.tsx                 Homepage and sustainability positioning
  About.tsx                Bio, experience, projects, education, leadership
  Blog.tsx                 Blog list, login, create/delete flows
  BlogPostDetail.tsx       Public article detail view
  Navbar.tsx               Top navigation
services/
  geminiService.ts         Gemini text/image generation helpers
  supabase.ts              Supabase client configuration
types.ts                   Shared UI/domain types
index.css                  Global styling and design tokens
images/                    Profile and hero imagery
```

## Getting started

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
GEMINI_API_KEY=your_gemini_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OWNER_EMAIL=owner@email.com
```

Create the blog table in Supabase:

```sql
create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  date text not null,
  image_url text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  owner_id uuid not null default auth.uid()
);

alter table public.blog_posts enable row level security;

create policy "public can read posts"
on public.blog_posts
for select
to anon, authenticated
using (true);

create policy "owner can insert posts"
on public.blog_posts
for insert
to authenticated
with check (auth.jwt() ->> 'email' = 'owner@email.com');

create policy "owner can delete posts"
on public.blog_posts
for delete
to authenticated
using (auth.jwt() ->> 'email' = 'owner@email.com');
```

Replace `owner@email.com` with the same address used in `VITE_OWNER_EMAIL`, then create that user in Supabase Auth.

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Deployment notes

For Vercel or another static host, set:

- `GEMINI_API_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_OWNER_EMAIL`

Because the app uses client-side routing, configure the host to serve `index.html` for nested routes such as `/journal/<post-id>`.

## Next steps

- Move cover images to Supabase Storage.
- Add SEO metadata and social preview images.
- Add a real CV download asset.
- Add preview/draft state for blog posts.
- Add analytics for inbound leads and article engagement.
- Review Gemini key handling and server-side proxy options for production.
