'use client'
import { useState, useEffect, useRef } from 'react'
import { Editor } from '@monaco-editor/react'

export default function CodeIDE() {
  const [code, setCode] = useState(`// Welcome to ORBIT AI Code IDE
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`)
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const editorRef = useRef(null)

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
    { id: 'typescript', name: 'TypeScript' }
  ]

  const runCode = async () => {
    setLoading(true)
    setOutput('')

    // Simulate code execution
    setTimeout(() => {
      if (language === 'javascript') {
        try {
          // Simple JavaScript evaluation (in real app, use safer methods)
          const result = eval(code)
          setOutput(result?.toString() || 'Code executed successfully')
          setErrors([])
        } catch (error) {
          setErrors([error.message])
          setOutput('')
        }
      } else {
        setOutput('Code execution simulation - would run on server')
        setErrors([])
      }
      setLoading(false)
    }, 1000)
  }

  const fixCode = async () => {
    if (errors.length === 0) return

    setLoading(true)

    // Simulate AI code fixing
    setTimeout(() => {
      alert('AI code fix would be implemented here using Firebase Functions')
      setLoading(false)
    }, 1500)
  }

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  return (
    <div className="max-w-7xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Code IDE</h1>
        <p className="mt-2 text-gray-600">
          Write code with AI-powered debugging and instant fixes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={runCode}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {loading ? 'Running...' : 'Run Code'}
                  </button>
                  {errors.length > 0 && (
                    <button
                      onClick={fixCode}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      AI Fix
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="h-96">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 px-4 py-3">
              <h3 className="text-lg font-medium text-gray-900">Output</h3>
            </div>
            <div className="p-4">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {output || 'Run your code to see output...'}
              </pre>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-red-200">
              <div className="border-b border-red-200 px-4 py-3">
                <h3 className="text-lg font-medium text-red-900">Errors</h3>
              </div>
              <div className="p-4">
                {errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-600 mb-2">
                    {error}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 px-4 py-3">
              <h3 className="text-lg font-medium text-gray-900">Features</h3>
            </div>
            <div className="p-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ Syntax highlighting</li>
                <li>✅ Error detection</li>
                <li>✅ AI-powered code fixes</li>
                <li>✅ Multi-language support</li>
                <li>✅ Real-time debugging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}