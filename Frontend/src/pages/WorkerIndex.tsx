import { useEffect, useState } from "react";
import type { Worker } from "../types/auth.ts";
import type { Constraint } from "../types/shift.ts";
import { ConstraintTable } from "../cmp/ConstraintTable.tsx";
import { workerService } from "../services/worker.service.ts";
import { ShiftTable } from "../cmp/ShiftTable.tsx";
import { constraintService } from "../services/constraint.service.ts";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { LoadingSpinner } from "../cmp/LoadingSpinner.tsx";

export function WorkerIndex() {
  const { workerId } = useParams();

  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [worker, setWorker] = useState<Worker | null>(null);
  useEffect(() => {
    if (workerId) loadData(workerId);
  }, [workerId]);
  async function loadData(workerId: string) {
    const w = await workerService.getById(workerId);
    if (w) {
      setWorker(w);
      const data = await constraintService.query(w.stationId);
      setConstraints(data || []);
    }
  }
 async function onAddConstraint(day: string, type: string) {
    const stationId = worker?.stationId;
    if (!stationId) return;

    const constraintToAdd = {
      workerId,
      day,
      type,
      stationId,
    } as Constraint;

    try {
        const savedConstraint = await constraintService.save(constraintToAdd);
        setConstraints((prev) => [...prev, savedConstraint]);
    } catch (err) {
        console.error("Failed to add constraint:", err);
        Swal.fire("שגיאה בהוספת האילוץ");
    }
}

  async function onRemoveConstraint(day: string, type: string) {
    const con = constraints.find(c => c.day === day && c.type === type && c.workerId === workerId);
    
    if (!con || !con.id) {
        console.warn("No constraint found to remove");
        return;
    }

    setConstraints((prev) => prev.filter((c) => c.id !== con.id));
    
    try {
        await constraintService.remove(con.id);
    } catch (err) {
        console.error("Failed to remove from DB", err);
        loadData(workerId!); 
    }
}

  if (!worker) return <LoadingSpinner/>
  return (
    <section className="worker-index">
      <h1>שלום {worker?.firstName}</h1>
      <h2>המשמרות שלי לשבוע הקרוב בתחנת {worker.stationName}</h2>
      <ShiftTable currWorker={worker} />
      <ConstraintTable
        constraints={constraints}
        worker={worker!}
        onAddConstraint={onAddConstraint}
        onRemoveConstraint={onRemoveConstraint}
      />
    </section>
  );
}
