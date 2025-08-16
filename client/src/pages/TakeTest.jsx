import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function TakeTest(){
  const { id } = useParams();
  const [test,setTest] = useState(null);
  const [choices,setChoices] = useState({});
  const [submitted,setSubmitted] = useState(false);
  const [score,setScore] = useState(0);

  useEffect(()=>{
    api.get(`/tests/${id}`).then(({data})=>{
      setTest(data.test);
    });
  },[id]);

  const choose = (qi, oi) => {
    if (submitted) return;
    setChoices({...choices, [qi]: oi});
  };

  const submit = () => {
    let s=0;
    test.questions.forEach((q,i)=>{
      if (choices[i]===q.answerIndex) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  if (!test) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>{test.title}</h2>
      <div style={{opacity:.8, marginBottom:10}}>{test.exam} · {test.description}</div>

      {test.questions.map((q,qi)=>(
        <div className="qbox" key={qi}>
          <div style={{fontWeight:700}}>{qi+1}. {q.text}</div>
          {q.options.map((op,oi)=>(
            <div
              key={oi}
              className={`opt ${choices[qi]===oi ? "selected":""}`}
              onClick={()=>choose(qi,oi)}
            >
              {op}
            </div>
          ))}
          {submitted && (
            <div className="result">
              Correct: {q.options[q.answerIndex]}
              {q.explanation ? <div style={{marginTop:6}}>Explanation: {q.explanation}</div> : null}
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button className="primary" onClick={submit}>Submit</button>
      ) : (
        <div style={{marginTop:10,fontWeight:800}}>Score: {score} / {test.questions.length}</div>
      )}
    </div>
  );
}
