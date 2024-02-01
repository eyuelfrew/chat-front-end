import { IoMenu } from "react-icons/io5";
import { HiSpeakerphone } from "react-icons/hi";
import { FaUserLarge } from "react-icons/fa6";
import { MdGroups2, MdDelete } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Offcanvas,
  Image,
  Dropdown,
  Button,
  Form,
  Container,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { IoSearchSharp } from "react-icons/io5";
import { ChatState } from "../Context/ChatProvider.jsx";
import Profile from "./Profile.jsx";
import "../App.css";
import toast from "react-hot-toast";
import UsersList from "./UsersList.jsx";
const NavBar = () => {
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
        "https://chat-app-back-zsof.onrender.com/api/chat",
        { userId },
        config
      );
      // console.log(data);
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
        `https://chat-app-back-zsof.onrender.com/api/user/?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
      // console.log(searchResult);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(user);
    // const user = localStorage.getItem("user_info");
    // if (!user) {
    //   navigateTo("/");
    // }
  });
  return (
    <div>
      <nav className="navbar rounded-top-3 navbar-color">
        <div className="container-fluid">
          <button
            className="btn btn-lg "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <IoMenu className="text-primary fs-2 fw-bolder" />
          </button>
          {/* <h1 className="fs-3">Talk With Friends</h1> */}
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
              <IoMdNotifications
                className="mt-2"
                size={27}
                onClick={() => alert("Notificaion Works!")}
              />
              <button className="btn btn-outline-success" onClick={handleShow}>
                <IoSearchSharp />
                Search Users
              </button>
            </div>
            <div className="mx-4 d-flex ">
              <Dropdown>
                <Dropdown.Toggle className="border-0 bg-transparent text-white">
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
        className="position-absolute "
      >
        <Offcanvas.Header closeButton>
          <h4>Find Users</h4>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <InputGroup className="bxcbvx">
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
      {/* --------OFF-CANVAS-------- */}
      <div
        className="offcanvas offcanvas-start bg-dark position-absolute   rounded-top-5 "
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="">
          <div className="row">
            <div className="col-10">
              <img src={user.pic} className="w-25 rounded-5 " alt="" />
            </div>
            <div className="col-2">
              {" "}
              <button
                type="button"
                className="btn btn-primary  bg-transparent  rounded-5 "
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                X
              </button>
            </div>
          </div>
          <div className="row">
            <h2 className="text-white mx-2 fs-5">{user.name}</h2>
          </div>
        </div>
        <div className="offcanvas-body">
          <div className="">
            <ul className="">
              <li
                className="list-group-item "
                onClick={() => alert("test")}
                style={{ cursor: "pointer" }}
              >
                <MdGroups2 size={27} className="mx-3" />
                New Group
              </li>
              <li
                className="list-group-item "
                onClick={() => alert("test")}
                style={{ cursor: "pointer" }}
              >
                <HiSpeakerphone size={27} className="mx-3" />
                New Channel
              </li>
              <li
                className="list-group-item "
                onClick={() => alert("test")}
                style={{ cursor: "pointer" }}
              >
                <MdGroups2 size={27} className="mx-3" />
                New Group
              </li>
              <li
                className="list-group-item "
                onClick={() => alert("test")}
                style={{ cursor: "pointer" }}
              >
                <FaUserLarge size={27} className="mx-3" />
                Profile
              </li>
              <li
                className="list-group-item "
                onClick={() => alert("test")}
                style={{ cursor: "pointer" }}
              >
                <MdDelete size={27} className="mx-3 text-danger" />
                Delete Account
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
