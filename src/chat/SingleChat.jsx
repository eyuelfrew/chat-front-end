import { useEffect, useState, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { ChatState } from "../Context/ChatProvider";
import { Spinner } from "react-bootstrap";
import { getSender, senderInfo } from "./ChatLogic.jsx";
import UpdateGroup from "./UpdateGroup.jsx";
import axios from "axios";
import ScrollableChat from "../components/ScrollableChat.jsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import "./../App.css";
import { io } from "socket.io-client";
const ENDPOINT = "https://chat-app-back-zsof.onrender.com";
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const { user, selectedChat, setCurrentChat } = ChatState();
  const [newMessage, setNewMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  var [deleteLoading, setDeleteLoading] = useState(false);
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
      setFetchAgain(!fetchAgain);
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
  const handleDeleteChat = () => {};
  const handleClearChat = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Clearing Chat",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: "dark-theme",
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          html: '<div class="delete-loader"></div>',
          customClass: "dark-theme",
        });
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.delete(
            `https://chat-app-back-zsof.onrender.com/api/message/clear/${selectedChat._id}`,
            config
          );
          fetchMessages();
          if (data.message.acknowledged === true) {
            Swal.fire(
              {
                customClass: "dark-theme",
                icon: "success",
                text: "Chat Cleared👍",
              },
              "Cleared!",
              "Chat has been cleared.",
              "success"
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };
  return (
    <>
      {Object.keys(selectedChat).length !== 0 ? (
        <div className="card-header ">
          {!selectedChat.isGroupChat ? (
            <p className="fs-5">
              {senderInfo(user, selectedChat.users).name}
              <BsThreeDotsVertical
                className="float-end mt-1 fs-4"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#chatMenu"
              />
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
              {/* {getSender(user, selectedChat.users).name} */}
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
      <div
        className="modal fade "
        id="chatMenu"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5 " id="exampleModalLabel">
                Chat Menu
              </h1>
              <button
                type="button"
                className="btn btn-sm bg-transparent text-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <IoClose className="fs-4" />
              </button>
            </div>
            <div className="modal-body ">
              <div
                className="row manu-list"
                data-bs-toggle="modal"
                data-bs-target="#chatMenu"
                onClick={handleClearChat}
              >
                <h5>Clear Chat</h5>
              </div>
              <div className="row manu-list" onClick={handleDeleteChat}>
                <h5>
                  Delete Chat{" "}
                  <MdDelete className="float-end mx-5 text-danger" />{" "}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleChat;
