import { useContext, useState } from "react";
import { AuthCtx } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
  const { login } = useContext(AuthCtx);
  const nav = useNavigate();
  const [form,setForm] = useState({ email:"", password:"" });
  const [err,setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try{
      await login(form.email, form.password);
      nav("/tests");
    }catch(e){ 
      setErr(e.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required autoFocus />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        {err && <div style={{color:'#b91c1c'}}>{err}</div>}
        <button className="primary" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      <p style={{marginTop:'.6rem'}}>New here? <Link className="link" to="/signup">Create account</Link></p>
    </div>
  );
}
