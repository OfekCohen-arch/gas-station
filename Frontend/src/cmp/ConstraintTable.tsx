import type { Worker } from "../types/auth";
import type { Constraint } from "../types/shift";
interface Props {
  worker: Worker;
  constraints: Constraint[];
  onAddConstraint : (day:string,type:string) =>void
  onRemoveConstraint : (day: string,type: string) =>void
}
export function ConstraintTable({ worker, constraints, onAddConstraint,onRemoveConstraint }: Props) {
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

  async function onToggleConstraint(day: string,type: string,state: boolean){
  if(state === false){
  onAddConstraint(day,type)
  }
  else{ 
     onRemoveConstraint(day,type)
}
  }
  return (
    <section>
      <h2>הגשת אילוצים לשבוע הבא</h2>
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
                const hasConstraint = constraints.some(
                  (c) =>
                    c.workerId === worker?.id &&
                    c.day === day.en &&
                    c.type === type.en,
                );
                return (
                  <td
                    key={day.en}
                    className={`shift-cell ${hasConstraint ? "constrained" : ""}`}
                    onClick={() => onToggleConstraint(day.en, type.en,hasConstraint)}
                  >
                    {hasConstraint ? '❌' : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
