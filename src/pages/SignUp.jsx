import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import "../App.css";
useState;
const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!fields.name.trim()) {
      setErrors({ name: "test" });
      toast.error("Full Name is required!");
    }
    if (!fields.email.trim()) {
      setErrors({ name: "test" });

      validationErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      setErrors({ name: "test" });

      toast.error("Email is not valid!");
    }
    if (!fields.password.trim()) {
      setErrors({ name: "test" });

      validationErrors.password = "Password is required!";
    } else if (fields.password.length < 6) {
      setErrors({ name: "test" });

      toast.error("Password must be at leat 6 character!");
    }
    if (fields.confirm_password !== fields.password) {
      setErrors({ name: "test" });

      toast.error("Password did not match!");
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log(fields);
      axios
        .post("https://chat-app-back-zsof.onrender.com/api/user", fields)
        .then((res) => {
          if (res.data.status === 201) {
            setFields({
              name: "",
              email: "",
              password: "",
              confirm_password: "",
            });
            toast((t) => (
              <span>
                Check Your email, we have sent you a link for verifiying your
                account! <b>bold</b>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => toast.dismiss(t.id)}
                >
                  x
                </button>
              </span>
            ));
          }
        });
    }
  };
  return (
    <>
      <div className="container-fluid vh-100 d-flex  justify-content-center align-items-center">
        <div className="box h-75">
          <form className="h-100" onSubmit={handleSubmit}>
            <h2>Create Account </h2>
            <div className="inputBox">
              <input
                type="text"
                required
                name="name"
                value={fields.name}
                onChange={handleChange}
              />
              <span>Full Name</span>
              <i></i>
              {errors.name && (
                <span className="bg-danger text-white">{errors.name}</span>
              )}
            </div>
            <div className="inputBox">
              <input
                type="text"
                required
                name="email"
                value={fields.email}
                onChange={handleChange}
              />
              <span>Your Email</span>
              <i></i>
              {errors.email && (
                <span className="bg-danger text-white">{errors.name}</span>
              )}
            </div>
            <div className="inputBox">
              <input
                type="password"
                value={fields.password}
                name="password"
                onChange={handleChange}
                required
              />
              <span>Password</span>
              <i></i>
              {errors.password && (
                <span className="bg-danger text-white">{errors.name}</span>
              )}
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="confirm_password"
                value={fields.confirm_password}
                onChange={handleChange}
                required
              />
              <span>Confirm Password</span>

              <i></i>
            </div>
            <div className="links">
              <a>Have Account Already? </a>
              <a href="/signeup">Login</a>
            </div>
            <div className="row">
              <button className="btn btn-primary " type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default SignUp;
{
  /* <Card className="bg-transparent">
  <Card.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label className="text-white fw-bolder">Full Name </Form.Label>
        <Form.Control
          onChange={handleChange}
          type="text"
          name="name"
          className="border-2 border-primary-subtle"
          placeholder="Name"
        />
        {errors.name && (
          <span className="bg-danger text-white">{errors.name}</span>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-white fw-bolder">Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={handleChange}
          className="border-2 border-primary-subtle"
          placeholder="example@gmail.com"
        ></Form.Control>
        {errors.email && (
          <span className="bg-danger text-white">{errors.email}</span>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-white fw-bolder">Password</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="password"
          type="password"
          className="border-2 border-primary-subtle"
          placeholder="*****"
        ></Form.Control>
        {errors.password && (
          <span className="bg-danger text-white">{errors.password}</span>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-white fw-bolder">
          Confirm Password
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          type="password"
          name="confirm_password"
          className="border-2 border-primary-subtle"
          placeholder="*****"
        ></Form.Control>
        {errors.confirmPassword && (
          <span className="bg-danger text-white">{errors.confirmPassword}</span>
        )}
      </Form.Group>
      <Row className="px-3">
        <Button variant="primary" className="mt-3" type="submit">
          Sign Up
        </Button>
      </Row>
    </Form>
  </Card.Body>
</Card>; */
}
