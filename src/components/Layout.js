import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Tabs, TabItem } from '@aws-amplify/ui-react';

export function Layout() {

    const { route, signOut } = useAuthenticator(context => [
        context.route,
        context.signOut
    ]);

    const navigate = useNavigate()

    function logOut() {
        signOut();
        navigate("/login");
    }

    return (
        <>
            <nav>
                <Tabs
                    spacing='equal'
                    justifyContent='flex-start'
                >
                    <TabItem title="Home" onClick={() => navigate("/")} />
                    <TabItem title="About Us" onClick={() => navigate("/about")} />
                    <TabItem title="Description" onClick={() => navigate("/description")} />
                    <TabItem title="Checklist" onClick={() => navigate("/checklist")} />
                    <TabItem title="Pet" onClick={() => navigate("/pet")} />
                    <TabItem title="Note" onClick={() => navigate("/note")} />

                    {route !== "authenticated" ? (
                        <TabItem title="Login" onClick={() => navigate("/login")} />

                    ) : (
                        <TabItem title="Logout" onClick={() => logOut()} />
                    )}
                </Tabs>

                {/* <Button onClick={() => navigate("/")}>Home</Button>
                <Button onClick={() => navigate("/about")}>About Us</Button>
                <Button onClick={() => navigate("/description")}>Description</Button>
                <Button onClick={() => navigate("/checklist")}>Checklist</Button>
                <Button onClick={() => navigate("/pet")}>Pet</Button>
                <Button onClick={() => navigate("/note")}>Note</Button>

                {route !== "authenticated" ? (
                    <button onClick={() => navigate("/login")}>Login</button>

                ) : (
                    <button onClick={() => logOut()}>Logout</button>
                )} */}

            </nav>
            {/* <span>{route === "authenticated" ? "You are logged in" : "You are not logged in"}</span> */}
            <Outlet />

        </>
    );
}