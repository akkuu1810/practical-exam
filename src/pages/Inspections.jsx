import { useState, useMemo } from 'react'
import InspectionsTable from '../components/InspectionsTable'
import InspectionModal from '../components/InspectionModal'

const Inspections = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingInspection, setEditingInspection] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [inspectionToDelete, setInspectionToDelete] = useState(null)

  // All inspections data
  const [allInspections, setAllInspections] = useState([
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
    }
  ])

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
  }, [searchQuery, filters, allInspections])

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

  const addInspection = (inspection) => {
    const newId = Math.max(...allInspections.map(i => i.id)) + 1
    setAllInspections([...allInspections, { ...inspection, id: newId }])
  }

  const updateInspection = (id, updatedInspection) => {
    setAllInspections(allInspections.map(i => i.id === id ? { ...i, ...updatedInspection } : i))
  }

  const deleteInspection = (id) => {
    setAllInspections(allInspections.filter(i => i.id !== id))
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Inspections</h1>
        <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 flex-1 w-full sm:flex-initial sm:justify-end">
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
                <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-20 p-4 max-h-96 overflow-y-auto">
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
          <button
            onClick={() => {
              setEditingInspection(null)
              setShowModal(true)
            }}
            className="px-4 py-2 bg-[#123a73] text-white rounded-lg hover:bg-[#123a73] transition-colors font-medium text-sm lg:text-base flex-shrink-0"
          >
            Add Inspection
          </button>
        </div>
      </div>

        {filters.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-700 font-medium">Filters Applied:</span>
            {filters.map((filter, index) => {
              const [label, value] = filter.label.split(': ')
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm border border-gray-300"
                >
                  <span className="font-normal">{label}:</span>
                  <span className="font-bold">{value}</span>
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
              )
            })}
          </div>
        )}

      <InspectionsTable
        inspections={filteredInspections}
        onEdit={(inspection) => {
          setEditingInspection(inspection)
          setShowModal(true)
        }}
        onDelete={(inspection) => {
          setInspectionToDelete(inspection)
          setShowDeleteConfirm(true)
        }}
      />

      {showModal && (
        <InspectionModal
          inspection={editingInspection}
          onSave={(inspection) => {
            if (editingInspection) {
              updateInspection(editingInspection.id, inspection)
            } else {
              addInspection(inspection)
            }
            setShowModal(false)
            setEditingInspection(null)
          }}
          onCancel={() => {
            setShowModal(false)
            setEditingInspection(null)
          }}
        />
      )}

      {showDeleteConfirm && inspectionToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">
              Are you sure you want to delete the inspection for <strong>{inspectionToDelete.customer}</strong> at <strong>{inspectionToDelete.address}</strong>?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  deleteInspection(inspectionToDelete.id)
                  setShowDeleteConfirm(false)
                  setInspectionToDelete(null)
                }}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setInspectionToDelete(null)
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inspections

