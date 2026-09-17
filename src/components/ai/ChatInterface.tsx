import { Paperclip, Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../common/Button'
import { ChatMessage } from './ChatMessage'
import { SuggestedPrompt } from './SuggestedPrompt'

interface ChatMessageData {
  sender: 'user' | 'assistant'
  text: string
  citations?: Array<{ id: string; label: string }>
}

export function ChatInterface() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      sender: 'user',
      text: 'What experiments have shown improved cell viability under hypoxic conditions?'
    },
    {
      sender: 'assistant',
      text: 'I found 7 relevant experiments across 3 researchers.\n\nThe strongest recurring observation is an improvement in cell viability when Compound A is used between 5–10 μM.\n\nEvidence:\n• Experiment #EXP-142\n• Experiment #EXP-157\n• Lab Notebook #LN-084\n• Paper #PUB-2026-018\n\nConfidence: 87%',
      citations: [
        { id: 'EXP-142', label: 'Experiment #EXP-142' },
        { id: 'EXP-157', label: 'Experiment #EXP-157' },
        { id: 'LN-084', label: 'Lab Notebook #LN-084' },
        { id: 'PUB-2026-018', label: 'Paper #PUB-2026-018' }
      ]
    }
  ])

  const suggested = [
    'Summarize findings related to Gene X',
    'Compare our latest CRISPR experiments',
    'What contradictions exist in our protocols?',
    'What does recent literature say about Compound A?'
  ]

  const onSend = () => {
    if (!input.trim()) return
    setMessages((current) => [
      ...current,
      { sender: 'user', text: input },
      {
        sender: 'assistant',
        text: 'This is a mock response for now. I can synthesize evidence across experiments, protocols, and literature once the backend and RAG pipeline are connected.',
        citations: [{ id: 'AI-01', label: 'Synthetic response preview' }]
      }
    ])
    setInput('')
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          {suggested.map((prompt) => (
            <SuggestedPrompt key={prompt} label={prompt} onClick={() => setInput(prompt)} />
          ))}
        </div>
      </div>

      <div className="h-[480px] space-y-4 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
        {messages.map((message, index) => (
          <ChatMessage key={`${message.sender}-${index}`} sender={message.sender} text={message.text} citations={message.citations} />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={2}
          placeholder="Ask a research question..."
          className="min-h-[80px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
        />
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<Paperclip className="h-4 w-4" />}>Attach</Button>
          <Button icon={<Send className="h-4 w-4" />} onClick={onSend}>Send</Button>
        </div>
      </div>
    </div>
  )
}
