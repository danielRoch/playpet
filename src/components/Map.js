import React, { useState, useEffect, useRef } from 'react';
import { API, Storage, Auth, Signer } from 'aws-amplify';
import {
    Badge,
    Button,
    Collection,
    Divider,
    Flex,
    Heading,
    Loader,
    LocationSearch,
    MapView,
    ScrollView,
    Text,
    useAuthenticator,
    View
} from "@aws-amplify/ui-react"

import Location from "aws-sdk/clients/location";
import awsconfig from "../aws-exports";

import { NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { listPets } from '../graphql/queries';

// Map Information
const transformRequest = (credentials) => (url, resourceType) => {
    if (resourceType === "Style" && !url?.includes("://")) {
        url = `https://maps.geo.${awsconfig.aws_project_region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
    }

    // Sign AWS Requests
    if (url?.includes("amazonaws.com")) {
        return {
            url: Signer.signUrl(url, {
                access_key: credentials.accessKeyId,
                secret_key: credentials.secretAccessKey,
                session_token: credentials.sessionToken,
            })
        };
    }

    // Don't Sign URL
    return { url: url || "" };
};

export function Map() {

    const { user } = useAuthenticator(context => [context.user]);

    // Map Logic
    const [credentials, setCredentials] = useState(null);
    const [client, setClient] = useState(null);

    const mapRef = useRef();

    useEffect(() => {
        const fetchCredentials = async () => {
            setCredentials(await Auth.currentUserCredentials());
        };

        fetchCredentials();

        const createClient = async () => {
            const credentials = await Auth.currentCredentials();
            const client = new Location({
                credentials,
                region: awsconfig.aws_project_region,
            });
            setClient(client);
        }
        createClient();
        console.log("Page Reloaded");
    }, []);

    // Move the viewport of the map to be the location of the post
    function moveViewPort(longitude, latitude) {
        mapRef.current.flyTo({ center: [longitude, latitude], zoom: 10 })
    }


    // Marker creation
    function MarkerWithPopup({ latitude, longitude, title, description }) {
        const [showPopup, setShowPopup] = useState(false)

        const handleMarkerClick = ({ originalEvent }) => {
            originalEvent.stopPropagation()
            setShowPopup(true)
        };

        return (
            <>
                <Marker
                    latitude={latitude}
                    longitude={longitude}
                    onClick={handleMarkerClick}
                    scale={0.8}
                    color={'blue'}
                />
                {showPopup && (
                    <Popup
                        latitude={latitude}
                        longitude={longitude}
                        offset={{ bottom: [0, -40] }}
                        onClose={() => function popUpClose() {
                            setShowPopup(false)
                        }}
                    >
                        <Heading level={5}>{title}</Heading>
                        <Text>{description}</Text>
                    </Popup>
                )}
            </>
        )
    }

    // Pet Post Logic
    const [pets, setPets] = useState([]);

    // Get all the pet posts on page load
    useEffect(() => {
        fetchPets();
    }, []);

    async function fetchPets() {
        const apiData = await API.graphql({ query: listPets });
        const petsFromAPI = apiData.data.listPets.items;
        await Promise.all(
            petsFromAPI.map(async (pet) => {
                if (pet.image) {
                    const url = await Storage.get(pet.name);
                    pet.image = url;
                }
                return pet;
            })
        );
        setPets(petsFromAPI);
    }

    return (
        <View style={{ marginLeft: "5%", marginRight: "5%" }}>
            <Flex
                direction="row"
                justifyContent="flex-start"
                wrap="nowrap"
                padding="20px"
            >
                <View>
                    {credentials ? (
                        <MapView
                            ref={mapRef}
                            initialViewState={{
                                latitude: 41.5,
                                longitude: -100,
                                zoom: 2
                            }}
                            style={{ width: '600px', height: '600px' }}
                        >
                            <div style={{ position: 'absolute', right: 20, top: 20 }}>
                                <NavigationControl showCompass={false} />
                            </div>
                            <LocationSearch position='top-left' />

                            {pets.map((pet) => (
                                <MarkerWithPopup
                                    key={pet.id}
                                    latitude={pet.latitude}
                                    longitude={pet.longitude}
                                    title={pet.name}
                                    description={pet.description}
                                />
                            ))}
                        </MapView>
                    ) : (
                        <Loader variation='linear' />
                    )}

                </View>
                <View width="600px">
                    <ScrollView width="100%" height="600px">
                        <Collection
                            type="list"
                            justifyContent="center"
                            gap="10px"
                            direction="row"
                            wrap="wrap"
                            items={pets}

                            isSearchable
                            searchPlaceholder="Type to search titles..."
                            searchFilter={(item, keyword) =>
                                item.name.toLowerCase().includes(keyword.toLowerCase())
                            }
                        >
                            {(item, index) => (
                                <Button key={item.id} isFullWidth={true} onClick={() => moveViewPort(item.longitude, item.latitude)}>
                                    <Flex direction="column">
                                        <Flex direction="row" wrap="wrap">
                                            <Heading>{item.name}</Heading>
                                            <Text>By: {item.owner}</Text>
                                            <Flex direction="row" wrap="wrap">
                                                <Badge
                                                    key={item.petType}
                                                >
                                                    {item.petType}
                                                </Badge>
                                                <Badge
                                                    key={item.state}
                                                >
                                                    {item.city ?
                                                        `${item.city},` + `${item.state}`.toUpperCase()
                                                        : `${item.state}`.toUpperCase()
                                                    }
                                                </Badge>
                                            </Flex>
                                        </Flex>
                                        <Divider />
                                        <Text width="455px" isTruncated={true}>{item.description}</Text>
                                    </Flex>
                                </Button>
                            )}
                        </Collection>
                    </ScrollView>
                </View>
            </Flex >
        </View>
    );
}