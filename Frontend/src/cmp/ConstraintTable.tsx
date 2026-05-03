
export function ConstraintTable() {
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
                return <td key={day.en}></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
