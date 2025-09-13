# Create Module Components
module_components = {
    "components/modules/DashboardHome.js": """'use client'
import { 
  DocumentTextIcon, 
  PresentationChartBarIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  BriefcaseIcon,
  UserCircleIcon 
} from '@heroicons/react/24/outline'

const modules = [
  {
    name: 'Resume Builder',
    description: 'Create professional resumes with AI assistance',
    icon: DocumentTextIcon,
    href: 'resume',
    color: 'bg-blue-50 text-blue-600',
    bgColor: 'bg-blue-500'
  },
  {
    name: 'Portfolio Generator',
    description: 'Build stunning portfolio websites',
    icon: UserCircleIcon,
    href: 'portfolio',
    color: 'bg-green-50 text-green-600',
    bgColor: 'bg-green-500'
  },
  {
    name: 'Document Designer',
    description: 'AI-powered document creation',
    icon: DocumentTextIcon,
    href: 'documents',
    color: 'bg-purple-50 text-purple-600',
    bgColor: 'bg-purple-500'
  },
  {
    name: 'Presentation Designer',
    description: 'Create engaging presentations',
    icon: PresentationChartBarIcon,
    href: 'presentations',
    color: 'bg-orange-50 text-orange-600',
    bgColor: 'bg-orange-500'
  },
  {
    name: 'Invoice Generator',
    description: 'Professional invoicing made simple',
    icon: BriefcaseIcon,
    href: 'invoices',
    color: 'bg-red-50 text-red-600',
    bgColor: 'bg-red-500'
  },
  {
    name: 'Chat Rooms',
    description: 'Collaborate with peers in real-time',
    icon: ChatBubbleLeftRightIcon,
    href: 'chat',
    color: 'bg-indigo-50 text-indigo-600',
    bgColor: 'bg-indigo-500'
  },
  {
    name: 'AI Assistant',
    description: 'Get help from your personal AI',
    icon: ChatBubbleLeftRightIcon,
    href: 'ai-chat',
    color: 'bg-pink-50 text-pink-600',
    bgColor: 'bg-pink-500'
  },
  {
    name: 'Code IDE',
    description: 'Code with AI-powered debugging',
    icon: CodeBracketIcon,
    href: 'code',
    color: 'bg-gray-50 text-gray-600',
    bgColor: 'bg-gray-500'
  },
  {
    name: 'Voice Assistant',
    description: 'Practice speaking and communication',
    icon: MicrophoneIcon,
    href: 'voice',
    color: 'bg-teal-50 text-teal-600',
    bgColor: 'bg-teal-500'
  },
]

export default function DashboardHome({ onNavigate }) {
  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your all-in-one productivity workspace. Choose a tool to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.name}
            onClick={() => onNavigate(module.href)}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 card-hover"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${module.color}`}>
                  <module.icon className="h-6 w-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {module.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
            <div className={`h-1 ${module.bgColor}`}></div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Documents Written</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Presentations Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">0</div>
              <div className="text-sm text-gray-600">Voice Sessions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}""",

    "components/modules/ResumeBuilder.js": """'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const templates = [
  { id: 'professional', name: 'Professional', description: 'Clean, modern design perfect for corporate roles' },
  { id: 'creative', name: 'Creative', description: 'Bold design for creative and design positions' },
  { id: 'academic', name: 'Academic', description: 'Traditional layout ideal for academic and research roles' }
]

export default function ResumeBuilder() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('create')
  const [selectedTemplate, setSelectedTemplate] = useState('professional')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    location: '',
    jobDescription: '',
    summary: '',
    experience: [],
    education: [],
    skills: []
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      alert('Resume generated successfully!')
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="max-w-6xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
        <p className="mt-2 text-gray-600">
          Create professional resumes with AI assistance
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Resume
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Choose Template
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'create' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Job Description
                </label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Paste the job description you're applying for to get AI-tailored content..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating Resume...' : 'Generate Resume with AI'}
              </button>
            </form>
          )}

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="mt-3 h-32 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-500">Preview</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}""",

    "components/modules/CodeIDE.js": """'use client'
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
}""",

    "components/modules/VoiceAssistant.js": """'use client'
import { useState, useRef, useEffect } from 'react'
import { MicrophoneIcon, StopIcon, PlayIcon } from '@heroicons/react/24/outline'

export default function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const recognitionRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript + ' ')
        }
      }
    }
  }, [])

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true)
      setTranscript('')
      setRecordingTime(0)
      recognitionRef.current.start()
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(false)
      recognitionRef.current.stop()
      clearInterval(timerRef.current)
      analyzeTranscript()
    }
  }

  const analyzeTranscript = async () => {
    if (!transcript.trim()) return
    
    setLoading(true)
    
    // Simulate analysis
    setTimeout(() => {
      const words = transcript.split(' ').length
      const wpm = Math.round((words / recordingTime) * 60)
      const fillerWords = (transcript.match(/\\b(um|uh|like|you know|so|actually)\\b/gi) || []).length
      const fillerPercentage = Math.round((fillerWords / words) * 100)
      
      setAnalysis({
        wpm,
        fillerWords,
        fillerPercentage,
        totalWords: words,
        duration: recordingTime,
        feedback: generateFeedback(wpm, fillerPercentage)
      })
      
      setLoading(false)
    }, 2000)
  }

  const generateFeedback = (wpm, fillerPercentage) => {
    const feedback = []
    
    if (wpm < 100) {
      feedback.push("Try speaking a bit faster - aim for 120-150 WPM")
    } else if (wpm > 180) {
      feedback.push("Slow down slightly for better clarity")
    } else {
      feedback.push("Good speaking pace!")
    }
    
    if (fillerPercentage > 5) {
      feedback.push("Try to reduce filler words - practice pausing instead")
    } else {
      feedback.push("Great job minimizing filler words!")
    }
    
    return feedback
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Voice Assistant</h1>
        <p className="mt-2 text-gray-600">
          Practice speaking and get AI-powered feedback on your communication skills
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="mb-4">
                {isRecording ? (
                  <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center pulse-animation">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                      <MicrophoneIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <MicrophoneIcon className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
              
              <div className="text-2xl font-mono text-gray-700 mb-4">
                {formatTime(recordingTime)}
              </div>
              
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                >
                  <StopIcon className="w-6 h-6 mx-auto" />
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                  <MicrophoneIcon className="w-6 h-6 mx-auto" />
                </button>
              )}
            </div>

            {transcript && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Transcript</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <p className="text-gray-700">{transcript}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {loading && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your speech...</p>
              </div>
            </div>
          )}

          {analysis && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Speech Analysis</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analysis.wpm}</div>
                    <div className="text-sm text-gray-600">Words per minute</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{analysis.fillerWords}</div>
                    <div className="text-sm text-gray-600">Filler words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analysis.totalWords}</div>
                    <div className="text-sm text-gray-600">Total words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{analysis.fillerPercentage}%</div>
                    <div className="text-sm text-gray-600">Filler percentage</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
                  <ul className="space-y-1">
                    {analysis.feedback.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">Practice Scenarios</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium">Job Interview</div>
                  <div className="text-sm text-gray-600">Practice common interview questions</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium">Presentation</div>
                  <div className="text-sm text-gray-600">Work on presentation skills</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium">Casual Conversation</div>
                  <div className="text-sm text-gray-600">Improve everyday communication</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}"""
}

# Write module components
for filepath, content in module_components.items():
    with open(filepath, 'w') as f:
        f.write(content)

print("✅ Created main module components (Dashboard, Resume, Code IDE, Voice)")