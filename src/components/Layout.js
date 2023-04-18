import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthenticator, Tabs, TabItem } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';

export function Layout() {

    const [index, setIndex] = useState();
    const location = useLocation();

    useEffect(() => {
        const currentPage = location.pathname
        console.log(`Currently on ${currentPage} page`);

        switch (currentPage) {
            case "/":
                setIndex(0);
                break;
            case "/about":
                setIndex(1);
                break;
            case "/description":
                setIndex(2);
                break;
            case "/checklist":
                setIndex(3);
                break;
            case "/pet":
                setIndex(4);
                break;
            case "/map":
                setIndex(5);
                break;
            case "/login":
                setIndex(6);
                break;

            default:
                setIndex(0);
                break;
        }

    }, [location.pathname]);

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
                    currentIndex={index}
                >
                    <TabItem title="Home" onClick={() => navigate("/")} />
                    <TabItem title="About Us" onClick={() => navigate("/about")} />
                    <TabItem title="Description" onClick={() => navigate("/description")} />
                    <TabItem title="Checklist" onClick={() => navigate("/checklist")} />
                    <TabItem title="Pet" onClick={() => navigate("/pet")} />
                    <TabItem title="Map" onClick={() => navigate("/map")} />

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