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
        className="w-full px-4 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        onChange={onChange}
        required
      />
    </div>
  );
}

export default FormField;
