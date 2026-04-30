
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import { Login } from './pages/Login'

function App() {

  return (
    <Router>
    <section>
      <Routes>
        <Route element={<Login/>} path='/'/>

        
      </Routes>
    </section>
    </Router>
  )
}

export default App
