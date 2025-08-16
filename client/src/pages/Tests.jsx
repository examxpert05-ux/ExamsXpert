import { useContext, useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";
import { AuthCtx } from "../AuthContext";

export default function Tests(){
  const { user } = useContext(AuthCtx);
  const [tests,setTests] = useState([]);
  const [exam, setExam] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get(`/tests${exam ? `?exam=${encodeURIComponent(exam)}`:""}`);
      setTests(data.tests);
    } catch (error) {
      console.log('Server not running - showing demo mode');
      setTests([]);
    }
  };
  useEffect(()=>{ load(); }, [exam]);

  return (
    <>
      <div className="container">
        <h2>All Tests</h2>
        <div style={{display:'flex',gap:10,marginTop:10}}>
          <select value={exam} onChange={e=>setExam(e.target.value)}>
            <option value="">All Exams</option>
            {["UPSC","State PCS","SSC","Banking","CAT","GATE","Railway","CTET","UPTET","NEET","IIT-JEE","UP Police / SI"].map(x=>
              <option key={x} value={x}>{x}</option>
            )}
          </select>
          {user?.role==="admin" && <Link className="link" to="/admin">Go to Admin</Link>}
        </div>
      </div>
      <div className="list">
        {tests.map(t=>(
          <div key={t._id} className="test-item">
            <div>
              <div style={{fontWeight:800}}>{t.title}</div>
              <div style={{fontSize:12,opacity:.8}}>{t.exam} · {t.description}</div>
            </div>
            <Link className="link" to={`/tests/${t._id}`}>Start</Link>
          </div>
        ))}
        {!tests.length && (
          <div className="test-item">
            <div>
              <div style={{fontWeight:800,color:'#f59e0b'}}>Server Not Running</div>
              <div style={{fontSize:12,opacity:.8}}>Start the server to see tests. For now, this is demo mode.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
