import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Tabs, TabItem } from '@aws-amplify/ui-react';

export function Layout() {

    const { user, route, signOut } = useAuthenticator(context => [
        context.user,
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
            </nav>
            <span>{route === "authenticated" ? `Welcome ${user.username}` : ""}</span>
            <Outlet />

        </>
    );
}