import { useEffect, useState } from "react";
import type { Shift } from "../types/shift";
import type { Worker } from "../types/auth";
import { workerService } from "../services/worker.service";
import { shiftService } from "../services/shift.service";
import Swal from "sweetalert2";
import { WorkersModal } from "./WorkersModal";
export function ShiftTable() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  const [selectedSlot, setSelectedSlot] = useState({ day: '', type: '' });

  const days = [
    { he: "יום ראשון", en: "sunday" },
    { he: "יום שני", en: "monday" },
    { he: "יום שלישי", en: "tuesday" },
    { he: "יום רביעי", en: "wednesday" },
    { he: "יום חמישי", en: "thursday" },
    { he: "יום שישי", en: "friday" },
    { he: "יום שבת", en: "saturday" },
  ] as const;
  const shiftTypes = ["morning", "evening", "night"] as const;

  useEffect(() => {
    setWorkers(workerService.query());
    setShifts(shiftService.query());
  }, []);
  
  function openModal(day: string,type:string){
    setSelectedSlot({ day, type });
    setIsModalOpen(true);
  }
  function getWorkerInShift(day: string, type: string) {
    const shift = shifts.find((s) => s.day === day && s.type === type);
    if (!shift || !shift.id) return null;

    return workers.find((w) => w.id === shift.workerId);
  }
  function onAddWorkerToShift(day: string, type: string, workerId : string) {
    if (!workerId) return;
    const isWorkingSameDay = shiftTypes.some(
      (shiftType) =>
        shiftType !== type && getWorkerInShift(day, shiftType)?.id === workerId,
    );

    if (isWorkingSameDay) {
      Swal.fire("עובד זה כבר משובץ למשמרת אחרת היום");
      return;
    }
    const dayIdx = days.findIndex((d) => d.en === day);
    const nextDay = days[dayIdx + 1];
    if (
      nextDay &&
      type === "night" &&
      getWorkerInShift(nextDay.en, "morning")?.id === workerId
    ) {
      Swal.fire("עובד זה משובץ בבוקר שלמחרת - חובה להשאיר זמן למנוחה");
      return;
    }

    const prevDay = days[dayIdx - 1];
    if (
      prevDay &&
      type === "morning" &&
      getWorkerInShift(prevDay.en, "night")?.id === workerId
    ) {
      Swal.fire("עובד זה עבד בלילה שלפני - חובה להשאיר זמן למנוחה");
      return;
    }
    const newShift: Shift = {
      id: "",
      day: day as any,
      type: type as any,
      workerId: workerId,
    };
    const existingShift = shifts.find((s) => s.day === day && s.type === type);
    if (existingShift) {
      const shiftToUpdate = { ...existingShift, workerId: workerId };
      shiftService.save(shiftToUpdate);
    } else {
      shiftService.save(newShift);
    }
    setShifts([...shiftService.query()]);
  }
  function onRemoveShift(day: string, type: string) {
    const shift = shifts.find((s) => s.day === day && s.type === type);
    if (shift) {
      shiftService.remove(shift.id);
      setShifts([...shiftService.query()]);
    }
  }

  return (
    <section className="shift-table">
      <table border={1} style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>יום / משמרת</th>
            <th>בוקר</th>
            <th>ערב</th>
            <th>לילה</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day.en}>
              <td>{day.he}</td>
              {shiftTypes.map((type) => {
                const worker = getWorkerInShift(day.en, type);
                return (
                  <td key={type}>
                    {worker ? (
                      <div className="assigned-worker">
                        <span>{worker.firstName}</span>
                        <button
                          onClick={() => openModal(day.en, type)}
                          style={{
                            fontSize: "10px",
                            display: "block",
                            margin: "0 auto",
                          }}
                        >
                          החלף
                        </button>
                        <button
                          style={{
                            fontSize: "10px",
                            display: "block",
                            margin: "0 auto",
                          }}
                          onClick={() => onRemoveShift(day.en, type)}
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => openModal(day.en, type)}>
                        +
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <WorkersModal 
      isOpen={isModalOpen}
      onClose={()=>{setIsModalOpen(false)}}
      day={selectedSlot.day}
      type={selectedSlot.type}
      workers={workers}
      onSelectWorker={(workerId)=>onAddWorkerToShift(selectedSlot.day,selectedSlot.type,workerId)}
      />
    </section>
  );
}
