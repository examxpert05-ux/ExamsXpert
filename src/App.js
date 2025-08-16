import React from "react";
import "./App.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function App() {
  return (
    <div>
      <header>
        <h1>ExamsXpert</h1>
        <div className="nav">
          <span>Blogs (Coming Soon)</span>
          <span>About Us (Coming Soon)</span>
          <span>Login (Coming Soon)</span>
          <span>Sign Up (Coming Soon)</span>
        </div>
      </header>

      <section className="hero">
        <h2>Your Exam, Our Responsibility</h2>
        <p>
          Prepare with premium test series, instant analytics, and expert
          guidance for all competitive exams.
        </p>
        <a href="#courses">Start Learning</a>
      </section>

      <section className="grid" id="courses">
        {[
          {
            title: "UPSC",
            desc: "Union Public Service Commission",
            bg: "linear-gradient(135deg,#ffe29f,#ffa99f)",
            img: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
          },
          {
            title: "State PCS",
            desc: "State civil services",
            bg: "linear-gradient(135deg,#a1c4fd,#c2e9fb)",
            img: "https://cdn-icons-png.flaticon.com/512/201/201623.png",
          },
          {
            title: "SSC",
            desc: "Staff Selection Commission",
            bg: "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
            img: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
          },
          {
            title: "Banking",
            desc: "IBPS & SBI exams",
            bg: "linear-gradient(135deg,#fddb92,#d1fdff)",
            img: "https://cdn-icons-png.flaticon.com/512/2333/2333009.png",
          },
          {
            title: "CAT",
            desc: "Management entrance test",
            bg: "linear-gradient(135deg,#84fab0,#8fd3f4)",
            img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
          },
          {
            title: "GATE",
            desc: "Engineering entrance",
            bg: "linear-gradient(135deg,#fccb90,#d57eeb)",
            img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
          },
          {
            title: "Railway",
            desc: "Railway recruitment",
            bg: "linear-gradient(135deg,#89f7fe,#66a6ff)",
            img: "https://cdn-icons-png.flaticon.com/512/1974/1974040.png",
          },
          {
            title: "CTET",
            desc: "Teacher eligibility test",
            bg: "linear-gradient(135deg,#ffecd2,#fcb69f)",
            img: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
          },
          {
            title: "UPTET",
            desc: "UP teacher eligibility",
            bg: "linear-gradient(135deg,#cfd9df,#e2ebf0)",
            img: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png",
          },
          {
            title: "NEET",
            desc: "Medical entrance",
            bg: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
            img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
          },
          {
            title: "IIT-JEE",
            desc: "Engineering entrance",
            bg: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
            img: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
          },
          {
            title: "UP Police / SI",
            desc: "Police recruitment",
            bg: "linear-gradient(135deg,#f6d365,#fda085)",
            img: "https://cdn-icons-png.flaticon.com/512/2991/2991231.png",
          },
        ].map((exam, idx) => (
          <div
            className="card"
            key={idx}
            style={{ background: exam.bg }}
          >
            <img src={exam.img} alt={`${exam.title} Icon`} />
            <h3>{exam.title}</h3>
            <p>{exam.desc}</p>
          </div>
        ))}
      </section>

      <footer>
        <div className="socials">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedinIn /></a>
        </div>
        <p>© 2025 ExamsXpert. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
