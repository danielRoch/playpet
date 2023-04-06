import { Heading, Flex, View, Text } from "@aws-amplify/ui-react";

export function Description() {
    return (
        <div className="page-content">
            <Heading level={1}>Description</Heading>
            <Flex
                direction="column"
                alignItems="stretch"
            >
                <View className="ltext">
                    <ul><Heading level={4}>Who should use PlayPet?</Heading></ul>
                </View>
                <View className="ltext">
                    <Text>
                        The users of PlayPet are people who have pets that
                        they cannot play with enough due to medical reasons
                        like breaking a leg or having surgery. Pet owners that want
                        their pet to play with other pets or interect with others in a more controlled
                        environment.
                    </Text>
                </View>
                <View className="ltext">
                    <ul><Heading level={4}>What will you get out of using PlayPet?</Heading></ul>
                </View>
                <View className="ltext">
                    <Text>
                        PlayPet aims to allow pet owners and people who love pets a
                        way to connect and possibly ease a burden off of someone else
                        and make connections that could last for years to come.
                        If you are a pet owner that has recently suffered an injury or
                        due to medical reasons you cannot play with you pet effectively,
                        you can connect with people who are willing to help out.
                    </Text>
                </View>
                <View className="ltext">
                    <ul><Heading level={4}>What does PlayPet solve?</Heading></ul>
                </View>
                <View className="ltext">
                    <Text>
                        PlayPet solves the problem of finding people with the same love
                        of pets and connecting them to together. It allows pets to get
                        acclimated to interacting with people and other pets that they
                        do not normally interact with while at home.
                    </Text>
                </View>
                <View className="ltext">
                    <ul><Heading level={4}>You used PlayPet, what now?</Heading></ul>
                </View>
                <View className="ltext">
                    <Text>
                        If you were on the receiving end of someone helping you out, then
                        come back and help someone else out. You can also come back and
                        come play with pets you like.
                    </Text>
                </View>
            </Flex>
        </div>
    );
}