import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Form, Spinner, Button, Modal } from "react-bootstrap";
import axios from "axios";
import UsersList from "../components/UsersList";
import UserSelected from "./UserSelected";

const UpdateGroup = ({
  chatname,
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setGroupChatName(chatname);
    setShow(true);
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
        `https://chat-app-back-6bsl.onrender.com/api/user?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    if (!groupChatName) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "https://chat-app-back-6bsl.onrender.com/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Group
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        // backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-center"
          >
            <h4>{selectedChat.chatName}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                placeholder="search users"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Control
                placeholder="add users"
                onChange={(e) => handleSearch(e.target.value)}
              ></Form.Control>
              {/* Rendering Selected Users */}
              {selectedChat.users.map((user) => (
                <UserSelected
                  key={user._id}
                  user={user}
                  // handleFunction={() => handleDelete(user._id)}
                />
              ))}
              {/* Rendere Search Users */}
              {loading ? (
                <Spinner animation="border" variant="info" />
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => <UsersList key={user._id} user={user} />)
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEdit}>Update</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateGroup;
