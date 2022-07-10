import { StyledContainerLarge } from "../../components/common_styles/Container.styled";
import Header from "../../components/Header/header.component";
import Admin_MarketPlace from "../../components/MarketPlace/Admin/Admin.component";
import MarketPlaceHeader from "../../components/MarketPlace/Header/MarketPlaceHeader.component";

export default function MY_NFT() {
    return(
        <>
            <Header />
            <StyledContainerLarge bg="#fff" size="10px">
                <MarketPlaceHeader />
                <Admin_MarketPlace />
            </StyledContainerLarge>
        </>
    )
}