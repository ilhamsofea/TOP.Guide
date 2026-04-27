import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState('assessment')

  const value = {
    activePage,
    setActivePage,
    doctor: {
      initials: 'SK',
      name: 'Dr. Siti Khadijah',
      dept: 'Obs & Gynae · USIM',
    },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}