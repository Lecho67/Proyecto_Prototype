import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Login } from '../Login/Login.jsx'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Login />
    </Provider>
  </React.StrictMode>,
  
)
