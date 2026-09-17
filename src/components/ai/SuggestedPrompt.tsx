interface SuggestedPromptProps {
  label: string
  onClick: () => void
}

export function SuggestedPrompt({ label, onClick }: SuggestedPromptProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
    >
      {label}
    </button>
  )
}
