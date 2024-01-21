import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import Login from "./../forms/Login.jsx";
import Register from "./../forms/Register.jsx";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./../App.css";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigateTo = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigateTo("chat");
  }, [navigateTo]);
  return (
    <div className="container-fluid d-flex flex-column  justify-content-center align-items-center vh-100">
      <Suspense
        fallback={
          <div className="text-danger">
            <h1>Loading ...</h1>
          </div>
        }
      >
        <Card className="bg-transparent w-50 border-5 border-primary ">
          <Card.Title>
            <h1 className="text-white text-center text-capitalize ">
              Talk With Friend
            </h1>
          </Card.Title>
        </Card>
        <Card className="w-50 mt-2 border-3 border-primary-subtle bg-transparent">
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-1 border-0 rounded-5 justify-content-center"
          >
            <Tab eventKey="home" title="Login" className="ma-tab rounded-5">
              <Login></Login>
            </Tab>
            <Tab eventKey="profile" title="Sign Up">
              <Register></Register>
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
              Tab content for Contact
            </Tab>
          </Tabs>
          <Card.Title className="d-flex justify-content-around mt-2"></Card.Title>
        </Card>
      </Suspense>
      <Toaster />
    </div>
  );
};

export default HomePage;
