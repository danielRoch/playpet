import { Heading, Flex, View, Text } from "@aws-amplify/ui-react";

export function About() {
    return (
        <div className="page-content">
            <Heading level={1}>About Us</Heading>
            <Flex
                direction="column"
                alignItems="stretch"
            >
                <View className="ltext">
                    <ul><Heading level={4}>Who am I?</Heading></ul>
                </View>
                <View className="ltext">
                    <Text>
                        Hello! I am Daniel Rochefort, a Computer Sciecne student at Georgia State University. I have been interested in animals for most of my life and a dog person ever since I got to help my family watch our neighbors dog. I currently have 3 dogs, a 7 year old Boxer-Hound mix, a 3 year old "Heinz 57", she is mixed with many different breeds, and an 11 month old Chihuahua-Pomeranian mix.
                    </Text>
                </View>
                <View className="ltext">
                    <ul><Heading level={4}>Why PlayPet?</Heading></ul>
                </View>
                <View className="ltext">
                    <Text>
                        DISCLAIMER: I will be speaking of dogs since those are the pets that I have experience with.
                    </Text>
                    <Text>
                        I chose to create PlayPet because after COVID many pets were not well acclimated to people or other pets since they could not go out due to their owners not being able to go out. PlayPet is meant to bring people and animals closer to together and allow pets to get all the playtime they want.
                    </Text>
                </View>
                <View className="ltext">
                    <ul><Heading level={4}>Technology Used?</Heading></ul>
                </View>
                <View className="ltext">
                    <Text>
                        The main technologies used to create PlayPet are:
                        <ul>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>AWS Amplify</li>
                            <li>AWS DynamoDB</li>
                            <li>AWS S3</li>
                        </ul>
                    </Text>
                </View>
                <View className="ltext">
                    <ul><Heading level={4}>What was Learned?</Heading></ul>
                </View>
                <View className="ltext">
                    <Text>
                        I have learned a lot in Web Programming that I did not previously
                        know. I learned about PHP, for one thing, it isn't dead or going
                        to die like people keep saying. I learned that you can use HTML
                        and javascript along with PHP in one file but that file has to end
                        in .php. I learned about HTML and CSS, both subjects that I have not
                        used since highschool. I learned about Javascript and different
                        libraries like jQuery, Foundation, and React as well as coding
                        practices like AJAX.
                    </Text>
                </View>
            </Flex>
        </div>
    );
}