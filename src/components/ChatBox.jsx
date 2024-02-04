// import { ChatState } from "../Context/ChatProvider";
import SingleChat from "../chat/SingleChat";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  // const { selectedChat, user } = ChatState();
  return (
    <div className=" card">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
