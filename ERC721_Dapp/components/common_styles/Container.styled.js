import styled from "styled-components";

export const StyledContainer = styled.div`
    width: 1000px;
    max-width: 100%;
    padding: 0 20px;
    margin: 0 auto;
`;

export const StyledContainerLarge = styled.div`
    background-color: ${({bg}) => bg};
    height: 100vh;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: ${({size}) => size};
    text-align: center;
    

    @media(max-width: ${({theme}) => theme.mobile}) {
        padding-top: 10px;
        text-align: center;
        height: auto;
    }
`;