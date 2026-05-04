import type { Worker } from "../types/auth"
import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"
const STORAGE_KEY = 'worker'

    export const workerService = {
        query,
        getById,
        remove,
        save
    }

    async function query() : Promise<Worker[]>{
    return storageService.query(STORAGE_KEY)    
    }
    async function getById(id: string) : Promise<Worker>{
    return storageService.get(STORAGE_KEY,id)
    }
    async function remove(id: string) : Promise<any>{
    return storageService.remove(STORAGE_KEY,id)
    }
    function save(worker : Worker,stationId : string,stationName : string) : Promise<Worker>{
    if(worker.id){
     return storageService.put(STORAGE_KEY,worker)
    }
    else{
    const id = 'u'+utilService.makeId(3)
    worker.id = id
    worker.joinDate = Date.now()
    worker.stationId = stationId
    worker.stationName = stationName
    worker.isAdmin = false
    return storageService.post(STORAGE_KEY,worker)
    }
    }