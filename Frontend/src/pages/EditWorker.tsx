import React, { useEffect, useState } from "react";
import type { Worker } from "../types/auth";
import { useNavigate, useParams } from "react-router-dom";
import { workerService } from "../services/worker.service";

export function EditWorker() {
  const { workerId } = useParams();
  const navigate = useNavigate()
  const [workerToEdit, setWorkerToEdit] = useState<Partial<Worker>>({});
  useEffect(() => {
    if (workerId) loadWorker(workerId);
  }, []);
  async function loadWorker(id: string) {
    const workerData = await workerService.getById(id);
    if (workerData) setWorkerToEdit(workerData);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const field = event.target.name;
    let value = event.target.value;
    setWorkerToEdit((worker) => ({ ...worker, [field]: value }));
  }
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    await workerService.save(workerToEdit as Worker)
    navigate(`/admin`)
  }
  return (
    <section className="edit-worker">
      <h1>{workerId ? "עריכת פרטי העובד" : "הוסף עובד חדש"}</h1>
      <form className="add-worker-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="שם פרטי"
          required
          value={workerToEdit.firstName || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="שם משפחה"
          required
          value={workerToEdit.lastName || ""}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="מספר טלפון"
          required
          value={workerToEdit.phone || ""}
          onChange={handleChange}
        />
        {!workerId && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="email"
              name="email"
              placeholder="כתובת דואל"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="סיסמה"
              required
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit">{workerId ? "שמור" : "הוסף"}</button>
      </form>
    </section>
  );
}
