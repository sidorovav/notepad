'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Save, FileUp, FileDown } from 'lucide-react'

export default function SimpleNotepad() {
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('Новый документ.txt')

  useEffect(() => {
    const savedText = localStorage.getItem('notepadText')
    if (savedText) {
      setText(savedText)
    }
  }, [])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    localStorage.setItem('notepadText', e.target.value)
  }

  const handleSave = () => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setText(content)
        localStorage.setItem('notepadText', content)
      }
      reader.readAsText(file)
      setFileName(file.name)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4 min-h-screen bg-green-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Простой блокнот</h1>
        <div className="flex space-x-2">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Сохранить
          </Button>
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button as="span">
              <FileUp className="mr-2 h-4 w-4" /> Загрузить
            </Button>
          </label>
          <Input
            id="file-upload"
            type="file"
            accept=".txt"
            className="hidden"
            onChange={handleLoad}
          />
        </div>
      </div>
      <Input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="w-full"
        placeholder="Имя файла"
      />
      <Textarea
        value={text}
        onChange={handleTextChange}
        className="w-full h-[70vh] font-mono bg-green-50"
        placeholder="Введите ваш текст здесь..."
      />
    </div>
  )
}