import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import type { Worker } from "../types/auth";
interface SignupInfo {
    email : string;
    phone : string;
  password: string;
  firstName: string;
  lastName: string;
  stationName: string; 
}
export const authService = {
signup,
getLoggedInUser
}
async function signup(signupInfo : SignupInfo) : Promise<Worker> {
    const stationId = 'ST-' + utilService.makeId(5);

    const newUser = {
        email : signupInfo.email,
        password: signupInfo.password,
        firstName: signupInfo.firstName,
        lastName: signupInfo.lastName,
        phone : signupInfo.phone,
        stationId: stationId, 
        stationName : signupInfo.stationName,
        isAdmin: true,
        joinDate: Date.now()
    };

    const savedUser = await storageService.post('worker', newUser);

    await storageService.post('station', { id: stationId, name: signupInfo.stationName });

    sessionStorage.setItem('loggedInUser', JSON.stringify(savedUser));
    
    return savedUser;
}
function getLoggedInUser() : Worker | null{
    const user = sessionStorage.getItem('loggedInUser')
    return user ? JSON.parse(user) : null
}
