// src/ReactQueryProvider.tsx
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { useState } from 'react'

const queryClient = new QueryClient()

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* Devtools Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-[#581845] text-white px-3 py-1 rounded shadow-lg z-50"
      >
        {isOpen ? 'Close Devtools' : 'Open Devtools'}
      </button>

      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full max-w-[900px] h-[500px] shadow-lg border bg-white">
          <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />
        </div>
      )}
    </QueryClientProvider>
  )
}
