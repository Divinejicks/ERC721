import styled from "styled-components";

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px 5px;
    box-sizing: border-box;
`;

export const StyledInputSemi = styled.input`
    width: 50%;
    padding: 10px 5px;
    box-sizing: border-box;
`;

export const StyledSelect = styled.select`
    width: 100%;
    padding: 10px 5px;
`;

export const StyledSelectSemi = styled.select`
    width: 50%;
    padding: 10px 5px;
    margin: 10px;

    @media(max-width: ${({theme}) => theme.mobile}) {
        width: 100%;
    }
`;