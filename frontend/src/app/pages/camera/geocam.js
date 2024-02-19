import React from 'react'


const Geocam = () => {

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  



  return (
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
    
  )
}

export default Geocam