import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../AuthContext";

export default function Header(){
  const { user, logout } = useContext(AuthCtx);
  return (
    <header>
      <h1>ExamsXpert</h1>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/tests">Tests</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/about">About Us</Link>
        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
