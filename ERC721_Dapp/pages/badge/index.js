import { StyledContainer } from "../../components/common_styles/Container.styled";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/header.component";
import MintBadge from "../../components/MintBadge/MintBadge.component";

export default function Badge() {
    return (
        <>
            <Header />
            <StyledContainer>
                <p>
                    This is to demonstrate how we can build an ERC721 NFT to send badges to persons who have 
                    gone through your training program or course.
                    <br/>
                    There are 3 badges: <strong>Biginner, Intermediate and Expert</strong> badges. Having 
                    token Ids on IPFS as 1, 2, and 3 respectively.
                </p>
            </StyledContainer>
            <MintBadge />
            <Footer />
        </>
    )
}