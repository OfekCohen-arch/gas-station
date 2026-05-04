
import type { Worker } from "../types/auth";
import type { Constraint } from "../types/shift";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  day: string;
  type: {en:'morning',he:'בוקר'} | {en:'evening',he:'צהריים'} | {en:'night',he:'לילה'};
  workers: Worker[];
  constraints: Constraint[];
  onSelectWorker: (workerId: string,isConstrainted:boolean) => void;
}
export function WorkersModal({
  isOpen,
  onClose,
  day,
  type,
  workers,
  constraints,
  onSelectWorker,
}: Props) {
  const daysMap :Record<string, string> = {
sunday:'יום ראשון',
monday:'יום שני',
tuesday:'יום שלישי',
wednesday:'יום רביעי',
thursday:'יום חמישי',
friday:'יום שישי',
saturday:'יום שבת',
  }
  if (!isOpen) return null;
  return (
    <div className="workers-modal">
      <div className="modal-content">
        <h3>
          שיבוץ ל{daysMap[day]} - משמרת {type.he}
        </h3>
        <ul className="workers-list">
          {workers.map((worker) =>{ 
          const isConstrainted =  constraints.some(c => 
        c.workerId === worker.id && 
        c.day === day && 
        c.type === type.en
    );
           return (!worker.isAdmin) ? <button
              key={worker.id}
              onClick={() => {
                onSelectWorker(worker.id,isConstrainted);
                onClose();
              }}
              className={`worker-btn ${isConstrainted ? 'is-constrained' : ''}`}
            >
              {worker.firstName + " " + worker.lastName}
              {isConstrainted && <span className="warning-icon" title="העובד הגיש אילוץ"> ⚠️</span>}
            </button>
            : ''
          })}
        </ul>
        <button className="cancel-btn" onClick={onClose}>ביטול</button>
      </div>
    </div>
  );
}
