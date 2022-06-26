import { StyledContainer } from "../common_styles/Container.styled";
import { StyledHeader, StyledNav, ImageContainer, StyledLink, StyledImage, StyledLinkDiv, LogoContainer } from "./Header.styled";
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
                    <LogoContainer>
                        <Link href="/" passHref>
                            <Image src="/assets/my_logo.PNG"  alt="my logo" width={100} height={50} />
                        </Link>
                    </LogoContainer>
                    <StyledLinkDiv>
                        <Link href="/mint_face" passHref>
                            <StyledLink onClick={newPathName} pathname={pathName}> Mint a face (ERC721) </StyledLink> 
                        </Link>
                        <Link href="/badge" passHref> 
                            <StyledLink  onClick={newPathName} pathname={pathName}> Send Badge (ERC1155)  </StyledLink>
                        </Link>
                    </StyledLinkDiv>
                </StyledNav>
            </StyledHeader>
        </>
    )
}