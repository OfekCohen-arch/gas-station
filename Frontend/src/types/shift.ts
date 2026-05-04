export interface Shift {
id: string;
day: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
type: 'morning' | 'evening' | 'night';
workerId: string | null;
stationId: string;
}
export interface Constraint {
  id: string;
  workerId: string;
  day: string; // למשל "sunday"
  type: string; // למשל "morning"
  stationId: string;
}
