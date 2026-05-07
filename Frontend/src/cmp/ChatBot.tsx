import { useState, useEffect, useRef } from "react";
import type { Worker } from "../types/auth";
import type { Shift, Constraint } from "../types/shift";
interface Props {
  workers: Worker[];
  shifts: Shift[];
  constraints: Constraint[];
}
export const ChatBot = ({ workers, shifts, constraints }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "שלום! אני GasPro AI. איך אני יכול לעזור בניהול התחנה היום?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  async function handleSend() {
    if (!input.trim()) return;

    const userMsg = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setMessages((prev) => [...prev, { text: "מעבד נתונים...", isBot: true }]);

    const daysMap = {
      sunday: "ראשון",
      monday: "שני",
      tuesday: "שלישי",
      wednesday: "רביעי",
      thursday: "חמישי",
      friday: "שישי",
      saturday: "שבת",
    };
    const typesMap = { morning: "בוקר", evening: "ערב", night: "לילה" };

    const constraintsSummary = constraints
      .map((c) => {
        const worker = workers.find((w) => w.id === c.workerId);
        const workerName = worker ? worker.firstName : "עובד לא ידוע";
        const dayHeb =
          daysMap[c.day.toLowerCase() as keyof typeof daysMap] || c.day;
        const typeHeb =
          typesMap[c.type.toLowerCase() as keyof typeof typesMap] || c.type;
        return `- ${workerName} לא יכול/ה לעבוד ביום ${dayHeb} משמרת ${typeHeb}`;
      })
      .join("\n");

    const shiftsSummary = shifts
      .map((s) => {
        const worker = workers.find((w) => w.id === s.workerId);
        const workerName = worker ? worker.firstName : "עובד לא ידוע";
        const dayHeb =daysMap[s.day.toLowerCase() as keyof typeof daysMap] || s.day;
        const typeHeb = typesMap[s.type.toLowerCase() as keyof typeof typesMap] || s.type;
        return `- יום ${dayHeb}, משמרת ${typeHeb}: עובד/ת ${workerName}`;
      })
      .join("\n");

    const workersList = workers.map((w) => `שם פרטי: ${w.firstName} שם משפחה: ${w.lastName} מספר טלפון: ${w.phone} אימייל: ${w.email}`).join(", ");

    try {
      const response = await fetch("http://localhost:3030/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `אתה עוזר חכם למנהל תחנת דלק.
                      רשימת עובדים: ${workersList}.
                      
                      אילוצים (מי לא יכול לעבוד מתי):
                      ${constraintsSummary}
                      
                      סידור עבודה נוכחי:
                      ${shiftsSummary}
                      
                      הנחיות:
                      1. ענה תמיד בעברית מקצועית.
                      2. השתמש רק בשמות עובדים, לעולם אל תציג מספרי ID.
                      3. אם המשתמש שואל על התנגשות, בדוק אם סידור העבודה תואם לאילוצים.`,
            },
            { role: "user", content: currentInput },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botReply = data.content;

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: botReply, isBot: true },
      ]);
    } catch (error) {
      console.error("שגיאה מפורטת:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "סליחה, קרתה שגיאה בחיבור לשרת.", isBot: true },
      ]);
    }
  }

  return (
    <div className="chatbot-wrapper">
      <button className="ai-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "🤖"}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>GasPro AI ⛽</h3>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.isBot ? "bot" : "user"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="שאל אותי משהו..."
            />
            <button onClick={handleSend}>שלח</button>
          </div>
        </div>
      )}
    </div>
  );
};
