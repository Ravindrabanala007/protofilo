import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PortfolioProvider } from './context/PortfolioContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
