import { useEffect, useState } from "react";
import type { Worker } from "../types/auth.ts";
import type { Constraint } from "../types/shift.ts";
import { ConstraintTable } from "../cmp/ConstraintTable.tsx";
import { workerService } from "../services/worker.service.ts";
import { ShiftTable } from "../cmp/ShiftTable.tsx";
import { utilService } from "../services/util.service.ts";

export function WorkerIndex(){
    const workerId = "u101";
    const demoConstraints = [
  {
    id: "c101",
    workerId: "u101",
    day: "sunday",
    type: "morning"
  },
  {
    id: "c102",
    workerId: "u101",
    day: "tuesday",
    type: "night"
  },
  {
    id: "c103",
    workerId: "u102",
    day: "wednesday",
    type: "evening"
  }
];
const [constraints,setConstraints] = useState<Constraint[]>(demoConstraints)
  const [worker, setWorker] = useState<Worker | null> (null);
  useEffect(() => {
    if(workerId) loadWorker(workerId)
  }, []);
  function loadWorker(workerId: string) {
    const w = workerService.getById(workerId)
    if(w)setWorker(w)
  }
function onAddConstraint(day: string,type: string){
const newConstraint = {
id: utilService.makeId(),
workerId,
day,
type
}
setConstraints(constraints=>[...constraints,newConstraint])
}
    return(
        <section className="worker-index">
            <h1>שלום {worker?.firstName}</h1>
      <h2>המשמרות שלי לשבוע הקרוב</h2>
      <ShiftTable isAdmin={false} currWorker={worker}/>
        <ConstraintTable constraints={constraints} worker={worker!} onAddConstraint={onAddConstraint}/>
        </section>
    )
}