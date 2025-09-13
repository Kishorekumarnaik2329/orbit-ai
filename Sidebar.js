'use client'
import { 
  HomeIcon, 
  DocumentTextIcon, 
  PresentationChartBarIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  BriefcaseIcon,
  UserCircleIcon 
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: 'dashboard', icon: HomeIcon },
  { name: 'Resume Builder', href: 'resume', icon: DocumentTextIcon },
  { name: 'Portfolio', href: 'portfolio', icon: UserCircleIcon },
  { name: 'Documents', href: 'documents', icon: DocumentTextIcon },
  { name: 'Presentations', href: 'presentations', icon: PresentationChartBarIcon },
  { name: 'Invoices', href: 'invoices', icon: BriefcaseIcon },
  { name: 'Chat Rooms', href: 'chat', icon: ChatBubbleLeftRightIcon },
  { name: 'AI Assistant', href: 'ai-chat', icon: ChatBubbleLeftRightIcon },
  { name: 'Code IDE', href: 'code', icon: CodeBracketIcon },
  { name: 'Voice Practice', href: 'voice', icon: MicrophoneIcon },
]

export default function Sidebar({ currentModule, onNavigate }) {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">🌌 ORBIT AI</h1>
      </div>
      <nav className="mt-5">
        <div className="px-2">
          {navigation.map((item) => {
            const isActive = currentModule === item.href
            return (
              <button
                key={item.name}
                onClick={() => onNavigate(item.href)}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}