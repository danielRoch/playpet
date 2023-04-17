// import { useEffect, useState } from "react";
// import { Collection } from "@aws-amplify/ui-react";
// import { API } from "aws-amplify";
// import { listPets } from '../graphql/queries';

function LocationList(props) {

    // const [pets, setPets] = useState([]);

    // useEffect(() => {
    //     fetchPets();
    // }, []);

    // async function fetchPets() {
    //     const apiData = await API.graphql({ query: listPets });
    //     const petsFromAPI = apiData.data.listPets.items;
    //     await Promise.all(
    //         petsFromAPI.map(async (pet) => {
    //             if (pet.image) {
    //                 const url = await Storage.get(pet.name);
    //                 pet.image = url;
    //             }
    //             return pet;
    //         })
    //     );
    //     setPets(petsFromAPI);
    // }

    const onClickFunction = (location) => {
        const newViewport = {
            longitude: parseFloat(location.longitude),
            latitude: parseFloat(location.latitude),
            zoom: 2
        }
        props.changeViewport(newViewport);
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