# Phase 5: Audio Storage & Basic Export

## Overview
Integrate cloud storage for raw audio files, implement upload management, link files to database records, and add a basic data export feature to validate the collected data.

## Detailed Instructions

### 1. Cloud Storage Setup
- Choose storage provider (Supabase Storage recommended for simplicity)
- Configure storage bucket with proper permissions
- Set up environment variables for storage access
- Create storage client in `src/lib/storage.ts`

### 2. Audio Upload System
- Create `src/lib/audio-upload.ts` with:
  - Functionality to upload raw audio format (e.g., WebM, WAV).
  - Progress tracking for large files.
  - Error handling and retry logic.
  - Upload cancellation support.

### 3. Audio Processing Pipeline (Simplified)
- Implement `src/lib/audio-processor.ts` for client-side metadata extraction (e.g., duration).
- **Note:** Defer complex client-side processing. Asynchronous server-side processing (e.g., via Supabase Edge Functions) can be added later to normalize and compress audio.

### 4. Storage-Database Integration
- Update recording creation flow to:
  - Upload audio file first.
  - Get storage URL.
  - Create database record with the URL and any client-side metadata.
  - Handle upload failures gracefully to prevent orphaned files.
- Implement this as an atomic or pseudo-atomic operation.

### 5. File Management System
- Create `src/lib/file-manager.ts` with:
  - File naming conventions (UUID-based).
  - Storage organization (e.g., folders by date).
  - Cleanup utilities for failed uploads.

### 6. Basic Data Export System
- Create `src/lib/data-export.ts` with:
  - A function to fetch all recordings and their associated text prompts.
  - Functionality to export the data as a single JSON file (e.g., `dataset.json`).
  - This serves to validate the integrity and structure of the collected data.

### 7. Audio Quality Validation (Simplified)
- Implement `src/lib/audio-validator.ts` with:
  - Simple, automated checks like minimum/maximum duration.
  - Defer complex validation like signal-to-noise ratio.

## Success Criteria
- Raw audio files upload reliably to cloud storage.
- Files are properly linked to database records.
- The basic JSON data export works and produces a valid, usable file.
- Upload failures are handled gracefully.
- Files can be retrieved and played back.

## Dependencies
- Requires Phase 1-4 completion.
- Cloud storage account and credentials.

## Next Steps
After completing Phase 5, proceed to Phase 6 for workflow polish and UX improvements.