import { useState, useEffect } from 'react'

const InspectionModal = ({ inspection, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: '',
    address: '',
    status: 'Scheduled',
    types: [],
    inspector: '',
    date: '',
  })

  useEffect(() => {
    if (inspection) {
      // Convert date from MM/DD/YYYY to YYYY-MM-DD for date input
      const formattedDate = inspection.date ? inspection.date.split('/').reverse().join('-') : ''
      setFormData({ ...inspection, date: formattedDate })
    } else {
      setFormData({
        customer: '',
        address: '',
        status: 'Scheduled',
        types: [],
        inspector: '',
        date: '',
      })
    }
  }, [inspection])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Convert date from YYYY-MM-DD to MM/DD/YYYY for display
    const formattedDate = formData.date ? formData.date.split('-').reverse().join('/') : ''
    const dataToSave = { ...formData, date: formattedDate }
    onSave(dataToSave)
  }

  const handleTypeChange = (type, checked) => {
    if (checked) {
      setFormData({ ...formData, types: [...formData.types, type] })
    } else {
      setFormData({ ...formData, types: formData.types.filter(t => t !== type) })
    }
  }

  const typeOptions = ['AMHI', '4-Point', 'Wind Mitigation', 'Roof Cert']
  const statusOptions = ['Completed', 'In Progress', 'Scheduled']

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {inspection ? 'Edit Inspection' : 'Add Inspection'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Types
            </label>
            <div className="space-y-2">
              {typeOptions.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.types.includes(type)}
                    onChange={(e) => handleTypeChange(type, e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inspector
            </label>
            <input
              type="text"
              value={formData.inspector}
              onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
            >
              {inspection ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InspectionModal
