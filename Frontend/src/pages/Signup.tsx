import { useState } from "react";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Signup(){
 const [signupInfo, setSignupInfo] = useState({
        email: '',
        phone: '',
        password: '',
        firstName: '',
        lastName: '',
        stationName: '' // שם התחנה החדשה
    });
  const navigate = useNavigate()
    const handleChange = (ev : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const onSignup = async (ev: React.ChangeEvent<HTMLFormElement>) => {
        ev.preventDefault();
       try {
            await authService.signup(signupInfo);
            navigate('/admin'); // העברה ללוח הבקרה אחרי הרשמה
        } catch (err) {
            Swal.fire('שגיאה', 'לא ניתן היה להשלים את ההרשמה', 'error');
        } 
    };

    return (
        <form className="signup-form" onSubmit={onSignup}>
            <h2>הרשמת מנהל תחנה חדש</h2>
            <input name="stationName" placeholder="שם תחנת הדלק" onChange={handleChange} required />
            <input name="firstName" placeholder="שם פרטי" onChange={handleChange} required />
            <input name="lastName" placeholder="שם משפחה" onChange={handleChange} required />
            <input name="phone" type="tel" placeholder="מספר טלפון " onChange={handleChange} required />
            <input type="email" name="email" placeholder={`כתובת דוא"ל`}onChange={handleChange} required />
            <input name="password" type="password" placeholder="סיסמה" onChange={handleChange} required />
            <button type="submit">צור תחנה והירשם</button>
        </form>
    );


}