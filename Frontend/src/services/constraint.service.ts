import type { Constraint } from "../types/shift";
import { supabase } from "./supabase.service";


export const constraintService = {
  query,
  save,
  remove,
  getConstraint
};

async function query(stationId: string) : Promise<Constraint[]> {
  const {data,error} = await supabase
  .from('constraints')
  .select()
  .eq('stationId',stationId)
  if(error) throw error
  return data

}
async function save(constraint: Constraint) : Promise<Constraint> {
    if (constraint.id) {
        const { id, ...updateData } = constraint;
        const {data,error} = await supabase
        .from('constraints')
        .update(updateData)
        .eq('id',constraint.id)
        .select('*')
        .single()
        if(error) throw error
        return data as Constraint
      }
      else{
        const { id, ...dataToInsert } = constraint;
        const {data,error} = await supabase
        .from('constraints')
        .insert([dataToInsert])
        .select()
        .single()
        if(error) throw error
        return data as Constraint
      }
}
async function remove(constraintId : string) : Promise<any>{
  const {data,error} = await supabase
  .from('constraints')
  .delete()
  .select()
  .eq('id',constraintId)
  .single()
  if(error) throw error
  return data as Constraint
}
async function getConstraint(workerId: string, day: string, type: string) {
    const {data,error} = await supabase
  .from('constraints')
  .select()
  .eq('workerId',workerId)
  .eq('day',day)
  .eq('type',type)
  .maybeSingle()
  if(error) throw error
  return data
}