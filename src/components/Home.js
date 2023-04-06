import { Grid, Heading, Text, View, Image } from "@aws-amplify/ui-react";

export function Home() {
    return (
        <div className="page-content">
            <Heading level={1}>PlayPet</Heading>
            <Grid
                templateColumns="1fr 1fr"
                gap="1rem"
            >
                <View>
                    <Text className="ltext">PlayPet allows people who cannot play with their pet due to unforeseen reasons, like medical problem, to get their pet its much needed or wanted playtime. People can also connect with other people who want to allow their pet to interact and play with other pets of the same variety.</Text>
                </View>
                <View>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHeZSh6ogLELKycliY_LKe9DEqbENEiyoohQ&usqp=CAU" alt="Guy playing with a dog outsite." />
                </View>
            </Grid>

        </div >

    );
}