import styled from "styled-components";


export const StyledHeader = styled.header`
    background-color: ${({theme}) => theme.colors.header};
    padding: 15px 0;
`;

export const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    padding: 0 40px;
    position: fixed;
    top: 0%;
    width: 100%;
    background-color: ${({theme}) => theme.colors.header};

    @media(max-width: ${({theme}) => theme.mobile}) {
      flex-direction: column;
      position: inherit; //this will remove the fixed position of the navbar
    }
`;

export const ImageContainer = styled.div`
  padding-left: 39px;
  padding-top: 12px;

  @media(max-width: ${({theme}) => theme.mobile}) {
      margin-bottom: 20px;
    }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  padding: 0 10px;
  padding: 10px;
  background-color: ${(props) => props.href === props.pathname ? "#b3b3ff" : ""};
  color: ${(props) => props.href === props.pathname ? "#fff" : "#000"};

  &:hover {
    background: #99ccff;
    color: #fff;
    transition: 0.3s ease-out;
  }
`;

export const StyledLinkDiv = styled.div`
   @media(max-width: ${({theme}) => theme.mobile}) {
      margin-bottom: 20px;
    }
`;

export const StyledImage = styled.img`
  border-radius: 50%;
  margin-left: 150px;
  margin-top: 60px;
  height: 350px;
  width: 300px;

  @media(max-width: ${({theme}) => theme.mobile}) {
    margin: 20px 0;
    }
`;



