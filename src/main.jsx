import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <p class="credit">Coded by <a target="_blank" href="https://github.com/MohamDah">Mohamed Dahab</a>
      <small>
        Check the <a target="_blank" href="https://github.com/MohamDah/tenzies">
          source code</a>
      </small>
    </p>
  </StrictMode>,
)
