import type { Shift } from "../types/shift";
import { storageService } from "./async-storage.service.ts";
import { utilService } from "./util.service.ts";

const STORAGE_KEY = 'shift'

export const shiftService = {
  query,
  save,
  getById,
  remove,
};

function query() : Promise<Shift[]> {
  return storageService.query(STORAGE_KEY)
}
function save(shift: Shift) : Promise<Shift>{
  if (shift.id) {
    return storageService.put(STORAGE_KEY,shift)
  }
  else{
    shift.id = 's'+utilService.makeId(3)
    return storageService.post(STORAGE_KEY,shift)
  }
}
function getById(id: string) : Promise<Shift> {
return storageService.get(STORAGE_KEY,id)
}
function remove(shiftId: string) : Promise<any> {
return storageService.remove(STORAGE_KEY,shiftId)
}
