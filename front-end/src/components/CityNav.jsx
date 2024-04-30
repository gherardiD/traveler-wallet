import {  NavLink } from "react-router-dom"
import styles from './CityNav.module.css'

function CityNav() {
  return (
    <div className={styles.container}>
      <NavLink to="info">Info</NavLink>
      <NavLink to="expenses">Expenses</NavLink>
    </div>
  )
}

export default CityNav
