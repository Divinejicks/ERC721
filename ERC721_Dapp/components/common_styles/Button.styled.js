import styled from "styled-components";

export const StyledButton = styled.button`
    border-radius: 10%;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    background-color: ${({bg}) => bg || '#fff'};
    color: ${({color}) => color || '#333'};

    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
    }
`;

export const StyledButtonCirlce = styled.button`
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    background-color: ${({bg}) => bg || '#fff'};
    color: ${({color}) => color || '#333'};
    margin: 10px;

    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
    }
`;