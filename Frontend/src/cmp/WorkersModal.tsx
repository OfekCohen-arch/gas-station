import type { Worker } from "../types/auth";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  day: string;
  type: {en:'morning',he:'בוקר'} | {en:'evening',he:'צהריים'} | {en:'night',he:'לילה'};
  workers: Worker[];
  onSelectWorker: (workerId: string) => void;
}
export function WorkersModal({
  isOpen,
  onClose,
  day,
  type,
  workers,
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
          {workers.map((worker) => (
            <button
              key={worker.id}
              onClick={() => {
                onSelectWorker(worker.id);
                onClose();
              }}
              className="worker-btn"
            >
              {worker.firstName + " " + worker.lastName}
            </button>
          ))}
        </ul>
        <button className="cancel-btn" onClick={onClose}>ביטול</button>
      </div>
    </div>
  );
}
