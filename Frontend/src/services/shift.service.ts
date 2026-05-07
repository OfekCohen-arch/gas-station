import type { Shift } from "../types/shift";
import { supabase } from "./supabase.service.ts";

export const shiftService = {
  query,
  save,
  getById,
  remove,
  saveAll,
  removeAll
};

async function query(stationId: string) : Promise<Shift[]> {
  const {data,error} = await supabase
  .from('shifts')
  .select('*')
  .eq('stationId',stationId)
  if(error) throw error
  return data as Shift[]
}
async function save(shift: Shift): Promise<Shift> {
  const { data, error } = await supabase
    .from('shifts')
    .upsert(shift) 
    .select('*')
    .single();

  if (error) {
    console.error("Error in save (upsert):", error.message);
    throw error;
  }
  return data as Shift;
}

async function getById(id: string) : Promise<Shift> {
const {data,error} = await supabase
.from('shifts')
.select()
.eq('id',id)
.single()
if(error) throw error
return data as Shift
}
async function remove(shiftId: string) : Promise<Shift> {
const {data,error} = await supabase
.from('shifts')
.delete()
.select()
.eq('id',shiftId)
.single()
if(error) throw error
return data as Shift
}
async function saveAll(shifts: Shift[]): Promise<Shift[]> {
  const promises = shifts.map(shift => save(shift));
  
  const savedShifts = await Promise.all(promises);
  
  return savedShifts;
}

async function removeAll(shifts: Shift[]) {
  if (!shifts || shifts.length === 0) return; 
  const shiftIdsToDelete = shifts.map(shift=>shift.id)
const {error} = await supabase
  .from('shifts')
  .delete()
  .in('id', shiftIdsToDelete);
 if (error) {
    console.error("שגיאה במחיקת משמרות:", error.message);
    throw error
  }
}