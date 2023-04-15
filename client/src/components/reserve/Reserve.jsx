//LIFE IS WHAT YOU MAKE IT
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./reserve.css"

import useFetch from "../../hooks/useFetch";
import { useState } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext)

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const dates = [];
    while (date <= end) {
      // dates.push(new Date(date).getTime()); //Usimng timestamps
      dates.push(new Date(date)); //Gives you easy to read dates.
      date.setDate(date.getDate() + 1);
    }
    return dates
  };

  // co nsole.log(getDatesInRange(dates[0].startDate, dates[0].endDate))
  const alldates = (getDatesInRange(dates[0].startDate, dates[0].endDate))
  const isAvailable = (roomNumber) => {

  }



  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)

    );
  };


  const handleClick = () => {

  }

  return (
    <div className="reserve">
      <div className="rContainer"></div>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="rClose"
        onClick={() => setOpen(false)}
      />
      <span>Select your rooms:</span>
      {data.map((item) => (
        <div className="rItem">
          <div className="rItemInfo">
            <div className="rTitle">{item.title}</div>
            <div className="rDesc">{item.desc}</div>
            <div className="rMax">
              Max people: <b>{item.maxPeople}</b>
            </div>
            <div className="rPrice">{item.price}</div>
          </div>
          {item.roomNumbers.map((roomNumber) => (
            <div className='room'>
              <label>{roomNumber.number}</label>
              <input type="checkbox" value={roomNumber._id} onChange={handleSelect} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleClick}></button>
    </div >
  );
};

export default Reserve