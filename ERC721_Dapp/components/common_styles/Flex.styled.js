import styled from "styled-components";

export const Flex = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    & > div,
    & > ul {
        flex: 1 0 21%;
    }

    @media(max-width: ${({theme}) => theme.mobile}) {
      flex-direction: column;
      text-align: center;
    }
`;