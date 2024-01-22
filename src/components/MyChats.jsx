import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { IoMdAddCircleOutline } from "react-icons/io";
import Spinner from "react-bootstrap/Spinner";
import { getSender } from "../chat/ChatLogic";
import GroupChat from "../chat/GroupChat";
import axios from "axios";
import { Button } from "react-bootstrap";
// import toast from "react-hot-toast";
const MyChats = ({ fetchAgain }) => {
  // console.log(fetchAgain);
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const hanldeSelection = (ch) => {
    setSelectedChat(ch);
  };
  const [modalShow, setModalShow] = useState(false);
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://chat-app-back-6bsl.onrender.com/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user_info")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <div className="container w-100 bg-white h-100 mt-3 rounded-3">
      <div className="d-flex justify-content-around">
        <h1 className="fs-4 text-center mt-1">My Chats</h1>
        <Button
          className="btn btn-success mt-1"
          onClick={() => setModalShow(true)}
        >
          New Group Chat
          <IoMdAddCircleOutline />
        </Button>
        <GroupChat show={modalShow} onHide={() => setModalShow(false)} />
      </div>
      {chats ? (
        <div className="row">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className="card"
              onClick={() => hanldeSelection(chat)}
              style={{
                background: selectedChat._id === chat._id ? "blue" : "green",
                cursor: "pointer",
              }}
            >
              <p>
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <Spinner animation="border" variant="info" />
      )}
    </div>
  );
};

export default MyChats;
