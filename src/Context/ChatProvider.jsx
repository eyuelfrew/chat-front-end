import { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState({});
  const [currentChat, setCurrentChat] = useState({});
  const [chats, setChats] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    setUser(user_info);
  }, []);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        currentChat,
        setCurrentChat,
        fetchAgain,
        setFetchAgain,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
