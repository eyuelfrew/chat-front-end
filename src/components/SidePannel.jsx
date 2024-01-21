import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Offcanvas,
  Image,
  Dropdown,
  Button,
  Form,
  Container,
  Spinner,
  InputGroup,
  // Modal,
  // Container,
  // Row,
  // Col,
} from "react-bootstrap";
import { IoSearchSharp } from "react-icons/io5";
import { ChatState } from "../Context/ChatProvider";
import Profile from "./Profile";
import "../App.css";
import toast from "react-hot-toast";
import UsersList from "./UsersList";
const SidePannel = () => {
  const [showSide, setShowSide] = useState(false);
  const handleClose = () => setShowSide(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShowSide(true);
  };
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const [modalShow, setModalShow] = useState(false);
  const navigateTo = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("user_info");
    navigateTo("/");
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "https://chat-app-back-6bsl.onrender.com/api/chat",
        { userId },
        config
      );
      console.log(data);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);

      setLoadingChat(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSearch = async () => {
    if (!search) {
      toast.error("Enter User Name");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://chat-app-back-6bsl.onrender.com/api/user/?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
      console.log(searchResult);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user_info");
    if (!user) {
      navigateTo("/");
    }
  });
  return (
    <div>
      <nav className="navbar bg-body-tertiary mt-4 rounded-3">
        <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          <h1 className="fs-3">Talk With Friends</h1>
          <div
            className="d-flex h-100 justify-content-between mx-5"
            role="search"
          >
            {/* <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            /> */}
            <div>
              <button className="btn btn-outline-success" onClick={handleShow}>
                <IoSearchSharp />
                Search Users
              </button>
            </div>
            <div className="mx-4">
              <Dropdown>
                <Dropdown.Toggle className="border-0 bg-transparent text-black">
                  {user.name}
                  <Image width={30} src={user.pic} roundedCircle />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">My Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Launch modal
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
      <Offcanvas
        show={showSide}
        onHide={handleClose}
        className="offcanvas-pos "
      >
        <Offcanvas.Header closeButton>
          <h4>Find Users</h4>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <InputGroup className="">
            <InputGroup.Text id="basic-addon1">
              <IoSearchSharp />
            </InputGroup.Text>
            <Form.Control
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="User Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <Button onClick={handleSearch}>Go</Button>
          </InputGroup>
          <Container>
            {loading ? (
              <div className=" d-flex  justify-content-center mt-5">
                <Spinner className="text-center" animation="grow" />
              </div>
            ) : (
              searchResult.map((res) => (
                <UsersList
                  key={res._id}
                  user={res}
                  handleFunction={() => accessChat(res._id)}
                />
              ))
            )}
            {loadingChat && <Spinner animation="border" variant="success" />}
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
      {/* 
           Profle Show Modal
       */}
      <Profile show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default SidePannel;
