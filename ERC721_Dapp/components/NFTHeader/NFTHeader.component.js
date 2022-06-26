import { StyledHeader, StyledNav, StyledLink, StyledLinkDiv } from "./NFTHeader.styled";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from "react";

export default function NFTHeader(){
    const router = useRouter();
    const [pathName, setPathName] = useState(router.pathname);

    const newPathName = () => {
        setPathName(router.pathname)
    }

    return(
        <>
            <StyledNav bg="#ffb84d">
                <StyledLinkDiv>
                    <Link href="/mint_face" passHref>
                        <StyledLink onClick={newPathName} pathname={pathName}> Mint a face (ERC721) </StyledLink> 
                    </Link>
                    <Link href="/badge" passHref> 
                        <StyledLink  onClick={newPathName} pathname={pathName}> Send Badge (ERC1155)  </StyledLink>
                    </Link>
                </StyledLinkDiv>
            </StyledNav>
        </>
    )
}