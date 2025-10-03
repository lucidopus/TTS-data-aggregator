# Phase 2: Static Text Prompt System

## Overview
To accelerate development and de-risk dependencies, this phase focuses on implementing a robust system for managing and displaying text prompts from a pre-generated, static list. Live LLM integration will be deferred.

## Detailed Instructions

### 1. Pre-generate Text Prompts
- Use an external script or service (e.g., a local Python script with an LLM library) to generate a large list (1000+) of diverse text prompts.
- Ensure all prompts are validated to be approximately 5-10 seconds in reading length.
- Save the final list as a single `prompts.json` file in the `public` directory.

### 2. Static Prompt Loading
- Create `src/lib/prompts.ts` to:
  - Fetch and parse `public/prompts.json`.
  - Provide a function to get a random prompt or a prompt by index.
  - Handle potential errors if the file fails to load.

### 3. Text Queue Management
- Create `src/lib/text-queue.ts` with:
  - A client-side queue data structure for managing prompts for the current session.
  - Logic to populate the queue from the static list in `src/lib/prompts.ts`.
  - Functions to advance the queue and get the current prompt.
  - Persist the current position in the queue using local storage to allow users to resume sessions.

### 4. Text Display Component
- Update `src/components/RecordingInterface.tsx` to:
  - Fetch the current prompt from the text queue.
  - Display the text prompt clearly.
  - Handle loading states while the initial prompt list is fetched.
  - Add a "skip prompt" or "next prompt" functionality that advances the queue.

## Success Criteria
- A static list of prompts is successfully loaded into the application.
- The queue system provides a smooth and instantaneous transition between prompts.
- The application works fully offline after the initial page load.
- The current prompt is clearly displayed in the recording interface.

## Dependencies
- Requires Phase 1 completion.
- A `prompts.json` file must exist in the `/public` directory.

## Next Steps
After completing Phase 2, proceed to Phase 3 for audio recording core functionality.
