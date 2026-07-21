import React from 'react'
import {AppContext} from "../store/AppContext";


const Sidebar = () => {
    const {activeMenu, changeActiveMenu} = React.useContext(AppContext);


  return (
    <div className='d-flex justify-content-between border p-2' >
        <button className={`mx-3 btn border-bottom fw-bold ${
              activeMenu === "categories"
                ? "btn-dark text-white fst-italic "
                : "bg-light"
            }`} onClick={()=>changeActiveMenu("categories")}>Categories</button>
        <button className={`mx-3 btn border-bottom fw-bold ${
              activeMenu === "movies"
                ? "btn-dark text-white fst-italic "
                : "bg-light"
            }`} onClick={()=>changeActiveMenu("movies")}>Movies</button>
        <button className={`mx-3 btn border-bottom fw-bold ${
              activeMenu === "showtimes"
                ? "btn-dark text-white fst-italic "
                : "bg-light"
            }`} onClick={()=>changeActiveMenu("showtimes")}>ShowTime</button>
        <button className={`mx-3 btn border-bottom fw-bold ${
              activeMenu === "bookings"
                ? "btn-dark text-white fst-italic "
                : "bg-light"
            }`} onClick={()=>changeActiveMenu("bookings")}>Bookings</button>
    </div>
  )
}

export default Sidebar