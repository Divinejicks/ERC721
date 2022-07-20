import { StyledContainerLarge } from "../../components/common_styles/Container.styled";
import Header from "../../components/Header/header.component";
import Jicks_DAO from "../../components/JicksDAO/Dao/Dao.component";

export default function JicksDAO() {
    return(
        <>
            <Header />
            <StyledContainerLarge bg="#fff" size="10px">
                <Jicks_DAO />
            </StyledContainerLarge>
        </>
    )
}