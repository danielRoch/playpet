import { Expander, ExpanderItem, Link, View } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

export function Checklist() {

    const navigate = useNavigate()

    return (
        <div className="page-content">
            <View padding="20px">
                <Expander type="multiple">
                    <ExpanderItem title="Database Usage" value="checklist-1">
                        I used AWS Amplify to create my website and with that I can add a GraphQL API that connects to a DynamoDB Table to store my data.
                        I then use a GraphQL query to fetch all my pet posts from the table. This can be seen in action on the <Link onClick={() => navigate("/pet")}>Pet</Link> page where all
                        the pet posts are listed.
                    </ExpanderItem>
                    <ExpanderItem title="AJAX Usage" value="checklist-2">
                        On the <Link onClick={() => navigate("/pet")}>Pet</Link> page, you can see posts by users. Users can only delete posts that they made and when they create or delete a post
                        it will automatically refresh the posts listed without refreshing the page due to <code>event.preventDefault()</code>
                    </ExpanderItem>
                    <ExpanderItem title="New Library Usage" value="checklist-3">
                        The Amplify team created a UI framework called Amplify UI that adds different UI components or builds on the primitive ones. I used the Badge, Button, Card, Collection,
                        Divider, Flex, Heading, Image, ScrollView, SelectField, Text, TextAreaField, and TextField components all on the <Link onClick={() => navigate("/pet")}>Pet</Link> page, but I used many
                        different components all over my website for its UI.
                        I also used react-map-gl to add map integration on the <Link onClick={() => navigate("/map")}>Map</Link> page. It displays a map of the US with markers on the location for the posts.
                        The location retrieval will attempt to get a location upon creation of a post. If you click on one of the posts listed to the right, it will change the viewport of the map to zoom in
                        on the location of that post's marker.
                    </ExpanderItem>
                    <ExpanderItem title="JavaScript Usage" value="checklist-4">
                        On the <Link onClick={() => navigate("/pet")}>Pet</Link> page, javascript is used to display a delete button on only the logged in user's posts. I do this by checking if the
                        logged in user's username is the same as the post owners and if not display an empty <code>div</code>. The Navigation tabs at the top also dynamically display's a login button
                        or a logout button depending on if the user is logged in and at the top of each page there is a little bit of text welcoming the user and displaying their username and an empty
                        span if there is not user logged in.
                    </ExpanderItem>
                    <ExpanderItem title="Membership Area" value="checklist-5">
                        I have a membership area of the <Link onClick={() => navigate("/pet")}>Pet</Link> page. If an unauthenticated user tries to access the membership area, they will be redirected
                        to the login page. I did this using AWS Amplify's authentication services that connects to Cognito and using react-router-dom's BrowserRouter, Routes, and Router. I then created a
                        wrapper that wraps the pages that need authorization.
                    </ExpanderItem>
                </Expander>
            </View>
        </div>
    );
}