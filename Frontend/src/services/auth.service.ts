import type { Worker } from "../types/auth";
import { supabase } from "./supabase.service";
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
async function signup(signupInfo: SignupInfo,isAdmin: boolean | true,stationId:string | null): Promise<Worker> {
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupInfo.email,
        password: signupInfo.password,
    });

    if (authError || !authData.user) {
        throw new Error(authError?.message || 'הרשמה נכשלה');
    }

    const newUser = {
        id: authData.user.id, 
        email: signupInfo.email,
        firstName: signupInfo.firstName,
        lastName: signupInfo.lastName,
        phone: signupInfo.phone,
        stationName: signupInfo.stationName,
        isAdmin: isAdmin,
        stationId : stationId || null
    };
    

    const { data: workerData, error: workerError } = await supabase
        .from('workers')
        .insert([newUser])
        .select('id, joinDate, firstName, lastName, email, phone, isAdmin, stationId, stationName')
        .single();

    if (workerError) {
        console.error('Error saving worker profile:', workerError.message);
        throw workerError;
    }

    if(isAdmin)sessionStorage.setItem('loggedInUser', JSON.stringify(workerData));

    return workerData as Worker;
}

function getLoggedInUser() : Worker | null{
    const user = sessionStorage.getItem('loggedInUser')
    return user ? JSON.parse(user) : null
}

async function login(credentials: { email: string; password: string }): Promise<Worker> {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
    });

    if (authError) {
        throw new Error('אימייל או סיסמה שגויים');
    }

    const { data: workerData, error: workerError } = await supabase
        .from('workers')
        .select('id, joinDate, firstName, lastName, email, phone, isAdmin, stationId, stationName')
        .eq('id', authData.user.id)
        .single();

    if (workerError || !workerData) {
        throw new Error('לא נמצא פרופיל עובד תואם');
    }

    sessionStorage.setItem('loggedInUser', JSON.stringify(workerData));

    return workerData as Worker;
}


async function logout() {
    sessionStorage.removeItem('loggedInUser');
}
