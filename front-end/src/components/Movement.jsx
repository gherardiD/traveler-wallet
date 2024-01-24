import axios from "../api/Axios";

function Movement({movement, setMovements}){

  const handleDelete = async () => {
    try{
      const response = await axios.delete(`/user/movements/:${movement._id}`);
      if(response.ok){
        const deletedMovement = await response.json();
        console.log(deletedMovement);
        // TODO: understand if this is the best way to do it
        setMovements((prevMovements) => {
          return prevMovements.filter((mov) => mov.id !== movement.id);
        });
    }}catch(error){
      console.log(error);
    }
  }

  return(
  <li className="mb-6 flex gap-10">
    <div>
      <h1 className="text-gray-600">{movement.date}</h1>
      <h1 className={`${movement.sign === '+' ? 'text-green-500' : 'text-red-500'} text-xl font-bold`}>
        {movement.sign}{movement.amount}
      </h1>
    </div>
    <button className="text-red-500 font-bold" onClick={handleDelete}>
      Delete
    </button>
  </li>
  )
}

export default Movement;