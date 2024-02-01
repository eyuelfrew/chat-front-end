import { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { ChatState } from "../Context/ChatProvider";
import { Card, Button, Spinner, Row, Col, FormControl } from "react-bootstrap";
import { getSender } from "./ChatLogic.jsx";
import UpdateGroup from "./UpdateGroup.jsx";
import axios from "axios";
import ScrollableChat from "../components/ScrollableChat.jsx";
import "./../App.css";
import { io } from "socket.io-client";
const ENDPOINT = "https://chat-app-back-zsof.onrender.com";
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const { user, selectedChat } = ChatState();
  const [newMessage, setNewMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  // const [state, setState] = useState();
  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://chat-app-back-zsof.onrender.com/api/message/${selectedChat._id}`,
        config
      );
      setLoading(false);
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (err) {
      console.log(err);
    }
  };
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "https://chat-app-back-zsof.onrender.com/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // console.log(data);
        setLoading(false);
        setNewMessage("");
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    // console.log(user);
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setIsTyping(false);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
    <>
      {Object.keys(selectedChat).length !== 0 ? (
        <div className="card-header ">
          {!selectedChat.isGroupChat ? (
            <p>
              {getSender(user, selectedChat.users)}
              {/* <Button onClick={() => setSelectedChat("")}>
                {" "}
                Clear Histry1
              </Button> */}
              {istyping ? <h4 className="text-danger"> Typing...</h4> : <></>}
            </p>
          ) : (
            <>
              {selectedChat.chatName.toUpperCase()}
              <UpdateGroup
                fetchMessages={fetchMessages}
                chatname={selectedChat.chatName}
                users={selectedChat.users}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            </>
          )}
        </div>
      ) : (
        <></>
      )}
      {Object.keys(selectedChat).length !== 0 ? (
        <div className="w-100">
          {!selectedChat.isGroupChat ? (
            <>
              {/* {getSender(user, selectedChat.users)} */}
              {loading ? (
                <div className="card-body " style={{ height: "28.8em" }}>
                  <Spinner animation="border" variant="success" />
                </div>
              ) : (
                <>
                  <div className=" bg-danger  ">
                    <div
                      className="messages overflow-scroll "
                      style={{ height: "26em" }}
                    >
                      <ScrollableChat messages={messages} />
                    </div>
                    <div className="d-flex">
                      <input
                        type="text"
                        className="border-5 border-danger-subtle form-control"
                        onKeyDown={sendMessage}
                        placeholder="Wrtie Message!"
                        required
                        onChange={typingHandler}
                        value={newMessage}
                      />
                      <button className="btn btn-primary  rounded-0 ">
                        <FaTelegramPlane />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <h1 className="text-bg-danger">this Group Chat</h1>
            </>
          )}
        </div>
      ) : (
        <div
          className="card-body d-flex justify-content-center align-items-center "
          style={{ height: "32.32em" }}
        >
          Click User To Start Chating
        </div>
      )}
    </>
  );
};

export default SingleChat;
