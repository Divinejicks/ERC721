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

export const StyledCardMini = styled.div`
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    border-radius: 5%;
    background-color: ${({color}) => color};
    padding: 10px 5px;
    margin-top: 20px;
    margin-bottom: 100px;
    margin-left: 250px;
    width: 50%;

    input {
      margin-bottom: 5px;
    }

    @media(max-width: ${({theme}) => theme.mobile}) {
      padding: 10px 20px ;
      margin-top: 20px;
      margin-left: 2px;
      width: 110%;
    }
`;