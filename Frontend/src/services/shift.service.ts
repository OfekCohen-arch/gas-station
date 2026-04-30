import type { Shift } from "../types/shift";
import { utilService } from "./util.service.ts";

const shifts: Shift[] = [
  { id: "s101", day: "sunday", type: "morning", workerId: "u101" },
  { id: "s102", day: "monday", type: "evening", workerId: "u102" },
];

export const shiftService = {
  query,
  save,
  getById,
  remove,
};

function query() : Shift[] {
  return shifts;
}
function save(shift: Shift){
  if (shift.id) {
    const idx = shifts.findIndex((currShift) => currShift.id === shift.id);
    shifts[idx] = shift;
  }
  else{
    const id = 's'+utilService.makeId(3)
    const newShift = { ...shift, id };
    shifts.push(newShift);
    return newShift;
  }
}
function getById(id: string) : Shift | undefined {
return shifts.find(shift=>shift.id === id)
}
function remove(shiftId: string) {
const idx = shifts.findIndex(shift=>shift.id === shiftId)
if(idx === -1) return 
else shifts.splice(idx,1)
}
