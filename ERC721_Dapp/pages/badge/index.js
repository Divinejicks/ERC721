import { StyledContainer, StyledContainerLarge } from "../../components/common_styles/Container.styled";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/header.component";
import MintBadge from "../../components/MintBadge/MintBadge.component";

export default function Badge() {
    return (
        <>
            <Header />
            <StyledContainerLarge bg="#333333" size="10px">
                <MintBadge />
            </StyledContainerLarge>
        </>
    )
}