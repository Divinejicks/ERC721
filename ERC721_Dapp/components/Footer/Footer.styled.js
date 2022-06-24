import styled from "styled-components";

export const StyledFooter = styled.footer`
    background-color: ${({theme}) => theme.colors.footer};
    padding: 15px 0;

    ul {
        list-style-type: none;
    }

    ul li {
        margin-bottom: 5px;
    }

    p {
        text-align: center;
    }
`;