import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Form, Spinner, Button, Modal } from "react-bootstrap";
import axios from "axios";
import UsersList from "../components/UsersList";
import toast from "react-hot-toast";
import UserSelected from "./UserSelected";
const GroupChat = (props) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUser] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const { user, chats, setChats } = ChatState();
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
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast("Fill of Fields please!");
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setLoading(false);
      props.onHide();
      toast.success("Group Chat Created!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleGroup = (userGroup) => {
    if (selectedUsers.includes(user)) {
      toast.error("user Exists!");
      return;
    }
    setSelectedUser([...selectedUsers, userGroup]);
  };
  const handleDelete = (deleteUser) => {
    setSelectedUser(
      selectedUsers.filter((selected) => selected._id !== deleteUser)
    );
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          <h4>Create Group</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              placeholder="search users"
              onChange={(e) => setGroupChatName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Control
              placeholder="add users"
              onChange={(e) => handleSearch(e.target.value)}
            ></Form.Control>
            {/* Rendering Selected Users */}
            {selectedUsers.map((user) => (
              <UserSelected
                key={user._id}
                user={user}
                handleFunction={() => handleDelete(user._id)}
              />
            ))}
            {/* Rendere Search Users */}
            {loading ? (
              <Spinner animation="border" variant="info" />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UsersList
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Create</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupChat;
