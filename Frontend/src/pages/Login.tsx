import { useState } from "react"
import { useNavigate } from "react-router-dom";

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
    function handleSubmit(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    navigate('/dashboard')
    
    }
    return(
    <section>
    <h1>כניסת עובדים - תחנת דלק</h1>    
    <form onSubmit={handleSubmit}>
    <input type="email" onChange={handleChange} value={formData.email} name="email" required placeholder="אימייל"/>
    <input type="password" onChange={handleChange} value={formData.password} name="password" required placeholder="סיסמה"/>
    <button type="submit">התחבר</button>
    </form>
    </section>
    )
}