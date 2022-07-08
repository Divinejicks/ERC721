import { StyledContainerLarge } from "../../components/common_styles/Container.styled";
import Header from "../../components/Header/header.component";
import MarketPlaceHeader from "../../components/MarketPlace/Header/MarketPlaceHeader.component";
import MyNFTs_MarketPlace from "../../components/MarketPlace/MyNFTs/MyNFTs.component";

export default function MY_NFT() {
    return(
        <>
            <Header />
            <StyledContainerLarge bg="#fff" size="10px">
                <MarketPlaceHeader />
                <MyNFTs_MarketPlace />
            </StyledContainerLarge>
        </>
    )
}