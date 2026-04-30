import { useState } from "react"
import type { Worker } from "../types/auth"
import { useParams } from "react-router-dom"
export function EditWorker(){
    const {workerId} = useParams()
    const [workerToEdit,setWorkerToEdit] = useState<Partial<Worker>>({})
return(
    <section>
    <h1>{workerId? 'Edit' : 'Add'}</h1>
    </section>
)
}