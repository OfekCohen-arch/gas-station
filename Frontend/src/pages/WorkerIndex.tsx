import { useEffect, useState } from "react";
import type { Worker } from "../types/auth.ts";
import type { Constraint } from "../types/shift.ts";
import { ConstraintTable } from "../cmp/ConstraintTable.tsx";
import { workerService } from "../services/worker.service.ts";
import { ShiftTable } from "../cmp/ShiftTable.tsx";
import { constraintService } from "../services/constraint.service.ts";
import { utilService } from "../services/util.service.ts";

export function WorkerIndex() {
  const workerId = "u102";

  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [worker, setWorker] = useState<Worker | null>(null);
  useEffect(() => {
    if (workerId) loadData(workerId);
  }, []);
  async function loadData(workerId: string) {
    const w = await workerService.getById(workerId);
    if (w) setWorker(w);
    const demoConstraints = await constraintService.query();
    if (demoConstraints) setConstraints(demoConstraints);
  }
  async function onAddConstraint(day: string, type: string) {
    const tempId = 'temp-' + utilService.makeId(3);
    const constraintToAdd = { id: tempId, workerId, day, type };
    
    setConstraints(prev => [...prev, constraintToAdd]);
    const savedConstraint = await constraintService.save(constraintToAdd);

    setConstraints(prev => 
        prev.map(c => c.id === tempId ? savedConstraint : c)
    );
  }
  async function onRemoveConstraint(id: string) {
     const constraintToRemove = constraints.find(c => 
        c.id === id
    );

    if (!constraintToRemove) return;

    setConstraints(prev => prev.filter(c => c.id !== constraintToRemove.id));

    try {
        await constraintService.remove(id);
    } catch (err) {
        console.error('Failed to remove from DB', err);
        const freshConstraints = await constraintService.query();
        setConstraints(freshConstraints);
        
  }
}
  if(!worker) return <div>פרטי עובד נטענים...</div>
  return (
    <section className="worker-index">
      <h1>שלום {worker?.firstName}</h1>
      <h2>המשמרות שלי לשבוע הקרוב</h2>
      <ShiftTable isAdmin={false} currWorker={worker} />
      <ConstraintTable
        constraints={constraints}
        worker={worker!}
        onAddConstraint={onAddConstraint}
        onRemoveConstraint={onRemoveConstraint}
      />
    </section>
  );
}
