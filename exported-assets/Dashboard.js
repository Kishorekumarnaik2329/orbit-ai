'use client'
import { useState } from 'react'
import Sidebar from './layout/Sidebar'
import TopBar from './layout/TopBar'
import DashboardHome from './modules/DashboardHome'
import ResumeBuilder from './modules/ResumeBuilder'
import PortfolioGenerator from './modules/PortfolioGenerator'
import DocumentDesigner from './modules/DocumentDesigner'
import PresentationDesigner from './modules/PresentationDesigner'
import InvoiceGenerator from './modules/InvoiceGenerator'
import ChatRooms from './modules/ChatRooms'
import AIChat from './modules/AIChat'
import CodeIDE from './modules/CodeIDE'
import VoiceAssistant from './modules/VoiceAssistant'

export default function Dashboard() {
  const [currentModule, setCurrentModule] = useState('dashboard')

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <DashboardHome onNavigate={setCurrentModule} />
      case 'resume':
        return <ResumeBuilder />
      case 'portfolio':
        return <PortfolioGenerator />
      case 'documents':
        return <DocumentDesigner />
      case 'presentations':
        return <PresentationDesigner />
      case 'invoices':
        return <InvoiceGenerator />
      case 'chat':
        return <ChatRooms />
      case 'ai-chat':
        return <AIChat />
      case 'code':
        return <CodeIDE />
      case 'voice':
        return <VoiceAssistant />
      default:
        return <DashboardHome onNavigate={setCurrentModule} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentModule={currentModule} onNavigate={setCurrentModule} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  )
}