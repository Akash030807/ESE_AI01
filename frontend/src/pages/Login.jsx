import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

import "./Auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };


  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={submitHandler}
      >

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={changeHandler}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={changeHandler}
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?

          <Link to="/signup">
            Signup
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;