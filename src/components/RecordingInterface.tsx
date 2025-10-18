'use client'

import { useState, useEffect } from 'react'
import { incrementCompletedRecordings, getSessionStats } from '@/lib/progress'
import BackgroundAnimation from './BackgroundAnimation'

type RecordingState = 'idle' | 'recording' | 'playback' | 'complete'

export default function RecordingInterface() {
  const [state, setState] = useState<RecordingState>('idle')
  const [progress, setProgress] = useState({ completed: 0, total: 0, sessionDuration: 0, completionRate: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Sample text for demonstration - will be replaced with LLM-generated text in Phase 2
  const currentText = "The quick brown fox jumps over the lazy dog. This is a sample text that should take about 5-10 seconds to read aloud when spoken at a natural pace."

  useEffect(() => {
    setIsHydrated(true)
    const updateProgress = () => setProgress(getSessionStats())
    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleRecord = async () => {
    setIsLoading(true)
    // Simulate recording start delay
    setTimeout(() => {
      setState('recording')
      setIsLoading(false)
    }, 500)
  }

  const handleStop = () => {
    setState('playback')
    incrementCompletedRecordings()
  }

  const handlePlay = () => {
    setState('playback')
  }

  const handleComplete = () => {
    setState('complete')
    setTimeout(() => setState('idle'), 2000)
  }

  const handleNext = () => {
    setState('idle')
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <BackgroundAnimation />

      {/* Progress Header */}
      <div className="border-b border-gray-800/50 bg-black/60 backdrop-blur-xl shadow-2xl relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white font-medium">
              Session Progress: {isHydrated ? progress.completed : 0} / {isHydrated ? progress.total : 0} recordings
            </span>
            <span className="text-white font-medium">
              {isHydrated ? progress.completionRate : 0}% complete
            </span>
          </div>
          <div className="mt-3 w-full bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 h-3 rounded-full transition-all duration-700 ease-out shadow-lg shadow-blue-500/30"
              style={{ width: `${isHydrated ? progress.completionRate : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Text Display */}
          <div className="mb-12 animate-fade-in-up duration-1000 relative z-10">
            <div className="group relative bg-white/5 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-black/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Background gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl flex items-center justify-center mr-4 shadow-xl shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    {/* Pulsing ring animation */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-30 animate-ping blur-sm" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-100 transition-colors drop-shadow-lg">Read this text aloud:</h2>
                    <p className="text-sm text-gray-400 font-medium">Speak clearly and naturally</p>
                  </div>
                </div>

                <div className="relative">
                  <p className="text-white leading-relaxed text-xl font-medium group-hover:text-blue-50 transition-colors duration-300 drop-shadow-sm">
                    {currentText}
                  </p>
                  {/* Subtle text highlight effect */}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </div>
            </div>
          </div>

          {/* Recording Controls */}
          <div className="flex flex-col items-center space-y-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {/* Status Indicator */}
            <div className="text-center relative">
              <div className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-500 transform backdrop-blur-xl ${
                state === 'idle' ? 'bg-white/10 text-white scale-100 shadow-2xl shadow-black/50 border border-gray-700/50' :
                state === 'recording' ? 'bg-red-900/80 text-red-100 scale-110 shadow-2xl shadow-red-500/30 border border-red-700/50 animate-pulse' :
                state === 'playback' ? 'bg-emerald-900/80 text-emerald-100 scale-110 shadow-2xl shadow-emerald-500/30 border border-emerald-700/50' :
                'bg-blue-900/80 text-blue-100 scale-110 shadow-2xl shadow-blue-500/30 border border-blue-700/50'
              }`}>
                <div className={`w-3 h-3 rounded-full mr-3 transition-all duration-300 ${
                  state === 'idle' ? 'bg-gray-400' :
                  state === 'recording' ? 'bg-red-400 animate-ping shadow-lg shadow-red-400/50' :
                  state === 'playback' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' :
                  'bg-blue-400 shadow-lg shadow-blue-400/50'
                }`} />
                {state === 'idle' && 'Ready to record'}
                {state === 'recording' && 'Recording in progress...'}
                {state === 'playback' && 'Ready for playback'}
                {state === 'complete' && 'Recording saved successfully!'}
              </div>

              {/* Ambient glow effect for active states */}
              {(state === 'recording' || state === 'playback' || state === 'complete') && (
                <div className={`absolute inset-0 rounded-2xl blur-2xl opacity-40 animate-pulse ${
                  state === 'recording' ? 'bg-red-500' :
                  state === 'playback' ? 'bg-emerald-500' :
                  'bg-blue-500'
                }`} />
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap justify-center gap-6">
              {state === 'idle' && (
                <button
                  onClick={handleRecord}
                  disabled={isLoading}
                  className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 disabled:from-red-800 disabled:via-red-900 disabled:to-red-900 text-white font-bold rounded-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-red-500/60 focus:outline-none focus:ring-4 focus:ring-red-500/50 focus:ring-offset-2 disabled:transform-none disabled:shadow-none overflow-hidden"
                  aria-label="Start recording"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex items-center">
                    {isLoading ? (
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-4" />
                    ) : (
                      <div className="relative mr-4">
                        <div className="w-5 h-5 bg-white rounded-full group-hover:animate-ping shadow-lg shadow-white/50" />
                        <div className="absolute inset-0 w-5 h-5 bg-white rounded-full opacity-50 group-hover:animate-pulse" />
                      </div>
                    )}
                    <span className="text-lg drop-shadow-lg">{isLoading ? 'Initializing...' : 'Start Recording'}</span>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
                </button>
              )}

              {state === 'recording' && (
                <button
                  onClick={handleStop}
                  className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black text-white font-bold rounded-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-gray-600/60 focus:outline-none focus:ring-4 focus:ring-gray-600/50 focus:ring-offset-2 overflow-hidden"
                  aria-label="Stop recording"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex items-center">
                    <div className="w-5 h-5 bg-white rounded-sm mr-4 group-hover:animate-pulse shadow-lg shadow-white/50" />
                    <span className="text-lg drop-shadow-lg">Stop Recording</span>
                  </div>

                  <div className="absolute -inset-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
                </button>
              )}

              {state === 'playback' && (
                <>
                  <button
                    onClick={handlePlay}
                    className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-600 hover:via-green-600 hover:to-green-700 text-white font-bold rounded-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/60 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 focus:ring-offset-2 overflow-hidden"
                    aria-label="Play recording"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-4 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg drop-shadow-lg">Play Recording</span>
                    </div>

                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
                  </button>

                  <button
                    onClick={handleComplete}
                    className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/60 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:ring-offset-2 overflow-hidden"
                    aria-label="Save recording"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg drop-shadow-lg">Save & Continue</span>
                    </div>

                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
                  </button>
                </>
              )}

              {state === 'complete' && (
                <button
                  onClick={handleNext}
                  className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/60 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:ring-offset-2 overflow-hidden animate-zoom-in"
                  aria-label="Next recording"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex items-center">
                    <svg className="w-5 h-5 mr-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-lg drop-shadow-lg">Next Text</span>
                  </div>

                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
                </button>
              )}
            </div>

            {/* Instructions */}
            <div className="text-center max-w-2xl animate-fade-in-up relative z-10" style={{ animationDelay: '500ms' }}>
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl shadow-black/50 border border-gray-700/50 hover:shadow-3xl hover:shadow-black/60 transition-all duration-500 group">
                <div className="flex items-center justify-center mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                    state === 'idle' ? 'bg-blue-900/50' :
                    state === 'recording' ? 'bg-red-900/50 animate-pulse' :
                    state === 'playback' ? 'bg-emerald-900/50' :
                    'bg-blue-900/50'
                  }`}>
                    <svg className={`w-4 h-4 transition-colors ${
                      state === 'idle' ? 'text-blue-300' :
                      state === 'recording' ? 'text-red-300' :
                      state === 'playback' ? 'text-emerald-300' :
                      'text-blue-300'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-white font-medium leading-relaxed text-base group-hover:text-blue-100 transition-colors duration-300 drop-shadow-sm">
                  {state === 'idle' && 'Click "Start Recording" when you\'re ready to begin reading the text above. Speak clearly and at a natural pace.'}
                  {state === 'recording' && 'Read the text aloud clearly and naturally. Take your time and speak as you normally would. Click "Stop Recording" when finished.'}
                  {state === 'playback' && 'Listen to your recording carefully. If you\'re not satisfied, you can re-record by going back to the previous step.'}
                  {state === 'complete' && 'Excellent work! Your recording has been saved successfully. Ready for the next text prompt?'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}