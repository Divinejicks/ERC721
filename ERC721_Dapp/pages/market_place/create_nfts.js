import { StyledContainerLarge } from "../../components/common_styles/Container.styled";
import Header from "../../components/Header/header.component";
import CreateNFTs_MarketPlace from "../../components/MarketPlace/CreateNFT/CreateNFTs.component";
import MarketPlaceHeader from "../../components/MarketPlace/Header/MarketPlaceHeader.component";

export default function MY_NFT() {
    return(
        <>
            <Header />
            <StyledContainerLarge bg="#fff" size="10px">
                <MarketPlaceHeader />
                <CreateNFTs_MarketPlace />
            </StyledContainerLarge>
        </>
    )
}