
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './assets/style/main.css'
import { Login } from './pages/Login'
import { EditWorker } from './pages/EditWorker'
import { ShiftBoardPage } from './pages/ShiftBoardPage'
import { WorkerIndex } from './pages/WorkerIndex'
import { AdminIndex } from './pages/AdminIndex'
import { Signup } from './pages/Signup'

function App() {

  return (
    <Router>
    <section className='app'>
      <Routes>
        <Route element={<Login/>} path='/'/>
        <Route element={<Signup/>} path='/signup'/>
        <Route element={<AdminIndex/>} path='/admin'/>
        <Route element={<EditWorker/>} path='/editWorker'/>
        <Route element={<EditWorker/>} path='/editWorker/:workerId'/>
        <Route element={<ShiftBoardPage/>} path='/shiftBoard'/>
        <Route element={<WorkerIndex/>} path='/worker/:workerId'/>
      </Routes>
    </section>
    </Router>
  )
}

export default App
