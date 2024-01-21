const UsersList = ({ user, handleFunction }) => {
  return (
    <div
      className="card mt-1 d-flex justify-content-center card-hover"
      style={{ height: "3rem" }}
      onClick={handleFunction}
    >
      <div className="row">
        <div className="col-4 h-100  d-flex align-items-center">
          <img src={user.pic} width={50} alt="Pro" />
        </div>
        <div className="col-8 h-100 d-flex align-items-center ">
          {user.name}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
