import type { Worker } from "../types/auth"
import { storageService } from "./async-storage.service"
import { authService } from "./auth.service"
import { supabase } from "./supabase.service"

    export const workerService = {
        query,
        getById,
        remove,
        save
    }

    async function query(stationId : string) : Promise<Worker[]>{
    const {data,error} = await supabase.from('workers')
    .select('*')
    .eq('stationId', stationId)
    if (error) {
        console.error('Error fetching workers:', error)
        return []
    }
    return data
    }
    async function getById(id: string) : Promise<Worker | null>{
    const {data,error} = await supabase.from('workers')
    .select('*')
    .eq('id',id)
    .single()
    if (error) {
        console.error(`Error fetching worker by id: ${id}`, error)
        return null
    }
    return data
    }
    async function remove(id: string) : Promise<any>{
    const shifts = await storageService.query('shift')
    const workerShifts = shifts.filter(s => s.workerId === id)
     const shiftPromises = workerShifts.map(s => storageService.remove('shift', s.id))
    await Promise.all(shiftPromises)
    const constraints = await storageService.query('constraint')
    const workerConstraints = constraints.filter(c => c.workerId === id)
    
    const constraintPromises = workerConstraints.map(c => storageService.remove('constraint', c.id))
    await Promise.all(constraintPromises)
    const { error } = await supabase
        .from('workers')
        .delete()
        .eq('id', id);

    if (error) throw error;
    }
    async function save(worker : Worker,stationId : string,stationName : string) : Promise<Worker>{
    if(worker.id){
        const {id,...updatedData} = worker
     const { data,error } = await supabase
        .from('workers')
        .update(updatedData)
        .eq('id',worker.id)
        .select()
        .single()

    if (error) throw error;
    return data
    }
    else{
    worker.stationId = stationId;
    worker.stationName = stationName;
    const {email,firstName,lastName,phone,password} = worker
    const newWorker = await authService.signup({email,firstName,lastName,phone,password,stationName},false,stationId)
     return newWorker
    }
    }