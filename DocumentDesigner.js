'use client'
import { useState } from 'react'
import { DocumentIcon, DownloadIcon } from '@heroicons/react/24/outline'

const templates = [
  { id: 'report', name: 'Business Report', description: 'Professional business report template' },
  { id: 'essay', name: 'Academic Essay', description: 'Structured academic essay format' },
  { id: 'proposal', name: 'Project Proposal', description: 'Comprehensive project proposal template' }
]

export default function DocumentDesigner() {
  const [activeTab, setActiveTab] = useState('create')
  const [selectedTemplate, setSelectedTemplate] = useState('report')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    outline: '',
    documentType: 'report'
  })
  const [generatedContent, setGeneratedContent] = useState('')

  const handleGenerate = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`# ${formData.title}

## Executive Summary
This document provides a comprehensive overview of ${formData.topic}.

## Introduction
[AI-generated introduction based on your outline]

## Main Content
${formData.outline.split('\n').map(point => point.trim() ? `### ${point}\n[Generated content for ${point}]` : '').join('\n\n')}

## Conclusion
[AI-generated conclusion summarizing key points]

## Recommendations
[AI-generated recommendations based on the content]`)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="max-w-6xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Document Designer</h1>
        <p className="mt-2 text-gray-600">Create professional documents with AI assistance</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'create' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Document
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'create' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Document Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Topic/Subject</label>
                    <input
                      type="text"
                      value={formData.topic}
                      onChange={(e) => setFormData({...formData, topic: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Document Type</label>
                    <select
                      value={formData.documentType}
                      onChange={(e) => setFormData({...formData, documentType: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="report">Business Report</option>
                      <option value="essay">Academic Essay</option>
                      <option value="proposal">Project Proposal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Outline (one point per line)</label>
                    <textarea
                      value={formData.outline}
                      onChange={(e) => setFormData({...formData, outline: e.target.value})}
                      rows={6}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your key points, one per line..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Generating Document...' : 'Generate with AI'}
                  </button>
                </form>
              </div>

              <div>
                <div className="bg-gray-50 rounded-lg p-4 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Preview</h3>
                    {generatedContent && (
                      <button className="text-blue-600 hover:text-blue-700 flex items-center">
                        <DownloadIcon className="w-4 h-4 mr-1" />
                        Export
                      </button>
                    )}
                  </div>
                  <div className="prose prose-sm max-w-none">
                    {generatedContent ? (
                      <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                    ) : (
                      <p className="text-gray-500">Generated content will appear here...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <DocumentIcon className="w-12 h-12 text-gray-400 mb-3" />
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}