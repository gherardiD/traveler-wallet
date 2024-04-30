import { Outlet } from "react-router-dom"
import CityNav from "./CityNav"

function CityLayout() {
  return (
    <>
      <CityNav />
      <Outlet />
    </>
  )
}

export default CityLayout
