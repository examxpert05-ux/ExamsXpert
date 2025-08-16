import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { AuthCtx } from "../AuthContext";

export default function AdminPanel(){
  const nav = useNavigate();
  const { user } = useContext(AuthCtx);
  const [tests,setTests] = useState([]);

  const load = async () => {
    const { data } = await api.get("/tests");
    setTests(data.tests);
  };
  useEffect(()=>{ if(user?.role!=="admin") nav("/"); else load(); },[user,nav]);

  const del = async (id) => {
    if (!window.confirm("Delete this test?")) return;
    await api.delete(`/tests/${id}`);
    load();
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <Link className="link" to="/admin/add">+ Add Test</Link>
      <div className="list">
        {tests.map(t=>(
          <div key={t._id} className="test-item">
            <div><b>{t.title}</b><div style={{fontSize:12,opacity:.8}}>{t.exam}</div></div>
            <div style={{display:'flex',gap:8}}>
              <Link className="link" to={`/admin/add?id=${t._id}`}>Edit</Link>
              <button className="primary" onClick={()=>del(t._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
