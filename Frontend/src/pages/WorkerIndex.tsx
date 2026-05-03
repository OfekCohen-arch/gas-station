import { useEffect, useState } from "react";
import type { Worker } from "../types/auth.ts";
import { ConstraintTable } from "../cmp/ConstraintTable.tsx";
import { workerService } from "../services/worker.service.ts";
import { ShiftTable } from "../cmp/ShiftTable.tsx";

export function WorkerIndex(){
    const workerId = "u101";
  const [worker, setWorker] = useState<Worker | null> (null);
  useEffect(() => {
    if(workerId) loadWorker(workerId)
  }, []);
  function loadWorker(workerId: string) {
    const w = workerService.getById(workerId)
    if(w)setWorker(w)
  }
    return(
        <section className="worker-index">
            <h1>שלום {worker?.firstName}</h1>
      <h2>המשמרות שלי לשבוע הקרוב</h2>
      <ShiftTable isAdmin={false} currWorker={worker}/>
        <ConstraintTable/>
        </section>
    )
}