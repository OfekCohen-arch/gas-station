GasStationPro – Real-Time Workforce Management SaaS
A modern, multi-tenant SaaS platform built with a Serverless architecture, designed for gas stations to manage shifts and labor law compliance in real-time.
🚀 Key Technical Challenges & Solutions
1. Serverless Architecture & Real-Time Data
The Challenge: Building a scalable backend without managing a traditional server.
The Solution: Leveraged Supabase as a comprehensive Backend-as-a-Service (BaaS). Used Supabase Realtime (WebSockets) to synchronize shift schedules across all clients instantly, ensuring managers see live updates as they happen.
2. Secure Data Isolation (Multi-Tenancy)
The Challenge: Managing multiple organizations on a single database while maintaining strict privacy.
The Solution: Architected a robust security layer using PostgreSQL Row Level Security (RLS). By defining policies directly on the database, I ensured that users can only access data belonging to their specific gas station, providing enterprise-grade security at the data level.
3. Frontend State Management & Logic
The Challenge: Managing complex shift-scheduling UI and validation logic on the client side.
The Solution: Built with React and TypeScript, using Hooks and Context API for efficient state management. Implemented complex client-side validation for labor law constraints (e.g., rest periods, maximum hours) to provide immediate feedback to users.
🛠 Tech Stack
Frontend: React, TypeScript, Tailwind CSS.
Backend/Database: Supabase (PostgreSQL).
Real-time: Supabase Channels (WebSockets).
Security: Supabase Auth & Row Level Security (RLS).
