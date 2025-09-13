'use client'
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
}