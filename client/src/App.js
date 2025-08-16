import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthCtx } from "./AuthContext";
import { useContext } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tests from "./pages/Tests";
import TakeTest from "./pages/TakeTest";
import AdminPanel from "./pages/AdminPanel";
import AddTest from "./pages/AddTest";

function Protected({ children, admin=false }){
  const { user, ready } = useContext(AuthCtx);
  if (!ready) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (admin && user.role!=="admin") return <Navigate to="/" replace />;
  return children;
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<div className="container"><h2>About Us</h2><p>ExamsXpert — Your Exam, Our Responsibility.</p></div>} />
          <Route path="/blogs" element={<div className="container"><h2>Blogs (coming soon)</h2></div>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/tests" element={<Tests/>}/>
          <Route path="/tests/:id" element={<TakeTest/>}/>
          <Route path="/admin" element={<Protected admin><AdminPanel/></Protected>} />
          <Route path="/admin/add" element={<Protected admin><AddTest/></Protected>} />
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
  }
  
