'use client'
import { useState } from 'react'

export default function InvoiceGenerator() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    clientName: '',
    clientAddress: '',
    invoiceNumber: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
  })

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    })
  }

  const updateItem = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value }
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate
        }
        return updatedItem
      }
      return item
    })
    setFormData({ ...formData, items: updatedItems })
  }

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    })
  }

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + item.amount, 0).toFixed(2)
  }

  const generateInvoice = () => {
    alert('Invoice PDF would be generated and downloadable')
  }

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
        <p className="mt-2 text-gray-600">Create professional invoices for your freelance work</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Company/Your Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Your Address"
                  value={formData.companyAddress}
                  onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Client Address"
                  value={formData.clientAddress}
                  onChange={(e) => setFormData({...formData, clientAddress: e.target.value})}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
              <input
                type="text"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Items</h3>
              <button
                onClick={addItem}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">${item.amount.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-700"
                          disabled={formData.items.length === 1}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div></div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">
                Total: ${calculateTotal()}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={generateInvoice}
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Generate Invoice PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}