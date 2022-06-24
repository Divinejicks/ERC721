import styled from "styled-components";

export const StyledCard = styled.div`
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    background-color: ${({color}) => color};
    padding: 10px 0;
`;