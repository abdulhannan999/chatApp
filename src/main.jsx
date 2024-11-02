import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RoomProvider from './Context.jsx'

createRoot(document.getElementById('root')).render(
  <RoomProvider>

<StrictMode>
    <App />
  </StrictMode>
  </RoomProvider>
)