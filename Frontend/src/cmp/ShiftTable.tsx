import { useEffect, useState } from "react";
import type { Shift,Constraint } from "../types/shift";
import type { Worker } from "../types/auth";
import { workerService } from "../services/worker.service";
import { shiftService } from "../services/shift.service";
import Swal from "sweetalert2";
import { WorkersModal } from "./WorkersModal";
import { constraintService } from "../services/constraint.service";
import { supabase } from "../services/supabase.service";

interface Props {
  currWorker: Worker | null;
}

export function ShiftTable({ currWorker }: Props) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [constraints,setConstraints] = useState<Constraint[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  type ShiftType =
    | { en: "morning"; he: "בוקר" }
    | { en: "evening"; he: "צהריים" }
    | { en: "night"; he: "לילה" };
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    type: ShiftType | null;
  }>({
    day: "",
    type: null,
  });
  const days = [
    { he: "יום ראשון", en: "sunday" },
    { he: "יום שני", en: "monday" },
    { he: "יום שלישי", en: "tuesday" },
    { he: "יום רביעי", en: "wednesday" },
    { he: "יום חמישי", en: "thursday" },
    { he: "יום שישי", en: "friday" },
    { he: "יום שבת", en: "saturday" },
  ] as const;
  const shiftTypes = [
    { en: "morning", he: "בוקר" },
    { en: "evening", he: "צהריים" },
    { en: "night", he: "לילה" },
  ] as const;

  useEffect(() => {
    loadData()
    const channel = supabase
    .channel('table-db-changes')  
    .on(
      'postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'shifts'
      }, 
      () => {        
        loadData(); 
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
  }, []);
  async function loadData() {
    const sId = currWorker?.stationId
    if (!sId) return
    
    const workersData = await workerService.query(sId)
    const shiftsData = await shiftService.query(sId)
    const constraintsData = await constraintService.query(sId)
    
    setWorkers([...workersData])
    setShifts([...shiftsData])
    setConstraints([...constraintsData])
  }
  function openModal(day: string, type: string) {
    const shiftTypeObj = shiftTypes.find((t) => t.en === type);
    setSelectedSlot({ day, type: shiftTypeObj || null });
    setIsModalOpen(true);
  }
  function getWorkerInShift(day: string, type: string) {
    const shift = shifts.find((s) => s.day === day && s.type === type);
    if (!shift || !shift.id) return null;

    return workers.find((w) => w.id === shift.workerId);
  }
  async function onAddWorkerToShift(
    day: string,
    type: string,
    workerId: string,
    isConstrained: boolean,
  ) {
    if (!workerId) return;
    const isWorkingSameDay = shiftTypes.some(
      (shiftType) =>
        shiftType.en !== type &&
        getWorkerInShift(day, shiftType.en)?.id === workerId,
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
    if(isConstrained){
    const result = await Swal.fire({
            title: 'שים לב!',
            text: "העובד הגיש אילוץ למשמרת זו. האם לשבץ אותו בכל זאת?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'כן, שבץ בכל זאת',
            cancelButtonText: 'ביטול'
        });
        if(!result.isConfirmed) return
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
    const existingShift = shifts.find((s) => s.day === day && s.type === type);
    let savedShift;

    if (existingShift) {
        const shiftToUpdate = { ...existingShift, workerId };
        savedShift = await shiftService.save(shiftToUpdate);
    } else {
      const stationId = currWorker?.stationId
        const newShift = { day, type, workerId, stationId};
        savedShift = await shiftService.save({...newShift} as Shift);
    }

    setShifts(prevShifts => {
        if (!prevShifts) return [savedShift];
        const idx = prevShifts.findIndex(s => s.day === day && s.type === type);
        if (idx !== -1) {
            const updated = [...prevShifts];
            updated[idx] = savedShift;
            return updated;
        }
        return [...prevShifts, savedShift];
    });
  }
  async function onRemoveShift(day: string, type: string) {
    const shift = shifts.find((s) => s.day === day && s.type === type);
    if (shift) {
        setShifts(shifts=>[...shifts.filter(s=>s.id !== shift.id)]);
      await shiftService.remove(shift.id);
      
    }
  }
  if(!shifts || !workers ||!currWorker) return <div>טוען לוח משמרות...</div>
  return (
    <section className="shift-table">
      <table border={1} style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>משמרת / יום</th>
            <th>יום ראשון</th>
            <th>יום שני</th>
            <th>יום שלישי</th>
            <th>יום רביעי</th>
            <th>יום חמישי</th>
            <th>יום שישי</th>
            <th>יום שבת</th>
          </tr>
        </thead>
        <tbody>
          {shiftTypes.map((type) => (
            <tr key={type.en}>
              <td>{type.he}</td>
              {days.map((day) => {
                const worker = getWorkerInShift(day.en, type.en);
                return (
                  <td
                    key={day.en}
                    className={`shift-cell ${!currWorker.isAdmin && currWorker?.id === worker?.id ? "logged-worker" : ""}`}

                    onClick={()=>{
                        if(currWorker.isAdmin) openModal(day.en,type.en)
                    }}
                    
                  >
                    {worker ? (
                      <div className="assigned-worker">
                        <span>{worker.firstName}</span>
                      </div>
                    ) : ''
                    }
                    {currWorker.isAdmin && worker && <button onClick={(event)=>{
                        event.stopPropagation()
                        onRemoveShift(day.en,type.en)
                        }} className="remove-btn">X</button>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedSlot && (
        <WorkersModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          day={selectedSlot.day}
          type={selectedSlot.type!}
          workers={workers}
          constraints={constraints}
          onSelectWorker={(workerId,isConstrainted) =>
            onAddWorkerToShift(
              selectedSlot.day,
              selectedSlot.type!.en,
              workerId,
              isConstrainted
            )
          }
        />
      )}
    </section>
  );
}
