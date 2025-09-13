'use client'
import { useState, useEffect } from 'react'

export default function Toaster() {
  const [toasts, setToasts] = useState([])

  // This would typically be connected to a toast context or service
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 ${
            toast.type === 'error' ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'
          }`}
        >
          <div className="p-4">
            <div className="text-sm text-gray-900">{toast.message}</div>
          </div>
        </div>
      ))}
    </div>
  )
}