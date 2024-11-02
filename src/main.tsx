import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(  // esto renderizara todo el contenido en el div "root" de index html y construira la pagina
  <StrictMode>
    <App />
  </StrictMode>,
)
