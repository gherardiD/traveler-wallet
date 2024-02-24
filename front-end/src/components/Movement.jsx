/* eslint-disable react/prop-types */
import axios from "../api/Axios";

function Movement({ movement, setMovements = null }) {
  const handleDelete = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.delete(`/movements/${movement._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 204) {
        setMovements((movements) =>
          movements.filter(
            (prev_movement) => prev_movement._id !== movement._id
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="mb-6 flex gap-10">
      <div>
        <h1 className="text-gray-600">{movement.date}</h1>
        <h1
          className={`${
            movement.sign === "+" ? "text-green-500" : "text-red-500"
          } text-xl font-bold`}
        >
          {movement.sign}
          {movement.amount}
        </h1>
      </div>
      {setMovements !== null && (
        <button className="text-red-500 font-bold" onClick={handleDelete}>
          Delete
        </button>
      )}
    </li>
  );
}

export default Movement;
