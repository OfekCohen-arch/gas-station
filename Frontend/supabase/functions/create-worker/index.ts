import { serve } from "https://deno.land"
import { createClient } from "npm:@supabase/supabase-js@2"



const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. טיפול ב-CORS (זה מה שפותר את השגיאה האדומה בדפדפן)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, password, workerData } = await req.json()

    // יצירת המשתמש
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { firstName: workerData.firstName, lastName: workerData.lastName }
    })

    if (authError) throw authError

    // הוספה לטבלה
    const { data, error: dbError } = await supabaseAdmin
      .from('workers')
      .insert([{ ...workerData, id: authData.user.id }])
      .select().single()

    if (dbError) throw dbError

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    // גם בשגיאה חייבים להחזיר corsHeaders כדי לראות מה השגיאה ב-Console
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
