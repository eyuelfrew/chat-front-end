import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import "../App.css";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const SignUp = async () => {
    setLoading(true);
    const { data } = await axios.post(
      "https://chat-app-back-zsof.onrender.com/api/user",
      fields
    );
    setLoading(false);

    if (data.status == 201) {
      setFields({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
      toast(
        "We Have Sent You Email!!!\n\nClick The Link To Verifiy Your Email Account.",
        {
          duration: 4000,
          icon: "👏",
        }
      );
    }
    console.log(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fields.name.trim()) {
      toast.error("Full Name is required!", { duration: 1500 });
      return;
    }
    if (!fields.email.trim()) {
      toast.error("Email is required!", { duration: 1500 });
      return;
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      toast.error("Email is not valid!", { duration: 1500 });
      return;
    }
    if (!fields.password.trim()) {
      toast.error("Password is required!");
    } else if (fields.password.length < 6) {
      toast.error("Password must be at leat 6 character!", { duration: 1500 });
      return;
    }
    if (fields.confirm_password !== fields.password) {
      toast.error("Password did not match!", { duration: 1500 });
      return;
    }
    SignUp();
  };
  return (
    <>
      <div className="container-fluid vh-100 d-flex  justify-content-center align-items-center">
        <div className="box h-75">
          <form className="h-100" onSubmit={handleSubmit}>
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="loader"></div>
              </div>
            ) : (
              <h2>Create Account</h2>
            )}
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
