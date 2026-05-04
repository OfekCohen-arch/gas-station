import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { workerService } from "../services/worker.service"
import type { Worker } from "../types/auth"
import { authService } from "../services/auth.service"
import Swal from "sweetalert2"
export function AdminIndex(){
    const [workers,setWorkers] = useState<Worker[]>([])
    const admin = authService.getLoggedInUser()
    const navigate = useNavigate()
    useEffect(()=>{
        loadWorkers()
    },[])
     async function loadWorkers(){
     const workersData = await workerService.query(admin?.stationId!)   
     const onlyWorkers = workersData.filter(w=>!w.isAdmin)
     setWorkers(onlyWorkers)
    }
    async function onRemoveWorker(id : string){
   try {
    const result = await Swal.fire({
            title: 'שים לב!',
            text: 'האם אתה בטוח שהינך רוצה למחוק עובד זה?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'כן, מחק עובד זה',
            cancelButtonText: 'ביטול'
        })
        if(!result.isConfirmed) return
       await workerService.remove(id)
        setWorkers((prev) => prev.filter(w => w.id !== id))
    } catch (err) {
        console.error('בעיה במחיקת עובד:', err)
        alert('לא ניתן למחוק את העובד כרגע')
    }
    }
    if (!admin) return <div>מתבצעת התחברות...</div>
    return(
        <section className="admin-index main-layout">
    <header className="admin-header">
        <div className="title-section">
            <h2>ניהול עובדים</h2>
            <p>בתחנת {admin?.stationName}</p>
        </div>
        <button className="add-worker-btn" onClick={() => navigate('/editWorker')}>
            <span>+</span> הוספת עובד חדש
        </button>
    </header>

    <div className="workers-grid">
        {workers.map(worker => (
            <article key={worker.id} className="worker-card">
                <div className="worker-avatar">
                    {worker.firstName.charAt(0)}{worker.lastName.charAt(0)}
                </div>
                
                <div className="worker-details">
                    <h3>{worker.firstName} {worker.lastName}</h3>
                    <p className="worker-role">מתדלק / עובד חנות</p>
                    <div className="contact-info">
                        <span>📞 {worker.phone}</span>
                        <span>✉️ {worker.email}</span>
                    </div>
                </div>

                <div className="worker-actions">
                    <button className="btn-edit" onClick={() => navigate(`/editWorker/${worker.id}`)}>עריכה</button>
                    <button className="btn-delete" onClick={() => onRemoveWorker(worker.id)}>מחיקה</button>
                </div>
            </article>
        ))}
    </div>
</section>
    )
}