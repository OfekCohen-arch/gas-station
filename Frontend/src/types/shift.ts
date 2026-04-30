export interface Shift {
id: string;
day: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
type: 'morning' | 'evening' | 'night';
workerId: string | null
}