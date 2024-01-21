import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../chat/ChatLogic";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className="d-flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <div
                // className="card mt-1 d-flex justify-content-center card-hover "
                style={{}}
              >
                {/* <div className="col-4 h-100  d-flex align-items-center">
                    <img src={m.sender.pic} width={40} alt="Pro" />
                  </div> */}
                {/* {m.sender.name} */}
                <img
                  src={m.sender.pic}
                  className="rounded-5"
                  width={50}
                  alt="Pro"
                />
              </div>
            )}
            <span
              style={{
                // marginLeft: "30px",
                maxWidth: "75%",
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginRight: 10,
                marginTop: isSameUser(messages, m, 1, user._id) ? 3 : 10,
              }}
              className="text-black rounded-2 "
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
