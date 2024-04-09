// eslint-disable-next-line react/prop-types
function SubmittingError({ error }) {
  return (
    <>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
}

export default SubmittingError;
