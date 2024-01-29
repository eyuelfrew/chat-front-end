import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import ChatPage from "./pages/ChatPage";
import VerfifyEmail from "./pages/VerfifyEmail.jsx";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/user/signup"} element={<SignUp />} />
        <Route path={"/chat"} element={<ChatPage />} />
        <Route path={"/user/confirm/:token"} element={<VerfifyEmail />} />
      </Routes>
    </div>
  );
};

export default App;
