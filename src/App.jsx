import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import ChatPage from "./pages/ChatPage";
import VerfifyEmail from "./pages/VerfifyEmail.jsx";
import ChatProvider from "./Context/ChatProvider.jsx";
const App = () => {
  return (
    <div className="App">
      <ChatProvider>
        <Routes>
          <Route path={"/"} element={<LoginPage />} />
          <Route path={"/user/signup"} element={<SignUp />} />
          <Route path={"/chat"} element={<ChatPage />} />
          <Route path={"/user/confirm/:token"} element={<VerfifyEmail />} />
        </Routes>
      </ChatProvider>
    </div>
  );
};

export default App;
