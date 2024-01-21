import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/chat"} element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
