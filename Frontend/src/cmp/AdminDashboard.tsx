import { useState } from "react"
import { utilService } from "../services/util.service"
import { useNavigate } from "react-router-dom"

export function AdminDashboard(){
    const [workers,setWorkers] = useState(
        [
     {
    id: 'u101',
    firstName: 'דני',
    lastName: 'כהן',
    email: 'danny@example.com',
    phone: '052-1112223',
    imgUrl: 'https://pravatar.cc',
    joinDate: Date.now()
  },
  {
    id: 'u102',
    firstName: 'מיכל',
    lastName: 'לוי',
    email: 'michal@example.com',
    phone: '054-3334445',
    imgUrl: 'https://pravatar.cc',
    joinDate: Date.now()
  },
  {
    id: 'u103',
    firstName: 'איתי',
    lastName: 'אברהם',
    email: 'itay@example.com',
    phone: '050-5556667',
    imgUrl: 'https://pravatar.cc',
    joinDate: Date.now()
  }  
    ]
    )
    const navigate = useNavigate()
    function onRemoveWorker(id : string){
    setWorkers((workers)=>workers.filter((worker)=>worker.id!==id))
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