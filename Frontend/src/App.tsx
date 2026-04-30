
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './assets/style/main.css'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

function App() {

  return (
    <Router>
    <section>
      <Routes>
        <Route element={<Login/>} path='/'/>
        <Route element={<Dashboard/>} path='dashboard'/>
        
      </Routes>
    </section>
    </Router>
  )
}

export default App
