import { StyledContainerLarge } from "../../components/common_styles/Container.styled";
import Header from "../../components/Header/header.component";
import NFTHeader from "../../components/NFTHeader/NFTHeader.component";

export default function ERC721A() {
    return(
        <>
            <Header />
            <StyledContainerLarge bg="#333333" size="10px">
                <NFTHeader />
            </StyledContainerLarge>
        </>
    )
}