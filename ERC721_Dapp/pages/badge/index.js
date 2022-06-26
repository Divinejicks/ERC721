import { StyledContainerLarge } from "../../components/common_styles/Container.styled";
import Header from "../../components/Header/header.component";
import MintBadge from "../../components/MintBadge/MintBadge.component";
import NFTHeader from "../../components/NFTHeader/NFTHeader.component";

export default function Badge() {
    return (
        <>
            <Header />
            <StyledContainerLarge bg="#333333" size="10px">
                <NFTHeader />
                <MintBadge />
            </StyledContainerLarge>
        </>
    )
}