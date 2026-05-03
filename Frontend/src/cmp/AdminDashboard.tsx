import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { useNavigate } from "react-router-dom"
import { workerService } from "../services/worker.service"
import type { Worker } from "../types/auth"
export function AdminDashboard(){
    const [workers,setWorkers] = useState<Worker[]>([])
    const navigate = useNavigate()
    useEffect(()=>{
        loadWorkers()
    },[])
     async function loadWorkers(){
     const workersData = await workerService.query()   
     setWorkers(workersData)
    }
    function onRemoveWorker(id : string){
   try {
        workerService.remove(id)
        setWorkers((prev) => prev.filter(w => w.id !== id))
    } catch (err) {
        console.error('בעיה במחיקת עובד:', err)
        alert('לא ניתן למחוק את העובד כרגע')
    }
    }
    return(
        <div>
            <h2>רשימת עובדים</h2>
            <button onClick={()=>{navigate(`/editWorker`)}}>הוספת עובד חדש</button>
        <ul>
        {
        workers.map(worker=>
            <li key={worker.id}>
            <article className="worker-card">
                <div className="worker-info">
            <p>{worker.firstName+' '+worker.lastName}</p>
            <p>טלפון: {worker.phone}</p>
            <p> {worker.email} :כתובת דוא"ל </p>
            <p>תחילת עבודה: {utilService.getDate(worker.joinDate)}</p>
                </div>
                <div className="worker-actions">
                <button>צפייה</button>
                <button onClick={()=>{onRemoveWorker(worker.id)}}>מחיקה</button>
                <button onClick={()=>{navigate(`/editWorker/${worker.id}`)}}>עריכת פרטים</button>
                </div>
            
            </article>
            </li>
        )
        }
        </ul>
        </div>
    )
}