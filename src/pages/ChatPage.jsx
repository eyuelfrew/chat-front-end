import { ChatState } from "../Context/ChatProvider.jsx";
import NavBar from "../components/NavBar";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigateTo("/");
    }
  }, []);
  return (
    <>
      <div
        className="container-fluid app-layout"
        style={{ width: "90%", marginBottom: "100px" }}
      >
        {user && <NavBar />}
        <div className="row g-0 h-100 ">
          <div
            className="col-4 d-sm-none d-md-flex "
            style={{ height: "30em" }}
          >
            {user && <MyChats fetchAgain={fetchAgain} />}
          </div>
          <div className="col-lg-8" style={{ height: "30em" }}>
            {user && (
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </div>
        </div>
        {/* {user && <MyChats fetchAgain={fetchAgain} />} */}

        <Toaster position="top-center" />
      </div>
    </>
  );
};
{
  /* <MyChats fetchAgain={fetchAgain}/> */
}
export default ChatPage;
