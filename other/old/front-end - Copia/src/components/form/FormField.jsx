// eslint-disable-next-line
function FormField({ label, type, id, name, onChange }) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-bold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className=""
        onChange={onChange}
        required
      />
    </div>
  );
}

export default FormField;
