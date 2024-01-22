import axios from "axios";
import { useState } from "react";
import { Card, Form, Row, Button } from "react-bootstrap";
import toast from "react-hot-toast";

useState;
const Register = () => {
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
      validationErrors.name = "Full Name is required!";
    }
    if (!fields.email.trim()) {
      validationErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      validationErrors.email = "Email is not valid!";
    }
    if (!fields.password.trim()) {
      validationErrors.password = "Password is required!";
    } else if (fields.password.length < 6) {
      validationErrors.password = "Password should be at least 6 char!";
    }
    if (fields.confirm_password !== fields.password) {
      validationErrors.confirmPassword = "Password doesn't match!";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("https://chat-app-back-6bsl.onrender.com/api/user", fields)
        .then((res) => {
          if (res.data.status === 201) {
            toast.success("User Registered!");
          }
        });
    }
  };
  return (
    <>
      <Card className="bg-transparent">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="text-white fw-bolder">
                Full Name{" "}
              </Form.Label>
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
                <span className="bg-danger text-white">
                  {errors.confirmPassword}
                </span>
              )}
            </Form.Group>
            <Row className="px-3">
              <Button variant="primary" className="mt-3" type="submit">
                Sign Up
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Register;
