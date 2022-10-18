import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    TextInput,
    Group,
    Image,
    UnstyledButton,
    Stack,
    Center,
    useMantineColorScheme,
    Text,
    Title,
    Space,
    Indicator,
} from "@mantine/core";

import { FiSearch } from "react-icons/fi";
import { RiNotification4Fill } from "react-icons/ri";
import { BsThreeDotsVertical, BsDot } from "react-icons/bs";
import userIcon from "../assets/Avatar.png";
import { FiSun, FiMoon } from "react-icons/fi";

const AppHeader = () => {
    const { notification, setNotification } = useState(true);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <Stack>
            <Group pt="lg" position="apart" grow>
                <Container pl="xl">
                    <TextInput
                        placeholder="Search your keyword"
                        size="md"
                        variant="unstyled"
                        icon={
                            <FiSearch
                                style={{ marginRight: 12 }}
                                size={32}
                                color="#450EDD"
                            />
                        }
                    />
                </Container>
                <Group position="right" pr="xl">
                    <Group pr="xl">
                        <Link to={{}}>
                            <Image
                                sx={{ width: 56 }}
                                src={userIcon}
                                alt="user display image"
                            />
                        </Link>
                        <Stack align="flex-start">
                            <Text color="#1f0890" weight={500} size="xl">
                                Susan Shrestha
                            </Text>
                            <Text
                                color="#844ff7"
                                size="md"
                                sx={{ marginTop: -16 }}
                            >
                                Admin
                            </Text>
                        </Stack>
                    </Group>
                    <Space w="xl" />
                    <Group pr="xl">
                        <UnstyledButton pr="md">
                            <Indicator offset={7} withBorder size={15}>
                                <RiNotification4Fill
                                    size={30}
                                    color="#844ff7"
                                />
                            </Indicator>
                        </UnstyledButton>
                        <UnstyledButton
                            sx={(theme) => ({
                                color: "#450EDD",
                                "&:hover": {
                                    color: "#450EDD",
                                },
                            })}
                        >
                            <BsThreeDotsVertical size={28} color="#844ff7" />
                        </UnstyledButton>
                    </Group>
                </Group>
                {/* <ActionIcon
                    variant="outline"
                    color={dark ? "yellow" : "blue"}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                >
                    {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
                </ActionIcon> */}
            </Group>
            <Center my="md">
                <div
                    className="h"
                    style={{ height: 2, width: "96%", background: "#c8b1fa" }}
                />
            </Center>
        </Stack>
    );
};

export default AppHeader;
