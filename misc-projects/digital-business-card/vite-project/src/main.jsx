import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log("main.jsx is connected and working")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
