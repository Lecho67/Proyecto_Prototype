import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Login } from '../Login/Login.jsx'
import {Registro} from '../Login/Registro.jsx'
import { Provider } from 'react-redux'
import { store } from '../../redux/store.js'
import { MovieProvider } from '../../context/movieContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <MovieProvider>
        <App />
    </MovieProvider>
    </Provider>
  </React.StrictMode>,
  
)
