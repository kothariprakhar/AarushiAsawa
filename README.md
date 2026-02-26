<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1-6X88pLRK2diYa7CRk7oiw2UxWk9mFul

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` with:

   ```bash
   GEMINI_API_KEY=your_gemini_key
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OWNER_EMAIL=owner@email.com
   ```

3. In Supabase SQL Editor, run:

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
   with check (
     auth.jwt() ->> 'email' = 'owner@email.com'
   );

    create policy "owner can delete posts"
    on public.blog_posts
    for delete
    to authenticated
    using (
       auth.jwt() ->> 'email' = 'owner@email.com'
    );
   ```

   Replace `owner@email.com` in the SQL policy with the same email as `VITE_OWNER_EMAIL`.

4. In Supabase Auth, create that owner user (email + password).

5. Run the app:
   `npm run dev`

## Deploy on Vercel

1. Import this repo in Vercel.
2. In Vercel Project Settings → Environment Variables, add:
   - `GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_OWNER_EMAIL`
3. Redeploy.
