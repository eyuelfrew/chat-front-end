import axios from "axios";
import { useState } from "react";
import { Form, Card, Row, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        const response = res.data;
        if (res.status === 200) {
          toast.success("Successfully Loged in!");
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
    <>
      <Card className="bg-transparent">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="text-white fw-bolder">
                Email Addrese why
              </Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border-2 border-primary-subtle"
                placeholder="example@gmail.com"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white fw-bolder">Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-2 border-primary-subtle"
                placeholder="********"
              ></Form.Control>
            </Form.Group>
            <Row className="px-3 mt-2">
              <Button variant="primary" type="submit" className="fw-bolder">
                Login
              </Button>
            </Row>
          </Form>
        </Card.Body>
        <Card.Footer className="border-0">
          <Row className="px-3">
            <Button variant="outline-success" className="mt-1 text-white">
              Sign Up
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Login;
