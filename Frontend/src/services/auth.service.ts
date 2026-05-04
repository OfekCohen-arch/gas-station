import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
interface SignupInfo {
    email : string;
    phone : string;
  password: string;
  firstName: string;
  lastName: string;
  stationName: string; // השדה שיוצר את הישות של התחנה
}
export const authService = {
signup
}
async function signup(signupInfo : SignupInfo) : Promise<Worker> {
    // 1. יוצרים ID ייחודי לתחנה
    const stationId = 'ST-' + utilService.makeId(5);

    // 2. יוצרים את אובייקט המנהל
    const newUser = {
        email : signupInfo.email,
        password: signupInfo.password,
        firstName: signupInfo.firstName,
        lastName: signupInfo.lastName,
        phone : signupInfo.phone,
        stationId: stationId, // מקשרים אותו לתחנה החדשה
        isAdmin: true,
        joinDate: Date.now()
    };

    // 3. שומרים את המנהל בטבלת העובדים (דרך ה-storageService)
    const savedUser = await storageService.post('worker', newUser);

    // 4. (אופציונלי) שומרים את פרטי התחנה בטבלה נפרדת
    await storageService.post('station', { id: stationId, name: signupInfo.stationName });

    // 5. מחברים את המשתמש אוטומטית (שומרים ב-Session)
    sessionStorage.setItem('loggedInUser', JSON.stringify(savedUser));
    
    return savedUser;
}
