import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:4000/common-api/login",
        { email, password },
        { withCredentials: true }
      );
      const user = res.data?.payload;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Login successful");

      if (user?.role === "AUTHOR") navigate("/author-profile");
      else if (user?.role === "USER") navigate("/user-profile");
      else if (user?.role === "ADMIN") navigate("/admin-profile");
      else navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {error ? <p className="error">{error}</p> : null}

          <button className="btn-primary" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;