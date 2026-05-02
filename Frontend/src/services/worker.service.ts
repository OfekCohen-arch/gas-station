import type { Worker } from "../types/auth"
import { utilService } from "./util.service"
const workers = [
     {
    id: 'u101',
    firstName: 'גאיה',
    lastName: 'כלף',
    email: 'gaya@example.com',
    phone: '052-1112223',
    password:'bbb',
    joinDate: Date.now()
  },
  {
    id: 'u102',
    firstName: 'שלו',
    lastName: 'ארדזי',
    email: 'shalev@example.com',
    phone: '054-3334445',
    password:'bbb',
    joinDate: Date.now()
  },
  {
    id: 'u103',
    firstName: 'מיכל',
    lastName: 'יפרח',
    email: 'michal@example.com',
    phone: '050-5556667',
    password:'bbb',
    joinDate: Date.now()
  },
  {
    id: 'u104',
    firstName: 'יואב',
    lastName: 'רונן',
    email: 'yoav@example.com',
    phone: '050-5556667',
    password:'bbb',
    joinDate: Date.now()
  }   
    ]

    export const workerService = {
        query,
        getById,
        remove,
        save
    }

    function query() : Worker[]{
    return workers    
    }
    function getById(id: string) : Worker | undefined{
    return workers.find(worker=>worker.id === id)
    }
    function remove(id: string){
    const idx = workers.findIndex(w=>w.id === id)
    if(idx === -1) return 
    else workers.splice(idx,1)
    }
    function save(worker : Worker){
    if(worker.id){
     const idx = workers.findIndex(currWorker => currWorker.id === worker.id)
        workers[idx] = worker
    }
    else{
    const id = 'u'+utilService.makeId(3)
    worker.id = id
    worker.joinDate = Date.now()
    workers.push(worker)
    }
    }