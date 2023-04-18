import React, { useState, useEffect } from 'react';
import { API, Auth, Storage } from 'aws-amplify';
import {
    Badge,
    Button,
    Card,
    Collection,
    Divider,
    Flex,
    Heading,
    Image,
    ScrollView,
    SelectField,
    Text,
    TextAreaField,
    TextField,
    useAuthenticator,
    View
} from "@aws-amplify/ui-react"
import { listPets } from '../graphql/queries';
import { createPet as CreatePetMutation, deletePet as DeletePetMutation } from '../graphql/mutations';

import Location from "aws-sdk/clients/location";
import awsconfig from "../aws-exports";

export function Pet() {

    const { user } = useAuthenticator(context => [context.user]);
    const [pets, setPets] = useState([]);
    const [hasError, setHasError] = useState(false)

    // Get all the pet posts on page load
    useEffect(() => {
        fetchPets();
    }, []);

    // Email validation
    const validateEmail = (e) => {
        const email = e.target.value
        const validEmail = email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        setHasError(!validEmail);
    };


    // getting credentials to allow for map location search 
    const [credentials, setCredentials] = useState(null);
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
        console.log("Pet Reloaded");
    }, []);

    async function getLat(place) {
        console.log(`Place: ${place}`);
        const params = {
            IndexName: "placeIndex1fb4c192-staging",
            Text: place,
        };

        await client.searchPlaceIndexForText(params, (err, data) => {
            if (err) console.error(err);
            if (data) {
                console.log(`Data: ${data}`);
                const coordinates = data.Results[0].Place.Geometry.Point;
                // mapRef.current.flyTo({ center: [coordinates[0], coordinates[1]], zoom: 10 })

                console.log(`${place} Coord: ${coordinates}`)
                return coordinates[1]

            }
        });
    }

    async function getLong(place) {
        console.log(`Place: ${place}`);
        const params = {
            IndexName: "placeIndex1fb4c192-staging",
            Text: place,
        };

        await client.searchPlaceIndexForText(params, (err, data) => {
            if (err) console.error(err);
            if (data) {
                console.log(`Data: ${data}`);
                const coordinates = data.Results[0].Place.Geometry.Point;
                // mapRef.current.flyTo({ center: [coordinates[0], coordinates[1]], zoom: 10 })

                console.log(`${place} Coord: ${coordinates}`)
                return coordinates[0]

            }
        });
    }


    // Post creation / manipulation
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

    async function createPet(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");

        // Get location data (city & state to get coordinates)
        var longitude = 0;
        var latitude = 0;
        var location = "";
        if (form.get("city") !== "") {
            console.log("City present");
            location = `${form.get("city")}, ${form.get("state")}`
        } else {
            console.log("City not present");
            location = `${form.get("state")}`
        }

        // await getCoord(location);
        longitude = await getLong(location);
        latitude = await getLat(location)

        const data = {
            name: form.get("name"),
            petType: form.get("petType"),
            description: form.get("description"),
            city: form.get("city"),
            state: form.get("state"),
            email: form.get("email"),
            image: image.name,
            longitude: longitude,
            latitude: latitude
        };
        if (!!data.image) await Storage.put(data.name, image);
        await API.graphql({
            query: CreatePetMutation,
            variables: { input: data }
        });
        fetchPets();
        event.target.reset();
    }

    async function deletePet({ id, name }) {
        const newPets = pets.filter((pet) => pet.id !== id);
        await Storage.remove(name);
        await API.graphql({
            query: DeletePetMutation,
            variables: { input: { id } }
        });
        setPets(newPets);
    }

    return (
        <View className="App">
            <Heading level={1}>PlayPet Post Submission</Heading>
            <View style={{ marginLeft: "25%", marginRight: "25%" }}>
                <View as="form" margin="3rem 0" onSubmit={createPet}>
                    <Flex direction="column" justifyContent="center">
                        <TextField
                            name='name'
                            placeholder='Post Name'
                            label={
                                <Text>
                                    Post Name
                                    <Text as="span" fontSize="0.8rem" color="red">
                                        {' '}
                                        (required)
                                    </Text>
                                </Text>
                            }
                            isRequired={true}
                        />

                        <SelectField
                            name="petType"
                            label={
                                <Text>
                                    Pet Type
                                    <Text as="span" fontSize="0.8rem" color="red">
                                        {' '}
                                        (required)
                                    </Text>
                                </Text>
                            }
                            placeholder="Please Select the Pet Type"
                            isRequired={true}
                        >
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="hamster">Hamster</option>
                        </SelectField>

                        <TextAreaField
                            name='description'
                            placeholder='Post Description'
                            label={
                                <Text>
                                    Post Description
                                    <Text as="span" fontSize="0.8rem" color="red">
                                        {' '}
                                        (required)
                                    </Text>
                                </Text>
                            }
                            isRequired={true}
                        />

                        <TextField
                            name='city'
                            placeholder='City'
                            label='City'

                        />

                        <SelectField
                            name="state"
                            label={
                                <Text>
                                    State
                                    <Text as="span" fontSize="0.8rem" color="red">
                                        {' '}
                                        (required)
                                    </Text>
                                </Text>
                            }
                            placeholder="Please Select the State"
                            isRequired={true}
                        >
                            <option value="al">Alabama (AL)</option>
                            <option value="ak">Alaska (AK)</option>
                            <option value="az">Arizona (AZ)</option>
                            <option value="ar">Arkansas (AR)</option>
                            <option value="ca">California (CA)</option>
                            <option value="co">Colorado (CO)</option>
                            <option value="ct">Connecticut (CT)</option>
                            <option value="de">Delaware (DE)</option>
                            <option value="dc">District Of Columbia (DC)</option>
                            <option value="fl">Florida (FL)</option>
                            <option value="ga">Georgia (GA)</option>
                            <option value="hi">Hawaii (HI)</option>
                            <option value="id">Idaho (ID)</option>
                            <option value="il">Illinois (IL)</option>
                            <option value="in">Indiana (IN)</option>
                            <option value="ia">Iowa (IA)</option>
                            <option value="ks">Kansas (KS)</option>
                            <option value="ky">Kentucky (KY)</option>
                            <option value="la">Louisiana (LA)</option>
                            <option value="me">Maine (ME)</option>
                            <option value="md">Maryland (MD)</option>
                            <option value="ma">Massachusetts (MA)</option>
                            <option value="mi">Michigan (MI)</option>
                            <option value="mn">Minnesota (MN)</option>
                            <option value="ms">Mississippi (MS)</option>
                            <option value="mo">Missouri (MO)</option>
                            <option value="mt">Montana (MT)</option>
                            <option value="ne">Nebraska (NE)</option>
                            <option value="nv">Nevada (NV)</option>
                            <option value="nh">New Hampshire (NH)</option>
                            <option value="nj">New Jersey (NJ)</option>
                            <option value="nm">New Mexico (NM)</option>
                            <option value="ny">New York (NY)</option>
                            <option value="nc">North Carolina (NC)</option>
                            <option value="nd">North Dakota (ND)</option>
                            <option value="oh">Ohio (OH)</option>
                            <option value="ok">Oklahoma (OK)</option>
                            <option value="or">Oregon (OR)</option>
                            <option value="pa">Pennsylvania (PA)</option>
                            <option value="ri">Rhode Island (RI)</option>
                            <option value="sc">South Carolina (SC)</option>
                            <option value="sd">South Dakota (SD)</option>
                            <option value="tn">Tennessee (TN)</option>
                            <option value="tx">Texas (TX)</option>
                            <option value="ut">Utah (UT)</option>
                            <option value="vt">Vermont (VT)</option>
                            <option value="va">Virginia (VA)</option>
                            <option value="wa">Washington (WA)</option>
                            <option value="wv">West Virginia (WV)</option>
                            <option value="wi">Wisconsin (WI)</option>
                            <option value="wy">Wyoming (WY)</option>
                        </SelectField>

                        <TextField
                            name='email'
                            placeholder='Email Address'
                            label={
                                <Text>
                                    Email
                                    <Text as="span" fontSize="0.8rem" color="red">
                                        {' '}
                                        (required)
                                    </Text>
                                </Text>
                            }
                            isRequired={true}
                            hasError={hasError}
                            errorMessage="Invalid Email Address"
                            onChange={(e) => validateEmail(e)}
                        />

                        <View style={{ justifyContent: "center" }}>
                            <View
                                name='image'
                                as='input'
                                type='file'
                            />
                        </View>
                        <Button type='submit' variation='primary'>
                            Create Post
                        </Button>
                    </Flex>
                </View>
            </View>

            <Heading level={2}>Current Posts</Heading>
            <View margin='3rem 0'>

                <Collection
                    type="list"
                    justifyContent="center"
                    gap="10px"
                    direction="row"
                    wrap="wrap"
                    isPaginated
                    itemsPerPage={6}
                    items={pets}

                    isSearchable
                    searchPlaceholder="Type to search titles..."
                    searchFilter={(item, keyword) =>
                        item.name.toLowerCase().includes(keyword.toLowerCase())
                    }
                >
                    {(item, index) => (
                        <Card
                            key={item.id || item.name}
                            width={{ base: "15rem", medium: "25rem" }}
                            variation="outlined"
                        >
                            <Flex direction="column">
                                <View>
                                    <Heading>{item.name}</Heading>
                                    <Text>By: {item.owner}</Text>
                                    <Text>Email: {item.email}</Text>
                                </View>
                                <Flex wrap="wrap">
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
                                        {/* {item.state} */}
                                    </Badge>
                                </Flex>
                                <Divider padding="xs" />
                                <ScrollView height="100px">{item.description}</ScrollView>

                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={`visual aid for ${item.name}`}
                                    />
                                ) : <></>}

                                {user.username === item.owner ?
                                    <Button isFullWidth={true} variation='destructive' onClick={() => deletePet(item)}>
                                        Delete Post
                                    </Button>
                                    : <></>
                                }
                            </Flex>
                        </Card>
                    )}

                </Collection>

            </View>
        </View >
    );
}