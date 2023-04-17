import React, { useState, useEffect } from 'react';
import { Amplify, API, Storage, Geo, Auth, Signer } from 'aws-amplify';
import {
    Button,
    Flex,
    Heading,
    Image,
    Loader,
    LocationSearch,
    MapView,
    Text,
    TextField,
    View
} from "@aws-amplify/ui-react"

import Location from "aws-sdk/clients/location";
import awsconfig from "../aws-exports";

import ReactMapGL, { NavigationControl, } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapName = "PetMap-staging";

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

function Search(props) {
    const [place, setPlace] = useState("");

    const handleChange = (event) => {
        setPlace(event.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        props.searchPlace(place)
    }

    return (
        <View>
            <TextField placeholder='Search for Places' label="Place" labelHidden value={place} onChange={handleChange} />
            <Button onClick={handleClick}>Search</Button>
        </View>
    )
}

export function Map() {

    const [credentials, setCredentials] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 41.5,
        longitude: -100,
        zoom: 2
    });

    const [client, setClient] = useState(null);

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
    }, []);

    const searchPlace = (place) => {
        const params = {
            IndexName: "placeIndex1fb4c192-staging",
            Text: place,
        };

        client.searchPlaceIndexForText(params, (err, data) => {
            if (err) console.error(err);
            if (data) {
                const coordinates = data.Results[0].Place.Geometry.Point;
                setViewport({
                    longitude: coordinates[0],
                    latitude: coordinates[1],
                    zoom: 10
                })
                return coordinates;
            }
        });
    }

    return (
        <View>
            <View>
                <Search searchPlace={searchPlace} />
            </View>

            <Flex
                direction="row"
                justifyContent="flex-start"
                wrap="nowrap"
                padding="20px"
            >
                <View>
                    {credentials ? (
                        <MapView
                            {...viewport}
                            transformRequest={transformRequest(credentials)}
                            mapStyle={mapName}
                            onViewportChange={setViewport}
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
                        </MapView>
                    ) : (
                        <Loader variation='linear' />
                    )}
                </View>
                <View>

                </View>
            </Flex >
        </View>
    );
}