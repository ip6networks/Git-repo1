import { Buffer } from 'buffer';
import { StrictMode } from 'react'

// Polyfill Buffer and process for gray-matter
window.Buffer = Buffer;
window.process = window.process || { env: {} };

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
