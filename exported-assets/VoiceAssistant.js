'use client'
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
      const fillerWords = (transcript.match(/\b(um|uh|like|you know|so|actually)\b/gi) || []).length
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
}