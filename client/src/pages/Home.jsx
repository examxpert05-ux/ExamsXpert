export default function Home(){
  const cards = [
    { t:"UPSC", d:"Union Public Service Commission", bg:"linear-gradient(135deg,#ffe29f,#ffa99f)", img:"https://cdn-icons-png.flaticon.com/512/3135/3135755.png" },
    { t:"State PCS", d:"State civil services", bg:"linear-gradient(135deg,#a1c4fd,#c2e9fb)", img:"https://cdn-icons-png.flaticon.com/512/201/201623.png" },
    { t:"SSC", d:"Staff Selection Commission", bg:"linear-gradient(135deg,#fbc2eb,#a6c1ee)", img:"https://cdn-icons-png.flaticon.com/512/1995/1995574.png" },
    { t:"Banking", d:"IBPS & SBI exams", bg:"linear-gradient(135deg,#fddb92,#d1fdff)", img:"https://cdn-icons-png.flaticon.com/512/2333/2333009.png" },
    { t:"CAT", d:"Management entrance test", bg:"linear-gradient(135deg,#84fab0,#8fd3f4)", img:"https://cdn-icons-png.flaticon.com/512/1828/1828884.png" },
    { t:"GATE", d:"Engineering entrance", bg:"linear-gradient(135deg,#fccb90,#d57eeb)", img:"https://cdn-icons-png.flaticon.com/512/2103/2103633.png" },
    { t:"Railway", d:"Railway recruitment", bg:"linear-gradient(135deg,#89f7fe,#66a6ff)", img:"https://cdn-icons-png.flaticon.com/512/1974/1974040.png" },
    { t:"CTET", d:"Teacher eligibility test", bg:"linear-gradient(135deg,#ffecd2,#fcb69f)", img:"https://cdn-icons-png.flaticon.com/512/1077/1077114.png" },
    { t:"UPTET", d:"UP teacher eligibility", bg:"linear-gradient(135deg,#cfd9df,#e2ebf0)", img:"https://cdn-icons-png.flaticon.com/512/3135/3135810.png" },
    { t:"NEET", d:"Medical entrance", bg:"linear-gradient(135deg,#ff9a9e,#fad0c4)", img:"https://cdn-icons-png.flaticon.com/512/3774/3774299.png" },
    { t:"IIT-JEE", d:"Engineering entrance", bg:"linear-gradient(135deg,#a18cd1,#fbc2eb)", img:"https://cdn-icons-png.flaticon.com/512/3062/3062634.png" },
    { t:"UP Police / SI", d:"Police recruitment", bg:"linear-gradient(135deg,#f6d365,#fda085)", img:"https://cdn-icons-png.flaticon.com/512/2991/2991231.png" },
  ];
  return (
    <>
      <section className="hero">
        <h2>Your Exam, Our Responsibility</h2>
        <p>Prepare with premium test series, instant analytics, and expert guidance for all competitive exams.</p>
        <a href="#courses">Start Learning</a>
      </section>
      <section className="grid" id="courses">
        {cards.map((c,i)=>(
          <div className="card" key={i} style={{background:c.bg}}>
            <img src={c.img} alt={`${c.t} Icon`} />
            <h3>{c.t}</h3><p>{c.d}</p>
          </div>
        ))}
      </section>
      <footer>
        <div className="socials">
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
        </div>
        <p>© 2025 ExamsXpert. All rights reserved.</p>
      </footer>
    </>
  );
}
