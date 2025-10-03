# Phase 4: Data Storage Foundation

## Overview
Set up Supabase project and database schema, design tables for text prompts and recordings, implement CRUD operations with proper error handling.

## Detailed Instructions

### 1. Supabase Project Setup
- Create new Supabase project
- Configure environment variables (`.env.local`):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Install Supabase client: `npm install @supabase/supabase-js`
- Initialize Supabase client in `src/lib/supabase.ts`

### 2. Database Schema Design
- Create the following tables:
  - `text_prompts`: id, text, estimated_duration, created_at, metadata
  - `recordings`: id, prompt_id, audio_url, duration, quality_score, created_at
  - `recording_sessions`: id, started_at, ended_at, total_recordings, user_id (optional)
- Set up proper foreign key relationships
- Add indexes for performance (created_at, prompt_id)
- Configure Row Level Security (RLS) policies

### 3. Type Definitions
- Create `src/types/database.ts` with:
  - TypeScript interfaces for all database tables
  - Supabase generated types (run `supabase gen types typescript`)
  - Custom types for API responses

### 4. CRUD Operations Implementation
- Create `src/lib/database/text-prompts.ts` with:
  - `createTextPrompt()` - save new prompts
  - `getTextPrompts()` - fetch prompts with pagination
  - `updateTextPrompt()` - modify existing prompts
  - `deleteTextPrompt()` - remove prompts

- Create `src/lib/database/recordings.ts` with:
  - `createRecording()` - save new recordings
  - `getRecordings()` - fetch recordings with filters
  - `updateRecording()` - modify recording metadata
  - `deleteRecording()` - remove recordings

### 5. Error Handling and Validation
- Implement comprehensive error handling for:
  - Database connection issues
  - Validation errors
  - Network timeouts
  - Permission errors
- Add input validation using Zod schemas
- Implement retry logic for transient failures

### 6. Database Utilities
- Create `src/lib/database/utils.ts` with:
  - Connection health checks
  - Migration helpers
  - Backup/restore utilities
  - Analytics functions (recording counts, session stats)

## Success Criteria
- Supabase project is properly configured
- Database schema supports all required data relationships
- CRUD operations work reliably
- Error handling prevents data loss
- Type safety is maintained throughout
- Data can be queried efficiently

## Dependencies
- Requires Phase 1-3 completion
- Supabase account and project
- Internet connection for database operations

## Next Steps
After completing Phase 4, proceed to Phase 5 for audio storage integration.