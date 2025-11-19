import { useEffect } from 'react'

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isOpen, setIsOpen }) => {

  const DashboardIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )

  const CalendarIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )

  const InspectionsIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      <circle cx="18" cy="18" r="2.5" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 20l-1.5-1.5" />
    </svg>
  )

  const ReportsIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )

  const CustomersIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )

  const InspectorsIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )

  const navigationItems = [
    { icon: DashboardIcon, label: 'Dashboard', active: false },
    { icon: CalendarIcon, label: 'Calendar', active: false },
    { icon: InspectionsIcon, label: 'Inspections', active: true },
    { icon: ReportsIcon, label: 'Reports', active: false },
  ]

  const managementItems = [
    { icon: CustomersIcon, label: 'Customers', active: false },
    { icon: InspectorsIcon, label: 'Inspectors', active: false },
  ]

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsMobileOpen])

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 lg:p-6">
          <div className="mb-8">
           <div className={`transition-opacity ${isOpen ? 'opacity-100 w-[150px]' : 'opacity-0 w-0'} overflow-hidden`}>
  <div className="font-extrabold text-lg lg:text-xl text-[#123a73] leading-none">
    MYPROPERTY
  </div>

  <div className="text-red-600 font-semibold tracking-[0.5em] text-sm leading-none mt-1">
    I N S U R E
  </div>
</div>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden mt-2"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        <div className="space-y-6">
          <div>
            <h2 className={`text-xs font-semibold text-[#123a73] uppercase tracking-wider mb-3 ${
              isOpen ? 'block pl-4' : 'hidden'
            }`}>
              NAVIGATION
            </h2>
            <nav className="space-y-1">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={index}
                    href="#"
                    className={`flex items-center py-3 transition-colors ${
                      isOpen ? 'gap-3 px-4' : 'justify-center px-2'
                    } ${
                    item.active
  ? 'bg-[#123a73] text-white rounded-r-full'
  : 'text-gray-700 hover:bg-gray-100 rounded-lg'

                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className={isOpen ? 'block' : 'hidden'}>{item.label}</span>
                  </a>
                )
              })}
            </nav>
          </div>

          <div>
            <h2 className={`text-xs font-semibold text-[#123a73] uppercase tracking-wider mb-3 ${
              isOpen ? 'block pl-4' : 'hidden'
            }`}>
              MANAGEMENT
            </h2>
            <nav className="space-y-1">
              {managementItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={index}
                    href="#"
                    className={`flex items-center py-3 transition-colors ${
                      isOpen ? 'gap-3 px-4' : 'justify-center px-2'
                    } ${
                      item.active
                        ? 'bg-[#123a73] text-white rounded-r-lg'
                        : 'text-gray-700 hover:bg-gray-100 rounded-lg'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className={isOpen ? 'block' : 'hidden'}>{item.label}</span>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

