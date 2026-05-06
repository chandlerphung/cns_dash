import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onLogin();
        } else {
          setError("Invalid username or password");
        }
      })
      .catch(() => setError("Could not connect to server"));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>CNS Dashboard</h1>
        <p>Sign in to continue</p>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />
        {error && <p className="login-error">{error}</p>}
        <button className="login-btn" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default Login;