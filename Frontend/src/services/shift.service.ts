import type { Shift } from "../types/shift";
import { supabase } from "./supabase.service.ts";

export const shiftService = {
  query,
  save,
  getById,
  remove,
};

async function query(stationId: string) : Promise<Shift[]> {
  const {data,error} = await supabase
  .from('shifts')
  .select('*')
  .eq('stationId',stationId)
  if(error) throw error
  return data as Shift[]
}
async function save(shift: Shift) : Promise<Shift>{
  if (shift.id) {
    const { id, ...updateData } = shift;
    const {data,error} = await supabase
    .from('shifts')
    .update(updateData)
    .eq('id',shift.id)
    .select('*')
    .single()
    if(error) throw error
    return data as Shift
  }
  else{
    const { id, ...dataToInsert } = shift;
    const {data,error} = await supabase
    .from('shifts')
    .insert([dataToInsert])
    .select()
    .single()
    if(error) throw error
    return data as Shift
  }
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
