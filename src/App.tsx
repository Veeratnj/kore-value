
import React from 'react'
import LayoutComponents from './components/LayoutComponents'
import { ThemeProvider } from './components/ThemeContext'

const App = () => {
  return (
    <div>
      <ThemeProvider>
         <LayoutComponents />
      </ThemeProvider>
    </div>
  )
}

export default App