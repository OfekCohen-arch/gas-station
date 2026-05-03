import type { Constraint } from "../types/shift";
import { utilService } from "./util.service";

export const constraintService = {
  query,
  save,
  remove
};
const demoConstraints = [
  {
    id: "c101",
    workerId: "u101",
    day: "sunday",
    type: "morning",
  },
  {
    id: "c102",
    workerId: "u101",
    day: "tuesday",
    type: "night",
  },
  {
    id: "c103",
    workerId: "u102",
    day: "wednesday",
    type: "evening",
  },
];
function query() : Constraint[] {
  return demoConstraints;
}
function save(constraint: Constraint) : Constraint {
    const id = "c" + utilService.makeId(3);
    const newCon = { ...constraint, id };
    demoConstraints.push(newCon);
    return newCon;
}
function remove(day: string,type: string, workerId: string) : string{
    const idx = demoConstraints.findIndex(c=>(c.day === day && type === c.type && c.workerId === workerId))
if(idx === -1) return ''
const id = demoConstraints[idx].id
 demoConstraints.splice(idx,1) 
return id
}
