import React from "react";
import styled from "styled-components";

//colors
export const Colors = {
    primary: "#ffffff",
    secondary: "#000000",
    tertiary: "#ffe3eb",
    brand: "#F43A6B",
    darkLight: "#9ca3af",
};

const { primary, secondary, tertiary, brand, darkLight } = Colors;

export const StyledButton = styled.button`
    background-color: transparent;
    justify-content: center;
    align-items: center;
    border: none;
`;

export const StyledIcon = styled.text`
    color: ${primary};
`;
