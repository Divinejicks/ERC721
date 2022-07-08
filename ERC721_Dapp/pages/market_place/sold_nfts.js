import { StyledContainerLarge } from "../../components/common_styles/Container.styled";
import Header from "../../components/Header/header.component";
import MarketPlaceHeader from "../../components/MarketPlace/Header/MarketPlaceHeader.component";
import SoldNFTs_MarketPlace from "../../components/MarketPlace/SoldNFTs/SoldNFTs.component";

export default function Sold_NFT() {
    return(
        <>
            <Header />
            <StyledContainerLarge bg="#fff" size="10px">
                <MarketPlaceHeader />
                <SoldNFTs_MarketPlace />
            </StyledContainerLarge>
        </>
    )
}