import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import Swal from "sweetalert2";

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function onlogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const user = await authService.login(formData);
      Swal.fire({
        icon: "success",
        title: `שלום ${user.firstName}!`,
        showConfirmButton: false,
        timer: 1500,
      });
      if (user.isAdmin) navigate(`/admin/${user.id}`);
      else navigate(`/worker/${user.id}`);
    } catch (err) {
      Swal.fire("טעות", "שם משתמש או סיסמה לא נכונים", "error");
    }
  }
  return (
    <section className="login-page">
      <div className="login-card">
        <h2>כניסת עובדים - תחנת דלק</h2>
        <form onSubmit={onlogin}>
            <div className="input-group">
          <label>כתובת דוא"ל</label>
          <input
            type="email"
            onChange={handleChange}
            value={formData.email}
            name="email"
            required
            placeholder="אימייל"
          />
          </div>
          <div className="input-group">
            <label>סיסמה</label>
          <input
            type="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            required
            placeholder="סיסמה"
          />
          </div>
          <button className="login-btn" type="submit">התחבר</button>
        </form>
      </div>
      <Link to={`/signup`}>עוד לא רשום? צור תחנה חדשה</Link>
    </section>
  );
}
