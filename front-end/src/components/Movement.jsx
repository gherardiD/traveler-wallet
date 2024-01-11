function Movement({movement}){
  return(
  <li className="mb-4">
    <h1 className="text-gray-600">{movement.date}</h1>
    <h1 className={`${movement.sign === '+' ? 'text-green-500' : 'text-red-500'} text-xl font-bold`}>
      {movement.sign}{movement.amount}
    </h1>
  </li>
  )
}

export default Movement;