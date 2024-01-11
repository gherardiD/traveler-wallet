// disable eslint
/* eslint-disable */
function Currency({ currency }) {
  return (
    <li
      key={currency.code}
      className="list-group-item flex justify-between items-center"
    >
      <span className="font-bold">{currency.name}</span>
      <span className="font-bold">{currency.code}</span>
    </li>
  );
}

export default Currency;
