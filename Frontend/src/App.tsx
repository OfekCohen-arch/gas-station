
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './assets/style/main.css'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { EditWorker } from './pages/EditWorker'
import { ShiftBoardPage } from './pages/ShiftBoardPage'
import { WorkerIndex } from './pages/WorkerIndex'

function App() {

  return (
    <Router>
    <section className='app'>
      <Routes>
        <Route element={<Login/>} path='/'/>
        <Route element={<Dashboard/>} path='/dashboard'/>
        <Route element={<EditWorker/>} path='/editWorker'/>
        <Route element={<EditWorker/>} path='/editWorker/:workerId'/>
        <Route element={<ShiftBoardPage/>} path='/shiftBoard'/>
        <Route element={<WorkerIndex/>} path='/worker'/>
      </Routes>
    </section>
    </Router>
  )
}

export default App
