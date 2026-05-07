import { createClient } from "@supabase/supabase-js";
import type { Worker } from "../types/auth";
import { supabase } from "./supabase.service";

const createTempClient = () => createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false, // קריטי: לא שומר את המשתמש החדש בדפדפן
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  }
);
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
async function signup(signupInfo: SignupInfo, isAdmin: boolean = true, stationId: string | null): Promise<Worker> {
        const client = (isAdmin && !stationId) ? supabase : createTempClient();

    const { data: authData, error: authError } = await client.auth.signUp({
        email: signupInfo.email,
        password: signupInfo.password,
        options: {
            data: { 
                firstName: signupInfo.firstName,
                lastName: signupInfo.lastName,
                isAdmin: isAdmin
            }
        }
    });

    if (authError || !authData.user) {
        throw new Error(authError?.message || 'הרשמה נכשלה');
    }

    const userId = authData.user.id;
    const finalStationId = isAdmin ? userId : stationId;

    const newUserRecord = {
        id: userId, 
        email: signupInfo.email,
        firstName: signupInfo.firstName,
        lastName: signupInfo.lastName,
        phone: signupInfo.phone,
        stationName: signupInfo.stationName,
        isAdmin: isAdmin,
        stationId: finalStationId 
    };

    const { data: workerData, error: workerError } = await supabase
        .from('workers')
        .insert([newUserRecord])
        .select('*')
        .single();

    if (workerError) {
        console.error('Error saving worker profile:', workerError.message);
        throw workerError;
    }

    if (isAdmin && !stationId) { 
        sessionStorage.setItem('loggedInUser', JSON.stringify(workerData));
    }

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
