# TTS Data Aggregator - Phase-wise Execution Plan (Revised)

Based on the PROJECT_PLAN.md and strategic review, here's a revised phase-wise execution plan for implementing the TTS Data Aggregator, focusing on a faster path to a viable MVP.

## Phase 1: Foundation & UI Setup (No Change)
- Set up Next.js 15 project structure with TypeScript and Tailwind CSS
- Create basic app layout and navigation
- Design and implement the main recording interface (clean, minimal UI)
- Add progress indicators and session tracking

## Phase 2: Static Text Prompt System
- Implement a text prompt system using a static, pre-generated JSON file.
- Create a text queue management system to serve prompts from the static list.
- **Note:** Live LLM integration is deferred to de-risk the project.

## Phase 3: Audio Recording Core (No Change)
- Implement browser-based audio recording using Web Audio API
- Add recording controls (start/stop/pause)
- Include real-time audio visualization
- Add playback functionality for recorded audio

## Phase 4: Data Storage Foundation
- Set up Supabase project and database schema.
- Design tables for text prompts, recordings, and user sessions.
- Implement basic CRUD operations for text-audio pairs.
- **Note:** Offline-first capabilities are deferred.

## Phase 5: Audio Storage & Basic Export
- Integrate cloud storage (e.g., Supabase Storage) for raw audio files.
- Implement audio file upload and link files to database records.
- Create a basic data export feature (e.g., to JSON) to validate data integrity.
- **Note:** Client-side audio compression is deferred.

## Phase 6: Workflow Polish & UX
- Implement one-click re-recording.
- Add session statistics and progress tracking.
- Polish recording workflow (e.g., auto-advance, error recovery).
- Enhance the data export functionality (e.g., more formats like CSV/ZIP).

## Phase 7: Testing, Optimization & Advanced Features
- Comprehensive testing across devices/browsers.
- Performance optimization for long recording sessions.
- Implement advanced features deferred from earlier phases (e.g., live LLM integration, server-side audio processing, advanced audio validation).
- Final UI/UX refinements.
