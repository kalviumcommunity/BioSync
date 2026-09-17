import { Sparkles } from 'lucide-react'

interface ChatMessageProps {
  sender: 'user' | 'assistant'
  text: string
  citations?: Array<{ id: string; label: string }>
}

export function ChatMessage({ sender, text, citations = [] }: ChatMessageProps) {
  const isUser = sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-2xl rounded-2xl px-4 py-3 ${isUser ? 'bg-brand-600 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>
        <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.14em] ${isUser ? 'text-brand-100' : 'text-slate-400'}">
          {isUser ? 'User' : <><Sparkles className="h-3 w-3" /> AI</>}
        </div>
        <p className="whitespace-pre-line text-sm leading-6">{text}</p>
        {citations.length > 0 ? (
          <div className="mt-3 space-y-2 border-t border-white/20 pt-3 text-xs">
            {citations.map((citation) => (
              <div key={citation.id} className={`rounded-lg px-2 py-1 ${isUser ? 'bg-white/10 text-white/90' : 'bg-slate-50 text-slate-700'}`}>
                {citation.label}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
