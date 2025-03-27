import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("auth") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (authStatus && storedUser) {
      setIsAuthenticated(true);
      setUserName(storedUser.name);
    }
  }, []);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleAuth = () => {
    if (isSignup) {
      localStorage.setItem("user", JSON.stringify(credentials));
      alert("Signup successful! Please log in.");
      setIsSignup(false);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === credentials.email && storedUser.password === credentials.password) {
        localStorage.setItem("auth", "true");
        setIsAuthenticated(true);
        setUserName(storedUser.name);
      } else {
        alert("Invalid credentials");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUserName("");
  };

  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <div className="text-center">
          <h2>Welcome, {userName}!</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="card p-4 w-50 mx-auto">
          <h2 className="text-center">{isSignup ? "Signup" : "Login"}</h2>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control my-2"
              value={credentials.name}
              onChange={handleInputChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control my-2"
            value={credentials.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control my-2"
            value={credentials.password}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" onClick={handleAuth}>
            {isSignup ? "Signup" : "Login"}
          </button>
          <p className="mt-2 text-center">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button className="btn btn-link" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Login" : "Signup"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthApp;
