import React from 'react'
import Sidebar from './Sidebar'
import {AppContext} from "../store/AppContext";
import Categories from './Categories';
import Movies from './Movies';
import ShowTimes from './ShowTimes';
import Bookings from './Bookings';

const AdminPanel = () => {
  const {activeMenu} = React.useContext(AppContext);

  const components={
    categories:<Categories></Categories>,
    movies:<Movies></Movies>,
    showtimes:<ShowTimes></ShowTimes>,
    bookings:<Bookings></Bookings>
  }

  return (
    <div className='d-flex flex-column border border-dark rounded-3'  >
      <Sidebar></Sidebar>
      <div className=''>
        {components[activeMenu]}
       
      </div>
    </div>
  )
}
 
export default AdminPanel