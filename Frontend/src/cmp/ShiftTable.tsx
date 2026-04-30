import { useEffect, useState } from "react"
import type { Shift } from "../types/shift"
import type { Worker } from "../types/auth"
import { workerService } from "../services/worker.service"
import { shiftService } from "../services/shift.service"
export function ShiftTable(){
    const [shifts, setShifts] = useState<Shift[]>([])
    const [workers, setWorkers] = useState<Worker[]>([])
    const days = [
    { he: 'יום ראשון', en: 'sunday' },
    { he: 'יום שני', en: 'monday' },
    { he: 'יום שלישי', en: 'tuesday' },
    { he: 'יום רביעי', en: 'wednesday' },
    { he: 'יום חמישי', en: 'thursday' },
    { he: 'יום שישי', en: 'friday' },
    { he: 'יום שבת', en: 'saturday' },
] as const
    const shiftTypes = ['morning', 'evening', 'night'] as const

    useEffect(()=>{
    setWorkers(workerService.query())
    setShifts(shiftService.query())
    },[])
     function getWorkerInShift(day: string, type: string) {
        const shift = shifts.find(s => s.day === day && s.type === type)
        if (!shift || !shift.id) return null
        
        return workers.find(w => w.id === shift.workerId)
    }

    return(
    <section className="shift-table">
    <table border={1} style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>יום / משמרת</th>
                        <th>בוקר</th>
                        <th>ערב</th>
                        <th>לילה</th>
                    </tr>
                </thead>
                <tbody>
                    {days.map(day => (
                        <tr key={day.en}>
                            <td>{day.he}</td>
                            {shiftTypes.map(type => {
                                const worker = getWorkerInShift(day.en, type)
                                return (
                                    <td key={type}>
                                        {worker ? (
                                            <div className="assigned-worker">
                                                <span>{worker.firstName}</span>
                                                <button style={{fontSize: '10px', display: 'block', margin: '0 auto'}}>החלף</button>
                                            </div>
                                        ) : (
                                            <button>+</button>
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
    </section>
    )
}