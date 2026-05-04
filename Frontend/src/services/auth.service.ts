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
getLoggedInUser,
login,
logout
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

async function login(credentials: { email: string; password: string }): Promise<Worker> {
    const workers = await storageService.query('worker');

    const worker = workers.find(w => 
        w.email === credentials.email && 
        w.password === credentials.password
    );

    if (!worker) {
        throw new Error('שם משתמש או סיסמה שגויים');
    }
    sessionStorage.setItem('loggedInUser', JSON.stringify(worker));

    return worker;
}

async function logout() {
    sessionStorage.removeItem('loggedInUser');
}
