import { Carousel } from 'flowbite-react'
import React, { useEffect } from 'react'

const LeftColumn = ({lieux, mapRef}) => {

    const flyToMarker = (coordinates) => {
        console.log('fly to')
        mapRef.current?.flyTo({ center: coordinates, zoom: 18,
            speed: 2 })
    }

  return (
    <div className='w-1/3'>
        {lieux.map((lieu) => (
            <div key={lieu.id} className="max-w-sm bg-white shadow mb-4 rounded-lg cursor-pointer"
            onClick={() => flyToMarker([lieu.longitude, lieu.latitude])}>
                <div className="h-48 block">
                    <Carousel>
                        {(lieu.images) && lieu.images.map((img) => (
                            <img key={img.id} src={`http://localhost:8000/storage/${img.url}`} className='h-full object-cover' />
                        ))}
                    </Carousel>
                </div>
                <div className="px-5 py-2">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{lieu.nom}</h5>
                    <p className="mb-2 font-normal text-gray-700">{lieu.adresse}, {lieu.code_postal} {lieu.ville}</p>
                    {lieu.categories.map((categorie) => (
                        <span
                          key={categorie.id}
                          className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {categorie.nom}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
  )
}

export default LeftColumn