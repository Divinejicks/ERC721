import { useSelector } from 'react-redux'
import { useState } from "react";
import { StyledContainer } from "../../common_styles/Container.styled";
import { StyledButton } from "../../common_styles/Button.styled";
import { StyledInput_Admin } from './Admin.styled';


export default function Admin_MarketPlace() {
    const nftPlug = useSelector((state) => state.walletPlug.nft)

    const [address, setAddress] = useState('')
    const [royaltyFee, setRoyaltyFee] = useState(null)

    const setDefaultRoyalty = async () => {
        if(!address || !royaltyFee) return

        await (await nftPlug.setDefaultRoyalty(address, royaltyFee)).wait();
        setAddress('')
        setRoyaltyFee(null)
    }

    return (
        <>
            <StyledContainer>
                <StyledInput_Admin type="text" placeholder="Royalty Receiver address" onChange={(e) => setAddress(e.target.value)} />
                <StyledInput_Admin type="number" placeholder="Royalty fee" onChange={(e) => setRoyaltyFee(e.target.value)} />
                <div>
                    <StyledButton bg='#b3b3ff' color='#fff' onClick={setDefaultRoyalty}>Save</StyledButton>
                </div>
            </StyledContainer>
        </>
    )
}