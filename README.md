GasStationPro – Real-Time Workforce Management SaaS
A robust, multi-tenant SaaS platform designed for gas stations to manage shifts, employee constraints, and labor law compliance in real-time.
🚀 Key Technical Challenges & Solutions
1. Real-Time Synchronization
The Challenge: Ensuring all managers and employees see shift changes instantly without page refreshes.
The Solution: Integrated WebSockets via Supabase Realtime (Channels). This allows the UI to reflect database changes (INSERT/UPDATE) across all connected clients with sub-second latency.
2. Complex Business Logic & Constraints
The Challenge: Automating the validation of labor laws (e.g., mandatory rest hours between shifts) and employee-specific constraints.
The Solution: Engineered a custom validation engine in the backend that cross-references shift schedules against a set of dynamic rules before persisting data.
3. Secure Multi-Tenancy (Data Isolation)
The Challenge: Building a system where multiple gas stations use the same infrastructure but can never access each other's data.
The Solution: Implemented Row Level Security (RLS) at the database level. Every query is filtered by a tenant_id at the engine level, ensuring complete data isolation even if a frontend bug occurs.
🛠 Tech Stack
Frontend: React, TypeScript, Redux Toolkit, Tailwind CSS.
Backend & DB: Node.js, Supabase (PostgreSQL), Edge Functions.
Real-time: Supabase Realtime Channels (WebSockets).
Security: Auth/RLS, JWT.
