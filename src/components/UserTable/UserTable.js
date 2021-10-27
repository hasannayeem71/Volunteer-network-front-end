import axios from "axios";
import React from "react";
import useAuth from "../../hooks/useAuth";

const UserTable = ({ volunteer, volunteerList, setVolunteerList }) => {
  const { userName, email, title, date, _id } = volunteer;
  const { user } = useAuth();
  const handleDelete = () => {
    if (user.email === "mahmudulnayeem71@gmail.com") {
      axios
        .delete(`https://volunteer-networkx.herokuapp.com/user/register/${_id}`)
        .then((res) => {
          if (res.data.acknowledged) {
            alert("DELETED");
            const remeningVolunteer = volunteerList.filter(
              (vol) => vol._id !== _id
            );
            setVolunteerList(remeningVolunteer);
          }
        });
    } else {
      alert("Only admin can perform this action ");
      return;
    }
  };
  return (
    <tr>
      <td>{userName}</td>
      <td>{email}</td>
      <td>{date}</td>
      <td>{title}</td>
      <td onClick={handleDelete}>
        <i className="far fa-trash-alt text-danger"></i>
      </td>
    </tr>
  );
};

export default UserTable;
