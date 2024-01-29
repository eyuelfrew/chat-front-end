import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { ChatState } from "../Context/ChatProvider";
// import Login from "./../forms/Login.jsx";
// import Register from "./../forms/Register.jsx";
// import { Suspense } from "react";
// import { Toaster } from "react-hot-toast";
import "./../App.css";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigateTo = useNavigate();
  const { setUser } = ChatState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //https://chat-app-back-zsof.onrender.com/api/user/login
    axios
      .post("https://chat-app-back-zsof.onrender.com/api/user/login", form)
      .then((data) => {
        const response = data.data;
        console.log(response);
        if (response.status === 200) {
          setUser(response);
          localStorage.setItem("user_info", JSON.stringify(response));
          navigateTo("/chat");
        }
        if (response.status === 401) {
          toast.error("Wrong Credentials");
        }
        if (response.status === 404) {
          toast.error("User Not Found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid vh-100 d-flex  justify-content-center align-items-center">
      <div className="box">
        <form className="h-100" onSubmit={handleSubmit}>
          <h2>Login </h2>
          <div className="inputBox">
            <input
              type="text"
              required
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <span>Your Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="links">
            <a href="#">Forgot Password?</a>
            <Link to={"/user/signup"}>Sign Up</Link>
          </div>
          <div className="row">
            <button className="btn btn-primary " type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default LoginPage;
