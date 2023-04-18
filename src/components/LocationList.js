import { useRef } from "react";

function LocationList(props) {

    const onClickFunction = (pet) => {
        props.mapRef.current.flyTo({ center: [pet.longitude, pet.latitude], zoom: 10 })
    }

    return (
        <div className="container">
            {props.pets.map((pet) =>
                <button onClick={() => onClickFunction(pet)} key={pet.id}>
                    <span>{pet.name}</span>
                    <span>{pet.petType}</span>
                </button>
            )}
        </div>
    )
}

export default LocationList;