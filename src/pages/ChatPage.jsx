import { Container, Row, Col } from "react-bootstrap";
import { ChatState } from "../Context/ChatProvider";
import SidePannel from "../components/SidePannel";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
const ChatPage = () => {
  const { user } = ChatState();
  const navigateTo = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    if (!user) navigateTo("/");
  }, []);
  return (
    <>
      <Container fluid className="vh-100">
        {user && <SidePannel />}
        <Row>
          <Col sm={4} lg={4}>
            {user && <MyChats fetchAgain={fetchAgain} />}
          </Col>
          <Col sm={4} lg={6}>
            {" "}
            {user && (
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </Col>
        </Row>
        <Toaster position="top-center" />
      </Container>
    </>
  );
};

export default ChatPage;
