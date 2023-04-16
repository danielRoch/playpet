import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import {
    Badge,
    Button,
    Card,
    Collection,
    Divider,
    Expander,
    ExpanderItem,
    Flex,
    Heading,
    Image,
    ScrollView,
    SelectField,
    Text,
    TextAreaField,
    TextField,
    useAuthenticator,
    useTheme,
    View
} from "@aws-amplify/ui-react"
import { listPets } from '../graphql/queries';
import { createPet as CreatePetMutation, deletePet as DeletePetMutation } from '../graphql/mutations';

export function Pet() {

    const { tokens } = useTheme()
    const { user } = useAuthenticator(context => [context.user]);
    const [pets, setPets] = useState([]);
    const [hasError, setHasError] = useState(false)

    const validateEmail = (e) => {
        const email = e.target.value
        const validEmail = email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        setHasError(!validEmail);
    };

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

    async function createPet(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
            name: form.get("name"),
            petType: form.get("petType"),
            description: form.get("description"),
            location: form.get("location"),
            image: image.name,
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
            <View as="form" margin="3rem 0" onSubmit={createPet}>
                <Flex direction="column" justifyContent="center" alignItems="center">
                    <TextField
                        name='name'
                        placeholder='Post Name'
                        label='Post Name'
                        labelHidden
                        // variation='quiet'
                        isRequired={true}
                    />

                    <SelectField
                        name="petType"
                        label="PetType"
                        labelHidden
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
                        label='Post Description'
                        labelHidden
                        // variation='quiet'
                        isRequired={true}
                    />

                    <TextField
                        name='city'
                        placeholder='City'
                        label='Post City'
                        labelHidden
                    // variation='quiet'
                    />

                    <SelectField
                        name="state"
                        label="state"
                        labelHidden
                        placeholder="Please Select the State"
                        isRequired={true}
                    >
                        <option value="AL">Alabama (AL)</option>
                        <option value="AK">Alaska (AK)</option>
                        <option value="AZ">Arizona (AZ)</option>
                        <option value="AR">Arkansas (AR)</option>
                        <option value="CA">California (CA)</option>
                        <option value="CO">Colorado (CO)</option>
                        <option value="CT">Connecticut (CT)</option>
                        <option value="DE">Delaware (DE)</option>
                        <option value="DC">District Of Columbia (DC)</option>
                        <option value="FL">Florida (FL)</option>
                        <option value="GA">Georgia (GA)</option>
                        <option value="HI">Hawaii (HI)</option>
                        <option value="ID">Idaho (ID)</option>
                        <option value="IL">Illinois (IL)</option>
                        <option value="IN">Indiana (IN)</option>
                        <option value="IA">Iowa (IA)</option>
                        <option value="KS">Kansas (KS)</option>
                        <option value="KY">Kentucky (KY)</option>
                        <option value="LA">Louisiana (LA)</option>
                        <option value="ME">Maine (ME)</option>
                        <option value="MD">Maryland (MD)</option>
                        <option value="MA">Massachusetts (MA)</option>
                        <option value="MI">Michigan (MI)</option>
                        <option value="MN">Minnesota (MN)</option>
                        <option value="MS">Mississippi (MS)</option>
                        <option value="MO">Missouri (MO)</option>
                        <option value="MT">Montana (MT)</option>
                        <option value="NE">Nebraska (NE)</option>
                        <option value="NV">Nevada (NV)</option>
                        <option value="NH">New Hampshire (NH)</option>
                        <option value="NJ">New Jersey (NJ)</option>
                        <option value="NM">New Mexico (NM)</option>
                        <option value="NY">New York (NY)</option>
                        <option value="NC">North Carolina (NC)</option>
                        <option value="ND">North Dakota (ND)</option>
                        <option value="OH">Ohio (OH)</option>
                        <option value="OK">Oklahoma (OK)</option>
                        <option value="OR">Oregon (OR)</option>
                        <option value="PA">Pennsylvania (PA)</option>
                        <option value="RI">Rhode Island (RI)</option>
                        <option value="SC">South Carolina (SC)</option>
                        <option value="SD">South Dakota (SD)</option>
                        <option value="TN">Tennessee (TN)</option>
                        <option value="TX">Texas (TX)</option>
                        <option value="UT">Utah (UT)</option>
                        <option value="VT">Vermont (VT)</option>
                        <option value="VA">Virginia (VA)</option>
                        <option value="WA">Washington (WA)</option>
                        <option value="WV">West Virginia (WV)</option>
                        <option value="WI">Wisconsin (WI)</option>
                        <option value="WY">Wyoming (WY)</option>
                    </SelectField>

                    <TextField
                        name='email'
                        placeholder='Email Address'
                        label='Users Email'
                        labelHidden
                        isRequired={true}
                        hasError={hasError}
                        errorMessage="Invalid Email Address"
                        onChange={(e) => validateEmail(e)}
                    />
                    <View
                        name='image'
                        as='input'
                        type='file'
                    />
                    <Button type='submit' variation='primary'>
                        Create Post
                    </Button>
                </Flex>
            </View>

            <Heading level={2}>Current Posts</Heading>
            <View margin='3rem 0'>

                <Collection
                    type="list"
                    // type="grid"
                    // templateColumns={{ base: "20rem 20rem 20rem", medium: "1fr 1fr 1fr" }}
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
                                </View>
                                <Flex wrap="wrap">
                                    <Badge
                                        key={item.petType}
                                    >
                                        {item.petType}
                                    </Badge>
                                    <Badge
                                        key={item.location}
                                    >
                                        {item.location}
                                    </Badge>
                                </Flex>
                                <Divider padding="xs" />
                                <ScrollView height="100px">{item.description}</ScrollView>
                                {/* <Expander type="single" isCollapsible={true}>
                                <ExpanderItem title="Description" value={item.id}>{item.description}</ExpanderItem>
                            </Expander> */}

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