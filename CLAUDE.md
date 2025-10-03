# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TTS (Text-to-Speech) Data Aggregator application built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The purpose is to create a high-quality dataset for training custom text-to-speech models by:
- Generating short text prompts (5-10 seconds when read aloud) via LLM
- Recording audio of someone reading the prompts
- Storing text-audio pairs in a database (planned: Supabase/PostgreSQL)
- Storing audio files in cloud storage (planned: Supabase Storage/S3/GCS)

The core focus is on creating a polished, frictionless UI/UX that makes the recording process feel satisfying and efficient rather than tedious.

## Commands

**Development:**
```bash
npm run dev      # Start development server on http://localhost:3000
yarn dev         # Alternative with yarn
```

**Build and Production:**
```bash
npm run build    # Build for production
npm start        # Start production server
```

**Linting:**
```bash
npm run lint     # Run ESLint
```

## Architecture

**Framework:** Next.js 15 with App Router (not Pages Router)
- All routes are in `src/app/` directory
- Uses React Server Components by default
- Client components must have `"use client"` directive

**Styling:** Tailwind CSS v4
- Global styles in `src/app/globals.css`
- Uses Geist font family (sans and mono variants)

**TypeScript Configuration:**
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Target: ES2017

**Project Structure:**
```
src/app/          # Next.js App Router pages and layouts
  layout.tsx      # Root layout with fonts
  page.tsx        # Home page
  globals.css     # Global Tailwind styles
docs/             # Project documentation
  PROJECT_PLAN.md # Detailed project requirements and goals
```

## Database Considerations

The application is designed to integrate with Supabase or PostgreSQL. When implementing database features:
- NEVER run `supabase db reset` without explicit user approval
- Design schema for easy export of text-audio pairs for TTS model training
- Audio files should be stored in cloud storage (Supabase Storage/S3/GCS), with database references
- Schema must link audio recordings to their corresponding text prompts

## UI/UX Priorities

UI/UX is critical to this project's success. When building features:
- Prioritize clean, polished, intuitive interfaces
- Minimize friction in the recording workflow
- Include quick playback, one-click re-recording, and progress indicators
- Design should feel motivating and satisfying to use for long sessions
