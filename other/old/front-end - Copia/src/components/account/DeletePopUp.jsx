// eslint-disable-next-line react/prop-types
function DeletePopUp({ toggleDeletePopUp, handleDelete }) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg">
          <p>Are you sure to delete your account?</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={toggleDeletePopUp}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DeletePopUp;