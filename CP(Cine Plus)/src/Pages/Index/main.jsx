import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Comidas } from '../Comidas/Comidas.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Comidas/>
  </React.StrictMode>,
)
