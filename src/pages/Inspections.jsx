import { useState, useMemo } from 'react'
import InspectionsTable from '../components/InspectionsTable'

const Inspections = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState([])
  const [showFilterModal, setShowFilterModal] = useState(false)

  // All inspections data
  const allInspections = [
    {
      id: 1,
      customer: 'Michael Thompson',
      address: '452 Palm Ave, Orlando',
      status: 'Completed',
      types: ['AMHI'],
      inspector: 'John Smith',
      date: '09/05/2025',
    },
    {
      id: 2,
      customer: 'Priya Shah',
      address: '128 Ocean Dr, Miami',
      status: 'In Progress',
      types: ['4-Point', 'AMHI'],
      inspector: 'Sunita Patel',
      date: '09/07/2025',
    },
    {
      id: 3,
      customer: 'Sofia Martinez',
      address: '76 Riverwalk, Tampa',
      status: 'Scheduled',
      types: ['Wind Mitigation', 'AMHI'],
      inspector: 'Maria Davis',
      date: '09/12/2025',
    },
    {
      id: 4,
      customer: 'David Johnson',
      address: '902 Pine St, Jacksonville',
      status: 'Completed',
      types: ['Roof Cert', 'Wind Mitigation'],
      inspector: 'Liam Johnson',
      date: '09/13/2025',
    },
    {
      id: 5,
      customer: 'Anthony Rossi',
      address: '902 Pine St, Jacksonville',
      status: 'Scheduled',
      types: ['AMHI'],
      inspector: 'Carlos Rivera',
      date: '09/18/2025',
    },
    {
      id: 6,
      customer: 'Emily Carter',
      address: '145 Bayfront Ave, Sarasota',
      status: 'Completed',
      types: ['Wind Mitigation'],
      inspector: 'John Smith',
      date: '09/10/2025',
    },
    {
      id: 7,
      customer: 'Raj Mehta',
      address: '67 Coral Way, Fort Lauderdale',
      status: 'In Progress',
      types: ['AMHI', 'Wind Mitigation'],
      inspector: 'Liam Johnson',
      date: '09/14/2025',
    },
    {
      id: 8,
      customer: 'Olivia Hernandez',
      address: '220 Palm Grove Blvd, West Palm Beach',
      status: 'Scheduled',
      types: ['Roof Cert', '4-Point'],
      inspector: 'Maria Davis',
      date: '09/16/2025',
    },
    {
      id: 9,
      customer: 'James Wilson',
      address: '89 Seaside Dr, Clearwater',
      status: 'Completed',
      types: ['4-Point'],
      inspector: 'Carlos Rivera',
      date: '09/20/2025',
    },
    {
      id: 10,
      customer: 'Isabella Rossi',
      address: '512 Magnolia Ln, Tallahassee',
      status: 'Scheduled',
      types: ['AMHI', '4-Point'],
      inspector: 'Sunita Patel',
      date: '09/22/2025',
    },
  ]

  // Filter inspections based on search query and filters
  const filteredInspections = useMemo(() => {
    let filtered = [...allInspections]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (inspection) =>
          inspection.customer.toLowerCase().includes(query) ||
          inspection.address.toLowerCase().includes(query) ||
          inspection.inspector.toLowerCase().includes(query) ||
          inspection.types.some((type) => type.toLowerCase().includes(query))
      )
    }

    // Apply status filters
    const statusFilters = filters.filter((f) => f.type === 'status')
    if (statusFilters.length > 0) {
      const statusValues = statusFilters.map((f) => f.value)
      filtered = filtered.filter((inspection) => statusValues.includes(inspection.status))
    }

    // Apply type filters
    const typeFilters = filters.filter((f) => f.type === 'type')
    if (typeFilters.length > 0) {
      const typeValues = typeFilters.map((f) => f.value)
      filtered = filtered.filter((inspection) =>
        inspection.types.some((type) => typeValues.includes(type))
      )
    }

    return filtered
  }, [searchQuery, filters])

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index))
  }

  const addFilter = (type, value, label) => {
    // Check if filter already exists
    const exists = filters.some((f) => f.type === type && f.value === value)
    if (!exists) {
      setFilters([...filters, { type, value, label }])
    }
    setShowFilterModal(false)
  }

  const statusOptions = ['Completed', 'In Progress', 'Scheduled']
  const typeOptions = ['AMHI', '4-Point', 'Wind Mitigation', 'Roof Cert']

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Inspections</h1>
        <div className="flex items-center gap-2 lg:gap-3 flex-1 w-full sm:flex-initial sm:justify-end">
          <div className="relative flex-1 sm:max-w-md">
            <input
              type="text"
              placeholder="Search inspection"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm lg:text-base text-left"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterModal(!showFilterModal)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            {showFilterModal && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowFilterModal(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20 p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Status</h3>
                      <div className="space-y-2">
                        {statusOptions.map((status) => (
                          <label key={status} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.some((f) => f.type === 'status' && f.value === status)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  addFilter('status', status, `Status: ${status}`)
                                } else {
                                  setFilters(filters.filter((f) => !(f.type === 'status' && f.value === status)))
                                }
                              }}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-gray-700">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Type</h3>
                      <div className="space-y-2">
                        {typeOptions.map((type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.some((f) => f.type === 'type' && f.value === type)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  addFilter('type', type, `Type: ${type}`)
                                } else {
                                  setFilters(filters.filter((f) => !(f.type === 'type' && f.value === type)))
                                }
                              }}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm lg:text-base flex-shrink-0">
            Add Inspection
          </button>
        </div>
      </div>

      {filters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-700 font-medium">Filters Applied:</span>
          {filters.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {filter.label}
              <button
                onClick={() => removeFilter(index)}
                className="hover:text-gray-900 transition-colors"
                aria-label={`Remove ${filter.label} filter`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      <InspectionsTable inspections={filteredInspections} />
    </div>
  )
}

export default Inspections

