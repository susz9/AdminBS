import {
    Group,
    ThemeIcon,
    UnstyledButton,
    Text,
    Container,
} from "@mantine/core";
import { IoIosAnalytics } from "react-icons/io";
import { IoNewspaper, IoCalendarClear } from "react-icons/io5";
import { SiFormstack } from "react-icons/si";
import { RiUserSettingsLine, RiDashboardFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

import React, { useState } from "react";
import { IconBase } from "react-icons";

const NavLinkd = (props) => {
    return (
        <NavLink
            style={({ isActive }) => {
                return {
                    textDecoration: "none",
                    color: isActive ? "#6531d6" : "#858da7",
                };
            }}
            to={props.path}
        >
            <Group
                sx={(theme) => ({
                    display: "block",
                    width: "100%",
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.sm,
                    fontWeight: 600,
                    "&:hover": {
                        color: "#6531d6",
                        backgroundColor: "#F5F6FD",
                    },
                })}
            >
                <Group>
                    {props.icon}
                    <Text>{props.label}</Text>
                </Group>
            </Group>
        </NavLink>
    );
};

const data = [
    {
        icon: <RiDashboardFill size={24} color="#6531d6" />,
        label: "Dashboard",
        path: "/",
    },
    {
        icon: <RiUserSettingsLine size={24} color="#6531d6" />,
        label: "Users",
        path: "/users",
    },
    {
        icon: <SiFormstack size={24} color="#6531d6" />,
        label: "Verifications",
        path: "/verifications",
    },
    {
        icon: <IoNewspaper size={24} color="#6531d6" />,
        label: "News",
        path: "/news",
    },
    {
        icon: <IoCalendarClear size={24} color="#6531d6" />,
        label: "Events",
        path: "/events",
    },
];
const NavLinks = () => {
    const links = data.map((link) => <NavLinkd {...link} key={link.label} />);
    return <div>{links}</div>;
};

export default NavLinks;
