import { useState } from "react";
import "./App.css";
import Sidenav from "./components/Sidenav";
import { Outlet } from "react-router-dom";
import {
    Global,
    AppShell,
    ColorSchemeProvider,
    MantineProvider,
    Navbar,
    Text,
    MediaQuery,
    Burger,
    Header,
} from "@mantine/core";
import Light from "./assets/fonts/Poppins-Light.ttf";
import Medium from "./assets/fonts/Poppins-Medium.ttf";
import Bold from "./assets/fonts/Poppins-Bold.ttf";

import AppHeader from "./components/AppHeader";

function App() {
    const [opened, setOpened] = useState(false);
    const [colorScheme, setColorScheme] = useState("light");
    const toggleColorScheme = (colorScheme) =>
        setColorScheme(colorScheme === "dark" ? "light" : "dark");
    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{
                    colorScheme,
                    fontFamily: "Poppins, sans-serif",
                    headings: {
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                    },
                }}
                withGlobalStyles
                withNormalizeCSS
            >
                <Global
                    styles={[
                        {
                            "@font-face": {
                                fontFamily: "Poppins",
                                src: `url('${Light}') format("ttf")`,
                                fontWeight: 300,
                            },
                        },
                        {
                            "@font-face": {
                                fontFamily: "Poppins",
                                src: `url('${Medium}') format("ttf")`,
                                fontWeight: 500,
                            },
                        },
                        {
                            "@font-face": {
                                fontFamily: "Poppins",
                                src: `url('${Medium}') format("ttf")`,
                                fontWeight: 700,
                            },
                        },
                    ]}
                />
                <div className="App">
                    <AppShell
                        navbarOffsetBreakpoint="sm"
                        navbar={<Sidenav hidden={!opened} />}
                    >
                        <AppHeader />
                        <Outlet />
                    </AppShell>
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
