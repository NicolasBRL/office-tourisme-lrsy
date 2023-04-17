import React from 'react'
import PlaceMap from '../components/Map';

const RightColumn = ({lieux, mapRef}) => {

  return (
    <div className='w-2/3 sticky top-[100px]'>
        <div className="w-full" id="map-container">
          <PlaceMap
            markers={lieux.map((lieu) => {
                return { longitude: lieu.longitude, latitude: lieu.latitude };
              })}
            ref={mapRef}
          />
        </div>
    </div>
  )
}

export default RightColumn