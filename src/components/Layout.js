import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button } from '@aws-amplify/ui-react';

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
                <Button onClick={() => navigate("/")}>Home</Button>
                <Button onClick={() => navigate("/about")}>About Us</Button>
                <Button onClick={() => navigate("/description")}>Description</Button>
                <Button onClick={() => navigate("/checklist")}>Checklist</Button>
                <Button onClick={() => navigate("/pet")}>Pet</Button>

                {route !== "authenticated" ? (
                    <button onClick={() => navigate("/login")}>Login</button>

                ) : (
                    <button onClick={() => logOut()}>Logout</button>
                )}

            </nav>
            {/* <span>{route === "authenticated" ? "You are logged in" : "You are not logged in"}</span> */}
            <Outlet />

        </>
    );
}