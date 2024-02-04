import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import Spinner from "react-bootstrap/Spinner";
import { senderInfo } from "../chat/ChatLogic.jsx";
import axios from "axios";
const MyChats = ({ fetchAgain }) => {
  const [loading, setLoading] = useState(false);
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const hanldeSelection = (ch) => {
    setSelectedChat(ch);
  };
  const fetchChats = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://chat-app-back-zsof.onrender.com/api/chat",
        config
      );
      // console.log(data);
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("user_info")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <div
      className=" w-100  rounded-top-0   rounded-3 "
      style={{
        // border: "5px solid  #1c1c84",
        borderTop: "none",
        background: "	#151269",
      }}
    >
      <div
        className="position-relative rounded-1 "
        style={{ background: "#0b5394" }}
      >
        <h1 className="fs-4 text-center mt-1 text-dark text-white">My Chats</h1>
        {/* <Button
          className="btn btn-success mt-1"
          onClick={() => setModalShow(true)}
        >
          New Group Chat
          <IoMdAddCircleOutline />
        </Button>
        <GroupChat show={modalShow} onHide={() => setModalShow(false)} /> */}
      </div>
      {chats.length === 0 ? (
        <div>
          {" "}
          {loading && (
            <div className="text-center position-relative">
              <Spinner animation="border" variant="info" />
            </div>
          )}
          <h1 className="text-dark">No Chats Available!</h1>
        </div>
      ) : (
        <>
          {chats ? (
            <div
              className="container h-100 mt-1 rounded-2  w-100  "
              style={{ background: "#0b5394", zIndex: "10" }}
            >
              {loading && (
                <div className="text-center position-relative">
                  <Spinner animation="border" variant="info" />
                </div>
              )}
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  className="card d-flex justify-content-center mb-1 p-2 "
                  onClick={() => hanldeSelection(chat)}
                  style={{
                    background:
                      selectedChat._id === chat._id ? "#000068" : "#10898d",
                    cursor: "pointer",
                    height: "3em",
                  }}
                >
                  {/* <p> */}
                  {!chat.isGroupChat ? (
                    <div className="d-flex  align-items-center ">
                      <img
                        className="bg-danger mt-0"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "100%",
                        }}
                        src={senderInfo(user, chat.users).pic}
                        alt=""
                      />
                      {/* <div> */}
                      <span className="mx-2 text-white ">
                        {" "}
                        {senderInfo(user, chat.users).name}
                      </span>
                      {/* </div> */}
                    </div>
                  ) : (
                    chat.chatName
                  )}
                  {/* </p> */}
                </div>
              ))}
            </div>
          ) : (
            // <Spinner animation="border" variant="info" />
            <div className="container    justify-content-center align-items-center text-center mt-5">
              <h4 className="text-dark">No Chats Available!</h4>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyChats;
