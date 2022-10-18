import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { Navbar, Image, Button, Text, Group, Space } from "@mantine/core";
import NavLinks from "./NavLinks";
import Logo from "../assets/Logo.png";

const Sidenav = () => {
    return (
        <Navbar
            hiddenBreakpoint="sm"
            sx={{ border: "none" }}
            p="xl"
            width={{ sm: 200, lg: 300, base: 100 }}
        >
            <Navbar.Section mt="lg" mb="xl" mr="xl">
                <Group position="center">
                    <Image src={Logo} width={54} />
                    <Text
                        sx={{ marginLeft: -12, fontSize: 24, fontWeight: 600 }}
                    >
                        Blood Sathi
                    </Text>
                </Group>
            </Navbar.Section>
            <Navbar.Section grow mt="xl">
                {<NavLinks />}
            </Navbar.Section>
            <Navbar.Section grow>
                <Button
                    size="lg"
                    sx={{
                        color: "#868495",
                        width: "100%",
                        background: "transparent",
                        "&:hover": {
                            background: "transparent",
                            color: "#868410",
                        },
                    }}
                    leftIcon={<IoLogOutOutline size={24} />}
                >
                    Log out
                </Button>
            </Navbar.Section>
        </Navbar>
    );
};

export default Sidenav;
