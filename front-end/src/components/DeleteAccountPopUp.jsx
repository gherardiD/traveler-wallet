import { useNavigate } from "react-router-dom";
import Axios from "../api/Axios";
import Button from "./Button";
import styles from "./DeleteAccountPopUp.module.css";

// eslint-disable-next-line react/prop-types
function DeleteAccountPopUp({ toggleDeletePopUp }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      await Axios.delete("/users/delete-me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleDelete} type="primary">
        Delete Account
      </Button>

      <Button onClick={toggleDeletePopUp} type="secondary">
        Annul
      </Button>
    </div>
  );
}

export default DeleteAccountPopUp;
