import { useEffect, useState } from "react";
import type { Worker } from "../types/auth.ts";
import type { Constraint } from "../types/shift.ts";
import { ConstraintTable } from "../cmp/ConstraintTable.tsx";
import { workerService } from "../services/worker.service.ts";
import { ShiftTable } from "../cmp/ShiftTable.tsx";
import { constraintService } from "../services/constraint.service.ts";

export function WorkerIndex(){
    const workerId = "u102";
   
const [constraints,setConstraints] = useState<Constraint[]>([])
  const [worker, setWorker] = useState<Worker | null> (null);
  useEffect(() => {
    if(workerId) loadData(workerId)
  }, []);
  function loadData(workerId: string) {
    const w = workerService.getById(workerId)
    if(w)setWorker(w)
    const demoConstraints = constraintService.query()
 if(demoConstraints)setConstraints(demoConstraints)
  }
function onAddConstraint(day: string,type: string){
const constraintToAdd = {
id: '',
workerId,
day,
type
}
const newConstraint = constraintService.save(constraintToAdd)
if(newConstraint)setConstraints(constraints=>[...constraints,newConstraint])
}
function onRemoveConstraint(day: string,type: string){
   const idToRemove =  constraintService.remove(day,type,workerId)
    setConstraints(constraints=>[...constraints.filter(c=>c.id !== idToRemove)])
}
    return(
        <section className="worker-index">
            <h1>שלום {worker?.firstName}</h1>
      <h2>המשמרות שלי לשבוע הקרוב</h2>
      <ShiftTable isAdmin={false} currWorker={worker}/>
        <ConstraintTable constraints={constraints} worker={worker!} onAddConstraint={onAddConstraint} onRemoveConstraint={onRemoveConstraint}/>
        </section>
    )
}