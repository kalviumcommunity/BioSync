import { CloudUpload, FileText, Tag, BriefcaseBusiness } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../common/Button'
import { Modal } from '../common/Modal'

interface UploadDocumentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UploadDocumentModal({ isOpen, onClose }: UploadDocumentModalProps) {
  const [selectedFile, setSelectedFile] = useState<string>('')

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload document">
      <div className="space-y-5">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center hover:border-brand-500 hover:bg-brand-50/40">
          <CloudUpload className="mb-3 h-10 w-10 text-brand-600" />
          <span className="text-sm font-medium text-slate-700">Drag and drop a file here</span>
          <span className="mt-1 text-xs text-slate-500">or click to browse</span>
          <input type="file" className="hidden" onChange={(event) => setSelectedFile(event.target.files?.[0]?.name ?? '')} />
        </label>

        {selectedFile ? <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">Selected: {selectedFile}</div> : null}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            <span className="flex items-center gap-2 font-medium"><FileText className="h-4 w-4" /> Document type</span>
            <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-brand-500">
              <option>Protocol</option>
              <option>Lab Notebook</option>
              <option>Literature</option>
              <option>Report</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span className="flex items-center gap-2 font-medium"><Tag className="h-4 w-4" /> Tags</span>
            <input className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-brand-500" defaultValue="CRISPR, Genomics" />
          </label>
          <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
            <span className="flex items-center gap-2 font-medium"><BriefcaseBusiness className="h-4 w-4" /> Research area</span>
            <input className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-brand-500" defaultValue="Genome Editing" />
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Upload</Button>
        </div>
      </div>
    </Modal>
  )
}
