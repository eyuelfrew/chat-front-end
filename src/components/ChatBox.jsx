import { Card } from "react-bootstrap";
// import { ChatState } from "../Context/ChatProvider";
import SingleChat from "../chat/SingleChat";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  // const { selectedChat, user } = ChatState();
  return (
    <Card className="mb-5 vh-100" style={{ marginBottom: "50px!import" }}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Card>
  );
};

export default ChatBox;
