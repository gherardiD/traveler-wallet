import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  function handleBackClick(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Button onClick={(e) => handleBackClick(e)} type={"back"}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
