export interface SessionProgress {
  totalRecordings: number
  completedRecordings: number
  sessionStartTime: number
  lastUpdated: number
}

const PROGRESS_KEY = 'tts-progress'

export function getProgress(): SessionProgress {
  if (typeof window === 'undefined') {
    return {
      totalRecordings: 0,
      completedRecordings: 0,
      sessionStartTime: Date.now(),
      lastUpdated: Date.now(),
    }
  }

  const stored = localStorage.getItem(PROGRESS_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // If parsing fails, return default
    }
  }

  return {
    totalRecordings: 0,
    completedRecordings: 0,
    sessionStartTime: Date.now(),
    lastUpdated: Date.now(),
  }
}

export function updateProgress(updates: Partial<SessionProgress>): void {
  if (typeof window === 'undefined') return

  const current = getProgress()
  const updated = {
    ...current,
    ...updates,
    lastUpdated: Date.now(),
  }

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated))
}

export function incrementCompletedRecordings(): void {
  const progress = getProgress()
  updateProgress({
    completedRecordings: progress.completedRecordings + 1,
    totalRecordings: Math.max(progress.totalRecordings, progress.completedRecordings + 1),
  })
}

export function resetSession(): void {
  if (typeof window === 'undefined') return

  const newSession: SessionProgress = {
    totalRecordings: 0,
    completedRecordings: 0,
    sessionStartTime: Date.now(),
    lastUpdated: Date.now(),
  }

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(newSession))
}

export function getSessionStats() {
  const progress = getProgress()
  const sessionDuration = Date.now() - progress.sessionStartTime
  const completionRate = progress.totalRecordings > 0
    ? (progress.completedRecordings / progress.totalRecordings) * 100
    : 0

  return {
    completed: progress.completedRecordings,
    total: progress.totalRecordings,
    sessionDuration,
    completionRate: Math.round(completionRate),
  }
}