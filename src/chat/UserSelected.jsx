import { Button } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
const UserSelected = ({ user, handleFunction }) => {
  return (
    <Button className="btn-sm mx-1 mt-1" onClick={handleFunction}>
      {user.name}
      <MdCancel className="mx-1" />
    </Button>
  );
};

export default UserSelected;
