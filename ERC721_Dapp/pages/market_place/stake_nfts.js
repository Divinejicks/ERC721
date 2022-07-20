import { StyledContainerLarge } from "../../components/common_styles/Container.styled";
import Header from "../../components/Header/header.component";
import MarketPlaceHeader from "../../components/MarketPlace/Header/MarketPlaceHeader.component";
import StakeNFTs_MarketPlace from "../../components/MarketPlace/StakeNFT/StakeNFT.component";

export default function Purchased_NFT() {
    return(
        <>
            <Header />
            <StyledContainerLarge bg="#fff" size="10px">
                <MarketPlaceHeader />
                <StakeNFTs_MarketPlace />
            </StyledContainerLarge>
        </>
    )
}