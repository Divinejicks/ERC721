import { StyledContainer } from "../common_styles/Container.styled";
import { StyledHeader, StyledNav, ImageContainer, StyledLink, StyledImage, StyledLinkDiv } from "./Header.styled";
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StyledButton } from "../common_styles/Button.styled";
import { useState } from "react";
import { Flex } from "../common_styles/Flex.styled";

export default function Header(){
    const router = useRouter();
    const [pathName, setPathName] = useState(router.pathname);

    const newPathName = () => {
        setPathName(router.pathname)
    }

    return(
        <>
            <StyledHeader>
                <StyledNav>
                    <ImageContainer>
                        <Image src="/assets/my_logo.PNG"  alt="my logo" width={100} height={50} />
                    </ImageContainer>
                    <StyledLinkDiv>
                        <Link href="/" passHref>
                            <StyledLink onClick={newPathName} pathname={pathName}> Mint a face (ERC721) </StyledLink> 
                        </Link>
                        <Link href="/badge" passHref> 
                            <StyledLink  onClick={newPathName} pathname={pathName}> Send Badge (ERC1155)  </StyledLink>
                        </Link>
                    </StyledLinkDiv>
                </StyledNav>
                <StyledContainer>
                    <Flex>
                        <div>
                            <h2>If you like what you see, send me an email</h2>
                            <p>
                                You can directly send me an email by clicking on the button below or sending
                                me an email by copying my emial address and using it. <strong>mbuhdivinecho@gmail.com</strong>
                                I will get back to you asap.
                            </p>
                            <StyledButton bg='#ff0099' color='#fff' onClick={() => window.location = 'mailto:mbuhdivinecho@gmail.com'}>
                                Contact me
                            </StyledButton>
                        </div>
                        <StyledImage src="/assets/profilepic.jpeg" alt="Profile picture" />
                    </Flex>
                </StyledContainer>
            </StyledHeader>
        </>
    )
}