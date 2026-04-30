import { utilService } from "../services/util.service"

export function AdminDashboard(){
    const workers = [
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
    return(
        <div>
            <h2>רשימת עובדים</h2>
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
                <button>מחיקה</button>
                <button>עריכת פרטים</button>
                </div>
            
            </article>
            </li>
        )
        }
        </ul>
        </div>
    )
}