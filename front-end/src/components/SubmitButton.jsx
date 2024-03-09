// eslint-disable-next-line react/prop-types
function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
