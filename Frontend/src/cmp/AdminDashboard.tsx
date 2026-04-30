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
        <ul>
        {
        workers.map(worker=>
            <li key={worker.id}>
            <div>
            <p>{worker.firstName+' '+worker.lastName}</p>
            </div>
            </li>
        )
        }
        </ul>
        </div>
    )
}