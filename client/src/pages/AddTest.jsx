import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";

const EXAMS = ["UPSC","State PCS","SSC","Banking","CAT","GATE","Railway","CTET","UPTET","NEET","IIT-JEE","UP Police / SI"];

export default function AddTest(){
  const nav = useNavigate();
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");

  const [test,setTest] = useState({
    title:"", exam:"UPSC", description:"", questions:[
      { text:"Example question?", options:["A","B","C","D"], answerIndex:0, explanation:"Because..." }
    ]
  });

  useEffect(()=>{
    if(id){
      api.get(`/tests/${id}`).then(({data})=> setTest({
        title:data.test.title,
        exam:data.test.exam,
        description:data.test.description,
        questions:data.test.questions
      }));
    }
  },[id]);

  const changeQ = (i, key, val) => {
    const qs = [...test.questions];
    qs[i] = { ...qs[i], [key]: val };
    setTest({ ...test, questions: qs });
  };
  const addQ = () => setTest({...test, questions:[...test.questions, { text:"", options:["","","",""], answerIndex:0, explanation:"" }]});
  const delQ = (i) => setTest({...test, questions:test.questions.filter((_,x)=>x!==i)});

  const save = async e => {
    e.preventDefault();
    if (id) await api.put(`/tests/${id}`, test);
    else await api.post("/tests", test);
    nav("/admin");
  };

  return (
    <div className="container">
      <h2>{id ? "Edit" : "Add"} Test</h2>
      <form onSubmit={save}>
        <input placeholder="Title" value={test.title} onChange={e=>setTest({...test,title:e.target.value})} required />
        <select value={test.exam} onChange={e=>setTest({...test,exam:e.target.value})}>
          {EXAMS.map(x=><option key={x} value={x}>{x}</option>)}
        </select>
        <textarea placeholder="Short description" value={test.description} onChange={e=>setTest({...test,description:e.target.value})}/>
        <div style={{marginTop:10,fontWeight:800}}>Questions</div>
        {test.questions.map((q,i)=>(
          <div className="qbox" key={i}>
            <input placeholder={`Q${i+1} text`} value={q.text} onChange={e=>changeQ(i,"text",e.target.value)} required/>
            {q.options.map((op,oi)=>(
              <input key={oi} placeholder={`Option ${oi+1}`} value={op} onChange={e=>{
                const ops=[...q.options]; ops[oi]=e.target.value; changeQ(i,"options",ops);
              }} required />
            ))}
            <select value={q.answerIndex} onChange={e=>changeQ(i,"answerIndex",Number(e.target.value))}>
              {q.options.map((_,oi)=><option key={oi} value={oi}>Correct: Option {oi+1}</option>)}
            </select>
            <textarea placeholder="Explanation (solution)" value={q.explanation} onChange={e=>changeQ(i,"explanation",e.target.value)} />
            <button type="button" className="primary" onClick={()=>delQ(i)}>Remove</button>
          </div>
        ))}
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button type="button" className="primary" onClick={addQ}>+ Add Question</button>
          <button className="primary">Save Test</button>
        </div>
      </form>
    </div>
  );
}
