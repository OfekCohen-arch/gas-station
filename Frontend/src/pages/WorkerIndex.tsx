import { useEffect, useState } from "react";
import type { Worker } from "../types/auth.ts";
import type { Constraint } from "../types/shift.ts";
import { ConstraintTable } from "../cmp/ConstraintTable.tsx";
import { workerService } from "../services/worker.service.ts";
import { ShiftTable } from "../cmp/ShiftTable.tsx";
import { constraintService } from "../services/constraint.service.ts";
import { utilService } from "../services/util.service.ts";
import { useParams } from "react-router-dom";

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
    const tempId = "temp-" + utilService.makeId(3);
    const stationId = worker?.stationId;
    const constraintToAdd = {
      id: tempId,
      workerId,
      day,
      type,
      stationId,
    } as Constraint;

    setConstraints((prev) => [...prev, constraintToAdd]);
    const savedConstraint = await constraintService.save(constraintToAdd);

    setConstraints((prev) =>
      prev.map((c) => (c.id === tempId ? savedConstraint : c)),
    );
  }
  async function onRemoveConstraint(day: string, type: string) {
    const con = await constraintService.getConstraint(workerId!, day, type);
    if (!con || !con.id) {
      console.warn("No constraint found to remove");
      return;
    }
    setConstraints((prev) => prev.filter((c) => c.id !== con.id));
    try {
      await constraintService.remove(con.id);
    } catch (err) {
      console.error("Failed to remove from DB", err);
      const freshConstraints = await constraintService.query(
        worker?.stationId!,
      );
      setConstraints(freshConstraints);
    }
  }
  if (!worker) return <div>פרטי עובד נטענים...</div>;
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
