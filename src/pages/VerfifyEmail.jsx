import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
useParams;
const VerfifyEmail = () => {
  const { token } = useParams();
  const { setUser } = ChatState();
  const [loading, setLoading] = useState(false);
  // const { user, setUser } = ChatState();
  const naviageTo = useNavigate();
  const confirmEmail = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://chat-app-back-zsof.onrender.com/api/user/confirm/${token}`
    );
    console.log(data);
    localStorage.setItem("user_info", JSON.stringify(data.user));
    naviageTo("/chat");
  };
  useEffect(() => {
    confirmEmail();
  }, []);
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <Spinner animation="border" variant="info" />
      <h1 className="text-white">Verfifing Email</h1>
    </div>
  );
};

export default VerfifyEmail;
