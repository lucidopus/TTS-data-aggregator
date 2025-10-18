export default function Navigation() {
  return (
    <header className="border-b border-gray-800/50 bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              {/* Animated ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-40 animate-ping transition-opacity duration-300 blur-sm" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-500 drop-shadow-lg">
                TTS Data Aggregator
              </h1>
              <p className="text-sm text-gray-400 font-medium -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                High-quality voice data collection
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-emerald-900/50 to-green-900/50 rounded-2xl border border-emerald-700/50 shadow-lg backdrop-blur-sm">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                <div className="absolute inset-0 w-3 h-3 bg-emerald-300 rounded-full animate-ping opacity-60" />
              </div>
              <span className="text-sm text-emerald-300 font-semibold">
                Recording Active
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}