import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const apiUrl = "https://restaurants-api-u5ww.onrender.com";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {dispatch} = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch({type:'SET_USER', token})
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${apiUrl}/api/auth/login`,
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      dispatch({type:'SET_USER', token: data.token});

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="screen">
      <form onSubmit={loginHandler} className="form">
        <h3 className="form-title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
          <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
          </Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/signup">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

