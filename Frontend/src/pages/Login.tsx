import { use, useState } from "react"
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import Swal from "sweetalert2";

export function Login(){
    const [formData,setFormData] = useState({ email:'',password:''})
    const navigate = useNavigate()
   
    function handleChange( e : React.ChangeEvent<HTMLInputElement> ) {
    const {name,value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
    async function onlogin(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    try {
        const user = await authService.login(formData);
        
        // אם הוא אדמין - שלח אותו לניהול, אם עובד - ללוח האישי שלו
        if (user.isAdmin) navigate(`/admin/${user.id}`);
        else navigate(`/worker/${user.id}`);
        
    } catch (err) {
        Swal.fire('טעות', 'שם משתמש או סיסמה לא נכונים', 'error');
    }
    }
    return(
    <section>
    <h1>כניסת עובדים - תחנת דלק</h1>    
    <form onSubmit={onlogin}>
    <input type="email" onChange={handleChange} value={formData.email} name="email" required placeholder="אימייל"/>
    <input type="password" onChange={handleChange} value={formData.password} name="password" required placeholder="סיסמה"/>
    <button type="submit">התחבר</button>
    </form>
    </section>
    )
}