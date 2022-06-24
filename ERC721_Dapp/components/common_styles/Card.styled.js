import styled from "styled-components";

export const StyledCard = styled.div`
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    background-color: ${({color}) => color};
    padding: 10px 5px;
    margin-top: 20px;

    @media(max-width: ${({theme}) => theme.mobile}) {
      padding: 10px 50px ;
      margin-top: 20px;
    }
`;