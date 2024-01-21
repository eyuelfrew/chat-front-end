import Button from "react-bootstrap/Button";
import { Image, Modal } from "react-bootstrap";
import { ChatState } from "../Context/ChatProvider";

const Profile = (props) => {
  const { user } = ChatState();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {user.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={user.pic} width={50} />
        <div>Email: {user.email}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Profile;
