import { useContext, useState } from "react";
import { AuthCtx } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useContext(AuthCtx);
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.role);
      nav("/tests");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          autoFocus
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6)"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin (for testing)</option>
        </select>
        {err && <div style={{ color: '#b91c1c' }}>{err}</div>}
        <button className="primary" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
      <p style={{ marginTop: '.6rem' }}>
        Already have an account? <Link className="link" to="/login">Login</Link>
      </p>
    </div>
  );
}
