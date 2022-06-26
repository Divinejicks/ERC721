import { StyledHeader, StyledNav, StyledLink, StyledLinkDiv, LogoContainer } from "./Header.styled";
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from "react";

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
                            <StyledLink onClick={newPathName} pathname={pathName}> NFTs </StyledLink> 
                        </Link>
                        <Link href="/market_place" passHref>
                            <StyledLink onClick={newPathName} pathname={pathName}> Market Place </StyledLink> 
                        </Link>
                    </StyledLinkDiv>
                </StyledNav>
            </StyledHeader>
        </>
    )
}