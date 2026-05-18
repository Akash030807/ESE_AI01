import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

import "./Auth.css";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await API.post(
        "/auth/signup",
        formData
      );

      alert("Signup Successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };


  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={submitHandler}
      >

        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={changeHandler}
        />

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
          Signup
        </button>

        <p>
          Already have an account?

          <Link to="/">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;