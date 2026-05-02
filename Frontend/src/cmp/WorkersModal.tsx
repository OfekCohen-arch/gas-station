import type { Worker } from "../types/auth";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  day: string;
  type: string;
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
  if (!isOpen) return null;
  return (
    <div className="workers-modal">
      <div className="modal-content">
        <h3>
          שיבוץ ליום {day} - משמרת {type}
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
