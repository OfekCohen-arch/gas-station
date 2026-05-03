import type { Constraint } from "../types/shift";
import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

export const constraintService = {
  query,
  save,
  remove,
  getConstraint
};
const STORAGE_KEY = 'constraint'

function query() : Promise<Constraint[]> {
  return storageService.query(STORAGE_KEY)
}
function save(constraint: Constraint) : Promise<Constraint> {
    //constraint.id = "c" + utilService.makeId(3);
    return storageService.post(STORAGE_KEY,constraint)
}
function remove(constraintId : string) : Promise<any>{
   return storageService.remove(STORAGE_KEY,constraintId)
}
async function getConstraint(workerId: string, day: string, type: string) {
    const constraints = await storageService.query(STORAGE_KEY);
    return constraints.find(c => 
        c.workerId === workerId && 
        c.day === day && 
        c.type === type
    );
}